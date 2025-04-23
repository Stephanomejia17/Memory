import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

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
    }
