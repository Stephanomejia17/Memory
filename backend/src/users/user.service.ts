import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Plan } from 'src/plans/plan.entity';
import { Service } from 'src/services/service.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Plan)
        private planRepository: Repository<Plan>,
        @InjectRepository(Service)
        private serviceRepository: Repository<Service>
    ) {}

    sigup(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async findOne(where: FindOptionsWhere<User>): Promise<User | null> {
        return this.userRepository.findOne({
            where,
            relations: ['plan'],
        });
    }

    async login(user: User): Promise<User> {
        const foundUser = await this.userRepository.findOne({
            where: {type_id: user.type_id, id: user.id, password: user.password },
        });
        console.log(foundUser)
        if (!foundUser) {
            throw new Error('Invalid credentials');
        }

        return foundUser;
    }
    
    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        
        if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }

        const updatedUser = this.userRepository.merge(user, updateUserDto);
        
        return this.userRepository.save(updatedUser);
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
        } else if (!foundUser.planId) {
            throw new Error('El usuario no tiene un plan');
        } 

        const foundPlan = await this.planRepository.findOne({
            where: { id: foundUser.planId },
            relations: ['admin', 'members'],
        });

        if (!foundPlan) {
            throw new Error('Plan no encontrado');
        } else if (foundPlan.admin.type_id == foundUser.type_id && foundPlan.admin.id == foundUser.id) {
            if (foundPlan.members.length == 1) {
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

    async solicitarServicioUsuarioRegistrado(user: User, name: string): Promise<User> {
        const foundUser = await this.userRepository.findOne({
            where : {type_id: user.type_id, id: user.id},
        })

        if (!foundUser) {
            throw new Error('Usuario no encontrado');
        } else if (!foundUser.planId) {
            throw new Error('El usuario no tiene un plan');
        } 

        const foundPlan = await this.planRepository.findOne({
            where: { id: foundUser.planId },
            relations: ['admin', 'members'],
        });

        if (!foundPlan) {
            throw new Error('El plan registrado por el usuario no existe')
        }

        const service = new Service();
        service.name = name;
        service.requestedBy = foundUser;
        service.plan = foundPlan;
        service.dateRequested = new Date();
        service.status = 'pendiente';

        const savedService = await this.serviceRepository.save(service);
        //foundUser.services = [...(foundUser.services || []), savedService];

        return this.userRepository.save(user);
        
    }

    async solicitarServicioUsuarioNoRegistrado(requester: any, serviceDetails: any, deceased: any): Promise<User> {
        const user = new User();
        const service = new Service();
    
        user.type_id = requester.type_id;
        user.id = requester.id;
        user.name = requester.name;
        user.last_name = requester.last_name;
        user.email = requester.email;

        const savedUser = await this.userRepository.save(user);

        service.name = requester.name_service;
        service.location = serviceDetails.location;
        service.velacionTime = serviceDetails.velacionTime;
        service.cremation = serviceDetails.cremacion;
        service.sala = serviceDetails.sala;
        service.requestedBy = savedUser;
        service.dateRequested = new Date();
        service.status = 'pendiente';

        const savedService = await this.serviceRepository.save(service);
        //savedUser.services = [...(savedUser.services || []), savedService];

        return this.userRepository.save(savedUser);

    } 
}
