import { User } from 'src/users/user.entity';
import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne}  from 'typeorm';

@Entity()
export class Plan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    //admin
    @OneToOne(() => User)
    @JoinColumn()
    admin: User;

    //miembros del plan
    @OneToMany(() => User, (user) => user.plan)
    members: User[];


}
