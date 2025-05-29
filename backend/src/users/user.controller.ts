import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, BadRequestException, Req, Res} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Request, Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

   /* @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }*/

    @Get('/planId')
    async getPlanId(@Req() req: Request) {
        const sessionUser = req.session?.user;

        if (!sessionUser) {
            throw new BadRequestException('Usuario no autenticado');
        }

        const user = await this.userService.findOne({
            type_id: sessionUser.type_id,
            id: sessionUser.id,
        });

        if (!user) {
            throw new BadRequestException('Usuario no encontrado');
        }

        return {
            type_id: user.type_id,
            id: user.id,
            planId: user.plan?.id ?? null,
        };
    }

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
        console.log(user)
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
            lastname: userLogged.last_name,
            password:userLogged.password,
            email: userLogged.email,
            phone: userLogged.phone,
            adress:userLogged.address,
            city: userLogged.city,

        };
        console.log(req.session.user)
        res.status(200).send({ message: 'Login successful' });

        }
        catch(error){
            console.log(error)
            res.status(100).send(error)
        }
        
    }

    @Get('/get')
    getSession(@Req() req: Request) {
        console.log(req.session)
        return req.session;
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

    @Post('/logout')
    logout(@Req() req: Request, @Res() res: Response) {
        req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error cerrando sesión' });
        }

        res.clearCookie('connect.sid'); 
        res.status(200).json({ message: 'Logout exitoso' });
        console.log("Logout :)")
  });
}

    

    /*@Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }*/
}