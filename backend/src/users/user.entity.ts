<<<<<<< HEAD
import { Entity, PrimaryColumn, Column, UpdateDateColumn}  from 'typeorm';
=======
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn}  from 'typeorm';
import { Plan } from 'src/plans/plan.entity';
>>>>>>> 4a589a453c899668e4dc1624af74ddd7234533fa

@Entity()
export class User {
  
  @PrimaryColumn()
  type_id: string;

  @PrimaryColumn()
  id: string;
  
  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @ManyToOne (() => Plan, (plan) => plan.members, { nullable: true })
  @JoinColumn({ name: 'planId' })
  plan: Plan | null;
  
  @UpdateDateColumn()
  updatedAt: Date;
}
