import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { User } from 'src/users/user.entity';
import { EmailService } from 'src/email/email.service';


@Injectable()   
export class ServiceService {
    constructor(
        @InjectRepository(Service)
        private serviceRepository: Repository<Service>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly emailService: EmailService,
    ) {}

    async createService(service: Service): Promise<Service> {
        return this.serviceRepository.save(service);
    }

    async findAllServices(): Promise<Service[]> {
        return this.serviceRepository.find();
    }

    async findServiceById(id: number): Promise<Service> {
        const service = await this.serviceRepository.findOne({ where: { id } });
        if (!service) {
            throw new Error('Servicio no encontrado');
        }
        return service;
    }

    async updateService(id: number, service: Service): Promise<Service> {
        await this.serviceRepository.update(id, service);
        return this.findServiceById(id);
    }

    async deleteService(id: number): Promise<void> {
        await this.serviceRepository.delete(id);
    }

    async sendConfirmation(user: User): Promise<void> {
        if (!user.email) {
            throw new Error('El usuario no tiene un correo electronico')
        }

        const subject = 'Confirmación de solicitud de servicio';
        const message = 'Hola ${user.name}, \n\nTu solicitud ha sido recibida y está siendo procesada.\n\nGracias por usar nuestro sistema.';

        await this.emailService.sendEmail(user.email, subject, message);
    
    }
}