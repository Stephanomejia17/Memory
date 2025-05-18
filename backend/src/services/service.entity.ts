import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn}  from 'typeorm';
import { User } from 'src/users/user.entity';
import { Plan } from 'src/plans/plan.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; 

  @Column({ nullable: true })
  description: string;

  @Column()
  dateRequested: Date;

  @Column({ default: 'pendiente' })
  status: string;

  @ManyToOne(() => User, user => user.services)
  requestedBy: User;

  @ManyToOne(() => Plan, plan => plan.services)
  plan: Plan; 
}
