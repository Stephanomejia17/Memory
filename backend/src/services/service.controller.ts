import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from './service.entity';
import { User } from 'src/users/user.entity';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async createService(@Body() service: Service): Promise<Service> {
    return this.serviceService.createService(service);
  }

  @Get()
  async findAllServices(): Promise<Service[]> {
    return this.serviceService.findAllServices();
  }

  @Get(':id')
  async findServiceById(@Param('id', ParseIntPipe) id: number): Promise<Service> {
    return this.serviceService.findServiceById(id);
  }

  @Put(':id')
  async updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body() service: Service,
  ): Promise<Service> {
    return this.serviceService.updateService(id, service);
  }

  @Delete(':id')
  async deleteService(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.serviceService.deleteService(id);
  }

  @Post(':id/email')
  async sendEmail(@Param('id', ParseIntPipe) id: number, @Body() user: User): Promise<void> {
    return this.serviceService.sendConfirmation(user);
  }
}
