import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config';
import { ResourcesModule } from './resources/resources.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from '@psycare/guards';
import { ErrorInterceptor } from '@psycare/interceptors';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => config.get('database'),
            inject: [ConfigService],
        }),
        ResourcesModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_GUARD, useClass: AuthGuard },
        { provide: APP_INTERCEPTOR, useClass: ErrorInterceptor },
    ],
})
export class AppModule {}
