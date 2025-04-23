import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

   /* @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }*/

    @Post("/signup")
    async create(@Body() user: User): Promise<User> {
        return this.userService.sigup(user);
    }

    @Post("/login")
    async (@Body() user: User): Promise<User> {
        return this.userService.login(user);
    }

    /* @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }*/
}