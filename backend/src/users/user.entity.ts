import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany, UpdateDateColumn, Index}  from 'typeorm';
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

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  planId: number | null;

  @ManyToOne (() => Plan, (plan) => plan.members, { nullable: true })
  @JoinColumn({ name: 'planId' })
  plan: Plan | null;

  @OneToMany(() => Service, service => service.requestedBy)
  services: Service[];
  
  @UpdateDateColumn()
  updatedAt: Date;
}
