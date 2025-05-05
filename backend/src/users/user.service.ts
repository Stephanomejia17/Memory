import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    sigup(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async login(user: User): Promise<User> {
        const foundUser = await this.userRepository.findOne({
            where: { type_id: user.type_id, id: user.id, password: user.password },
        });
        if (!foundUser) {
            throw new Error('Invalid credentials');
        }

        return foundUser;
    }
<<<<<<< HEAD
    
    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException('Usuario no encontrado');
    
        await this.userRepository.update(id, updateUserDto);
        return this.userRepository.findOneBy({ id });
      }
=======

    async adquirirPlan(user: User): Promise<User> {
        const foundUser = await this.userRepository.findOne({
            where: { type_id: user.type_id, id: user.id },
        });
        if (!foundUser) {
            throw new Error('User not found');
        }

        foundUser.plan = user.plan;
        return this.userRepository.save(foundUser);
>>>>>>> 4a589a453c899668e4dc1624af74ddd7234533fa
    }

    async retirarPlan(user: User): Promise<User> {
        const foundUser = await this.userRepository.findOne({
            where: { type_id: user.type_id, id: user.id },
        });
        if (!foundUser) {
            throw new Error('User not found');
        }

        foundUser.plan = null;
        return this.userRepository.save(foundUser);

    }
}
