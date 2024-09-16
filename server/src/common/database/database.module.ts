import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm'

// TODO: set prod and dev settings
@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
            return {
                type: 'postgres',
                host: 'localhost',
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                port: configService.get<number>('DB_PORT'),
                database: configService.get("DB_NAME"),
                entities: [__dirname + '/../../features/**/*.entity.{js,ts}'],
                synchronize: true
            }
        },
        inject: [ConfigService]
    })]
})
export class DatabaseModule {}