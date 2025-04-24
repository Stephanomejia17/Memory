import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { PlanService } from "./plan.service";
import { Plan } from "./plan.entity";

@Controller("/plans")
export class PlanController {
    constructor(private readonly planService: PlanService) {}

    @Post("/create")
    create(@Body() planData: { name: string; admin: { type_id: string; id: string } }): Promise<Plan> {
        return this.planService.create(planData);
    }

    @Post("/addMember")
    addMember(@Body() planData: { id: number; member: { type_id: string; id: string } }): Promise<Plan> {
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

}