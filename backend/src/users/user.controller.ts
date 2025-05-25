import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, BadRequestException} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

   /* @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }*/

        @Put(':id') // HU1
        updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
          return this.userService.updateUser(id, updateUserDto);
        }

    @Post("/signup")
    async create(@Body() user: User): Promise<User> {
        return this.userService.sigup(user);
    }

    @Post("/login")
    async login(@Body() user: User): Promise<User> {
        return this.userService.login(user);
    }

    @Post("/adquirirPlan")
    async adquirirPlan(@Body() user: User): Promise<User> {
        return this.userService.adquirirPlan(user);
    }

    @Post("/retirarPlan")
    async retirarPlan(@Body() user: User): Promise<User> {
        return this.userService.retirarPlan(user);
    }

    @Post('/solicitarServicio')
    async solicitarServicio(@Body() user: User): Promise<User> {
        return this.userService.solicitarServicioUsuarioRegistrado(user);
    }

    @Post('/solicitarServicioNoRegistrado')
    async solicitarServicioNoRegistrado(@Body() body: any): Promise<User> {
        if (body.type_id && body.id && body.name && body.last_name && body.email) {
            return this.userService.solicitarServicioUsuarioNoRegistrado(
                body.type_id,
                body.id,
                body.name,
                body.last_name,
                body.email,
            );
        } else {
            throw new BadRequestException('Datos insuficientes para solicitar servicio')
        }
    }

    

    /* @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }*/
}