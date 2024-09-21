import { Controller, Get, Param, ParseIntPipe, Post, UnauthorizedException } from "@nestjs/common";

@Controller()
export class AppController {
    @Get()
    getResponse() {
        return { message: 'Response' }
    }

    @Get('error')
    getError() {
        throw new UnauthorizedException('Test')
    }

    @Post('validate/:id')
    sendBodyAndValidate(@Param('id', ParseIntPipe) id: number) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(id)
            }, 1500)
        })
    }
}