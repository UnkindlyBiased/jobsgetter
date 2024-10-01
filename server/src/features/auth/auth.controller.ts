import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserCreateDto } from "./dto/user-create.dto";
import { LocalGuard } from "./guards/local.guard";
import { User } from "./decorators/user.decorator";
import { UserPayloadDto } from "./dto/user-payload.dto";
import { AccessTokenGuard } from "./guards/access-token.guard";
import { RefreshTokenGuard } from "./guards/refresh-token.guard";
import { RefreshCookieInterceptor } from "./interceptors/refresh-cookie.interceptor";
import { ClearRefreshCookieInterceptor } from "./interceptors/clear-refresh-cookie.interceptor";

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Post('registrate')
    async registrate(@Body() input: UserCreateDto) {
        await this.service.registrate(input)

        return { message: 'Registration was successful' }
    }

    @UseInterceptors(RefreshCookieInterceptor)
    @UseGuards(LocalGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@User() user: UserPayloadDto) {
        const tokens = await this.service.generateTokens(user);

        return { user, tokens }
    }

    @UseInterceptors(RefreshCookieInterceptor)
    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refresh(@User() user: UserPayloadDto) {
        const tokens = await this.service.generateTokens(user)

        return { user, tokens }
    }

    @UseInterceptors(ClearRefreshCookieInterceptor)
    @UseGuards(RefreshTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async logout() {
        return { message: 'You have successfully logged out' }
    }

    @UseGuards(AccessTokenGuard)
    @Get('profile')
    async getProfile(@User() user: UserPayloadDto) {
        return user
    }
}
