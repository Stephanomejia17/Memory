import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany, UpdateDateColumn}  from 'typeorm';
import { Plan } from 'src/plans/plan.entity';
import { Service } from 'src/services/service.entity';

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

  @OneToMany(() => Service, service => service.requestedBy)
  services: Service[];

  
  @UpdateDateColumn()
  updatedAt: Date;
}
