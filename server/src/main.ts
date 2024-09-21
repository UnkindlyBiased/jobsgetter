import { NestFactory, Reflector } from "@nestjs/core";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "../utils/filters/exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalFilters(new HttpExceptionFilter())
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
    }))
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector))
    )
    
    await app.listen(Number(process.env.SERVER_PORT))
}

bootstrap()