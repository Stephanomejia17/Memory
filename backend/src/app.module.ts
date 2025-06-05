import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PlanModule } from './plans/plan.module';
import { ServiceModule } from './services/service.module';
import { User } from './users/user.entity';
import { Plan } from './plans/plan.entity';
import { Service } from './services/service.entity';


@Module({
  imports: [
    UsersModule,
    PlanModule,
    ServiceModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'Memory-BD',
      entities: [User, Plan, Service],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
