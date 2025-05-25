import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Plan } from 'src/plans/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Plan])],
  providers: [UserService],
  controllers: [UserController],
})
export class UsersModule {}
