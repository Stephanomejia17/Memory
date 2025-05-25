import { User } from 'src/users/user.entity';
import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne}  from 'typeorm';
import { Service } from 'src/services/service.entity';

@Entity()
export class Plan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    admin_type_id: string;

    @Column()
    admin_id: string;

    @OneToOne(() => User)
    @JoinColumn([
        { name: 'admin_type_id', referencedColumnName: 'type_id' },
        { name: 'admin_id', referencedColumnName: 'id' },
    ])
    admin: User;

    @OneToMany(() => User, (user) => user.plan)
    members: User[];

    @OneToMany(() => Service, service => service.plan)
    services: Service[];



}
