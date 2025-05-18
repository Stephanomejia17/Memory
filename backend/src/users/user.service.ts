import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Plan } from 'src/plans/plan.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Plan)
        private planRepository: Repository<Plan>
    ) {}

    sigup(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async login(user: User): Promise<User> {
        const foundUser = await this.userRepository.findOne({
            where: { type_id: user.type_id, id: user.id, password: user.password },
        });
        if (!foundUser) {
            throw new Error('Invalid credentials');
        }

        return foundUser;
    }

    async adquirirPlan(user: User): Promise<User> {
        const foundUser = await this.userRepository.findOne({
            where: { type_id: user.type_id, id: user.id },
        });
        if (!foundUser) {
            throw new Error('User not found');
        }

        foundUser.plan = user.plan;
        return this.userRepository.save(foundUser);
    }

    async retirarPlan(user: User): Promise<User> {
        const foundUser = await this.userRepository.findOne({
            where: { type_id: user.type_id, id: user.id },
        });

        if (!foundUser) {
            throw new Error('Usuario no encontrado');
        } else if (!foundUser.plan) {
            throw new Error('El usuario no tiene un plan');
        } 

        const foundPlan = await this.planRepository.findOne({
            where: { id: foundUser.plan.id },
            relations: ['admin', 'members'],
        });

        if (!foundPlan) {
            throw new Error('Plan no encontrado');
        } else if (foundPlan.admin.id == foundUser.id) {
            if (foundPlan.members.length === 0) {
                throw new Error('El administrador es el único miembro del plan. No se puede retirar.');
            } 
            foundUser.plan = null;
            const members = foundPlan.members.filter(member => member.id !== foundUser.id);
            foundPlan.admin = members[0];
            foundPlan.members = members;
            await this.planRepository.save(foundPlan);
        } else {
            foundPlan.members = foundPlan.members.filter(member => member.id !== foundUser.id);
            await this.planRepository.save(foundPlan);
            foundUser.plan = null;
        }

        return this.userRepository.save(foundUser);

    }
}
