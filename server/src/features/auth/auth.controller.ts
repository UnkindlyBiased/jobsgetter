import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserCreateDto } from "./dto/user-create.dto";
import { LocalGuard } from "../../../utils/guards/local.guard";
import { User } from "../../../utils/decorators/user.decorator";
import { UserPayloadDto } from "./dto/user-payload.dto";
import { AccessTokenGuard } from "../../../utils/guards/access-token.guard";
import { RefreshTokenGuard } from "../../../utils/guards/refresh-token.guard";
import { RefreshCookieInterceptor } from "../../../utils/interceptors/refresh-cookie.interceptor";

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Post('registrate')
    async registrate(@Body() input: UserCreateDto) {
        await this.service.registrate(input);

        return { message: 'Registration was successful' }
    };

    @UseInterceptors(RefreshCookieInterceptor)
    @UseGuards(LocalGuard)
    @Post('login')
    async login(
        @User() user: UserPayloadDto,
    ) {
        const tokens = await this.service.generateTokens(user);

        return { user, tokens }
    };

    @UseInterceptors(RefreshCookieInterceptor)
    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refresh(
        @User() user: UserPayloadDto,
    ) {
        const tokens = await this.service.generateTokens(user)

        return { user, tokens }
    }

    @UseGuards(AccessTokenGuard)
    @Get('profile')
    async getProfile(@User() user: UserPayloadDto) {
        return user
    }
};
