import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";

import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get()
    async getUsers() {
        return await this.service.getUsers()
    }
    
    @Get('/:id')
    async getUserById(@Param('id', ParseUUIDPipe) id: string) {
        return await this.service.getUserById(id)
    }
}