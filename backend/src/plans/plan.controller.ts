import { Controller, Get, Post, Body, Param, Delete,Req,Res, UnauthorizedException } from "@nestjs/common";
import { PlanService } from "./plan.service";
import { Plan } from "./plan.entity";
import{ Request, Response } from "express";

@Controller("/plans")
export class PlanController {
    constructor(private readonly planService: PlanService) {}

    @Post("/create")
    create(@Body() planData: { nombrePlan: string; admin: { type_id: string; id: string } }, @Req() req:Request): Promise<Plan> {
        if (!req.session?.user) {
            console.log("Usuario no autenticado");
            return Promise.reject(new Error("Usuario no autenticado"));
          }
          const { type_id, id } = req.session.user;
          console.log('Usuario autenticado:', type_id, id);
          const data = {
            name: planData.nombrePlan,
            admin: {
                type_id,
                id,
            },
            };
        console.log("Creating plan with data:", data);
        return this.planService.create(data);
    }

    @Get('/all')
    async findPlans(@Req() req: Request): Promise<Plan> {
      console.log("::::::::::::::::")
      if (!req.session?.user) {
        console.log('Usuario no autenticado');
        throw new UnauthorizedException('Usuario no autenticado');
      }
      return this.planService.findAllByUser(req.session.user);
    }

    @Post("/addMember")
    addMember(@Body() planData: { id: number; member: { type_id: string; id: string; name: string; last_name: string; email: string; password: string; phone: string; address: string; city: string }}): Promise<Plan> {
        return this.planService.addMember(planData);
    }

    @Post("/changeAdmin")
    changeAdmin(@Body() planData: { id: number; admin: { type_id: string; id: string } }): Promise<Plan> {
        return this.planService.changeAdmin(planData);
    }

    @Delete("removeMember")
    removeMember(@Body() planData: { id: number; member: { type_id: string; id: string } }): Promise<Plan> {
        return this.planService.removeMember(planData);
    }

    @Get(':id/members')
    async getMembers(@Param('id') planId: number) {
        return this.planService.getPlanMembers(planId);
    }

    @Delete("/delete")
    async deletePlan(@Req() req: Request) {
    const user = req.session?.user;
    if (!user) {
      throw new Error('User not authenticated in session');
    }
    return await this.planService.deletePlan(user);
  }

}