import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional, User } from '@psycare/entities';
import { AuthStrategy } from './strategies/auth.strategy';

@Module({
    imports: [
        PassportModule,
        TypeOrmModule.forFeature([User, Professional]),
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            global: true,
            useFactory: (config: ConfigService) => config.get('auth'),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthStrategy],
})
export class AuthModule {}
