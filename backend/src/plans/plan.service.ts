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

        let plan = await this.planRepository.findOne({
            where: { name: planData.name },
        });
    
        if (!plan){
            plan = this.planRepository.create({
                name: planData.name,
                admin,
            });

            await this.planRepository.save(plan);
        } 

        admin.plan = plan;

        console.log("guardar admin: ", admin);

        await this.userRepository.save(admin);
    
        return plan;
    }

    async addMember(planData: { id: number; member: { type_id: string; id: string } }): Promise<any> {
        const plan = await this.planRepository.findOne({
            where: { id: planData.id },
            relations: ['members'],
        })
        const member = await this.userRepository.findOne({
            where: {
                type_id: planData.member.type_id,
                id: planData.member.id,
            },
        });

        if (!member) {
            throw new NotFoundException('Member user not found');
        }

        if (member.plan) {
            throw new Error('Member already has a plan assigned');
        }

        if (!plan) {
            throw new NotFoundException('Plan not found');
        }
        
        member.plan = plan;

        plan.members = plan.members || [];
        plan.members.push(member);

        await this.userRepository.save(member);

        return {
            message: 'Member added successfully',
            memberId: member.id,
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
          throw new NotFoundException('User not found');
        }
      
        if (!userEntity.plan) {
          throw new NotFoundException('No plan found for this user');
        }
      
        return userEntity.plan;
    }

    async getPlanMembers(planId: number): Promise<ApiMember[]> {
        const plan = await this.planRepository.findOne({
            where: { id: planId },
            relations: ['members', 'admin']
        });
        if (!plan) {
            throw new NotFoundException('Plan not found');
        }
        const allMembers = plan.members || [];
        if (plan.admin) {
            allMembers.push(plan.admin);
        }
        return (plan.members || []).map(member => ({
            type_id: member.type_id,
            id: member.id,
            name: member.name,
            last_name: member.last_name,
            email: member.email,
            phone: member.phone || 'N/A',
            address: member.address || 'N/A',
            city: member.city || 'N/A',
            planType: 'STANDARD'
        }));
    }

    async deletePlan(user: { type_id: string; id: string }) {
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
      
      
}