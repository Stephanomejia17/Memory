import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { User } from 'src/users/user.entity';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([Service, User]),
  EmailModule],
  providers: [ServiceService],
  controllers: [ServiceController],
  exports: [ServiceService],  
})
export class ServiceModule {}
