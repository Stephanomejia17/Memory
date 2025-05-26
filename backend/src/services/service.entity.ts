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

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  velacionTime: string;

  @Column({ nullable: true })
  cremation: string;

  @Column({ nullable: true })
  sala: string;

  @Column()
  admin_type_id: string;

  @Column()
  admin_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn([
        { name: 'admin_type_id', referencedColumnName: 'type_id' },
        { name: 'admin_id', referencedColumnName: 'id' },
    ])
  requestedBy: User;

  @Column({ nullable: true })
  planId: number;

  @ManyToOne(() => Plan, plan => plan.services)
  @JoinColumn({ name: 'planId' })
  plan: Plan;
}
