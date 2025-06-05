import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './plan.entity';
import { User } from 'src/users/user.entity';

export interface ApiMember {
  type_id: string;
  id: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

@Injectable()
export class PlanService {
    constructor(
        @InjectRepository(Plan)
        private planRepository: Repository<Plan>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(planData: { name: string; admin: { type_id: string; id: string } }): Promise<Plan> {
        const admin = await this.userRepository.findOne({
          where: {
            type_id: planData.admin.type_id,
            id: planData.admin.id,
          },
        });
        if (!admin) {
            throw new NotFoundException('Admin user not found');
        }
        if (admin.plan) {
            throw new Error('Admin already has a plan assigned');
        }
        
        const plan = this.planRepository.create({
            name: planData.name,
            admin,
        });  

        await this.planRepository.save(plan);
        admin.plan = plan;
        await this.userRepository.save(admin);
        console.log("Creando plan con data:", planData);  
        return plan;
    }


    async addMember(planData: {id: number; member: { type_id: string; id: string; name: string; last_name: string; email: string; password: string; phone: string; address: string; city: string;}; }): Promise<any> {
        const plan = await this.planRepository.findOne({
            where: { id: planData.id },
            relations: ['members'],
        });

        if (!plan) {
            throw new NotFoundException('Plan not found');
        }

        const existingMember = await this.userRepository.findOne({
            where: {
            type_id: planData.member.type_id,
            id: planData.member.id,
            },
        });

        if (existingMember) {
            throw new Error('Member with this type_id and id already exists');
        }

        const newMember = this.userRepository.create({
            type_id: planData.member.type_id,
            id: planData.member.id,
            name: planData.member.name,
            last_name: planData.member.last_name,
            email: planData.member.email,
            password: planData.member.password,
            phone: planData.member.phone,
            address: planData.member.address,
            city: planData.member.city,
            plan: plan,
        });

        await this.userRepository.save(newMember);

        return {
            message: 'Member created and added to plan successfully',
            memberId: newMember.id,
            planId: plan.id,
        };
    }


    async removeMember(planData: { id: number; member: { type_id: string; id: string } }): Promise<any> {
        if (!planData?.member?.type_id || !planData?.member?.id) {
            throw new Error('Invalid member data');
        }
        
        const plan = await this.planRepository.findOne({
            where: { id: planData.id },
            relations: ['members'],
        });

        const member = await this.userRepository.findOne({
            where: {
                type_id: planData.member.type_id,
                id: planData.member.id,
            },
        });

        if (!member) {
            throw new NotFoundException('Member user not found');
        }

        if (!plan) {
            throw new NotFoundException('Plan not found');
        }

        member.plan = null;
        plan.members = plan.members.filter((m) => m.id !== member.id);

        await this.userRepository.save(member);
        await this.planRepository.save(plan);

        return {
            message: 'Member removed successfully',
            memberId: member.id,
            planId: plan.id,
        };
    }

    async changeAdmin(planData: { id: number, admin: { type_id: string; id: string } }): Promise<Plan> {
        const plan = await this.planRepository.findOne({
            where: { id: planData.id },
            relations: ['admin'],
        });

        const newAdmin = await this.userRepository.findOne({
            where: {
                type_id: planData.admin.type_id,
                id: planData.admin.id,
            },
        });

        if (!newAdmin) {
            throw new NotFoundException('New admin user not found');
        }

        if (newAdmin.plan) {
            throw new Error('New admin already has a plan assigned');
        }

        if (!plan) {
            throw new NotFoundException('Plan not found');
        }

        plan.admin = newAdmin;

        await this.planRepository.save(plan);

        return plan;
    }

    async findAllByUser(user: { type_id: string; id: string }): Promise<Plan> {
        const userEntity = await this.userRepository.findOne({
          where: {
            type_id: user.type_id,
            id: user.id,
          },
          relations: ['plan'],
        });
      
        if (!userEntity) {
            console.log("no hay")
           throw new NotFoundException('User not found');
        }
      
        if (!userEntity.plan) {
            console.log("no hay plan ")
            throw new NotFoundException('No plan found for this user');
        }
        console.log("DDD", userEntity)
        return userEntity.plan;
    }

    async getPlanMembers(planId: number): Promise<ApiMember[]> {
        const plan = await this.planRepository.findOne({
            where: { id: planId },
            relations: ['members', 'admin'],
        });

        if (!plan) {
            throw new NotFoundException('Plan not found');
        }

        const allMembers = [...(plan.members || [])];

        if (plan.admin && !allMembers.some(m => m.id === plan.admin.id && m.type_id === plan.admin.type_id)) {
            allMembers.push(plan.admin);
        }

        return allMembers.map(member => ({
            type_id: member.type_id,
            id: member.id,
            name: member.name,
            last_name: member.last_name,
            email: member.email,
            phone: member.phone || 'N/A',
            address: member.address || 'N/A',
            city: member.city || 'N/A',
            planType: 'STANDARD',
        }));
    }

    async deletePlan(user: { type_id: string; id: string }) {
        console.log("..:))))")
        const plan = await this.planRepository.findOne({
          where: {
            admin: {
              type_id: user.type_id,
              id: user.id,
            },
          },
          relations: ['admin'],
        });
      
        if (!plan) {
          throw new NotFoundException('Plan not found for the given user');
        }
        console.log(plan.id)
        await this.planRepository.delete(plan.id);
        console.log('BORRO')
      }

    async updatePlan(planData: { name: string; admin: { type_id: string; id: string }}): Promise<Plan> {
        const plan = await this.planRepository.findOne({
            where: {
                admin_type_id: planData.admin.type_id,
                admin_id: planData.admin.id  
            },
        });

        if (!plan) {
            throw new NotFoundException('Plan not found');
        }

        plan.name = planData.name;

        return this.planRepository.save(plan);
    }
      
}