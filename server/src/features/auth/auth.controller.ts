import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { LocalGuard } from "../../../utils/guards/local.guard";
import { User } from "../../../utils/decorators/user.decorator";

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Post('registrate')
    async registrate(@Body() input: CreateUserDto) {
        await this.service.registrate(input);

        return { message: 'Registration was successful' }
    };

    @UseGuards(LocalGuard)
    @Post('login')
    async login(@User() user: UserLoginDto) {
        return user
    };
};
