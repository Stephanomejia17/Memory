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

  @Column()
    admin_type_id: string;

    @Column()
    admin_id: string;

  @ManyToOne(() => User, user => user.services)
  @JoinColumn([
        { name: 'admin_type_id', referencedColumnName: 'type_id' },
        { name: 'admin_id', referencedColumnName: 'id' },
    ])
  requestedBy: User;

  @Column()
  planId: number;

  @ManyToOne(() => Plan, plan => plan.services)
  @JoinColumn({ name: 'planId' })
  plan: Plan;
}
