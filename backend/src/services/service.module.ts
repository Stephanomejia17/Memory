import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, User, EmailService])],
  providers: [ServiceService],
  controllers: [ServiceController],
  exports: [ServiceService],  
})
export class ServiceModule {}
