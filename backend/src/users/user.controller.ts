import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, BadRequestException, Req, Res} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import {Request,Response} from 'express'
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

   /* @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }*/

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Post("/signup")
    async create(@Body() user: User): Promise<User> {
        return this.userService.sigup(user);
    }

    @Post("/login")
    async login(@Body() user: User, @Req() req: Request, @Res() res: Response): Promise<void> {
        try {
        const userLogged = await this.userService.login(user);

        if (!userLogged){
            console.log('NO HAY USER')
            res.status(401).json({message:'Invalid'}); 
            return; 
        }

        req.session.isLoggedIn= true
        req.session.user ={
            type_id: userLogged.type_id,
            id: userLogged.id,
            name: userLogged.name,
            lastname: userLogged.last_name
        };
        console.log(req.session.user)
        res.status(200).send({ message: 'Login successful' });

        }
        catch(error){
            console.log(error)
        }
        
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
    async solicitarServicio(@Body() body: any): Promise<User> {
        const user: User = body.user;
        const name: string = body.name;
        return this.userService.solicitarServicioUsuarioRegistrado(user, name);
    }

    @Post('/solicitarServicioNoRegistrado')
    async solicitarServicioNoRegistrado(@Body() body: any): Promise<User> {
        const requester = body.requester;
        const serviceDetails = body.serviceDetails;
        const deceased = body.deceased;

        if (requester.type_id && requester.id && requester.name && requester.last_name && requester.email && requester.name_service) {
            return this.userService.solicitarServicioUsuarioNoRegistrado(
                requester,
                serviceDetails,
                deceased
            );
        } else {
            throw new BadRequestException('Datos insuficientes para solicitar servicio')
        }
    }

    

    /*@Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }*/
}