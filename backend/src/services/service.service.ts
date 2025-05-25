import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';


@Injectable()   
export class ServiceService {
    constructor(
        @InjectRepository(Service)
        private serviceRepository: Repository<Service>,
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
}