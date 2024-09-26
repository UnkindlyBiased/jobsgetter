import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserCreateDto } from "./dto/user-create.dto";
import { LocalGuard } from "../../../utils/guards/local.guard";
import { User } from "../../../utils/decorators/user.decorator";
import { UserPayloadDto } from "./dto/user-payload.dto";
import { JwtGuard } from "../../../utils/guards/jwt.guard";
import { UserEntity } from "../users/user.entity";

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Post('registrate')
    async registrate(@Body() input: UserCreateDto) {
        await this.service.registrate(input);

        return { message: 'Registration was successful' }
    };

    @UseGuards(LocalGuard)
    @Post('login')
    async login(@User() user: UserPayloadDto) {
        const token = await this.service.generateJwtToken(user);

        return { user, token }
    };

    @UseGuards(JwtGuard)
    @Get('profile')
    async getProfile(@User() user: UserEntity) {
        return user
    }
};
