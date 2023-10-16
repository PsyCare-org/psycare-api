import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt, UserPayload } from '@psycare/types';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('auth').publicKey,
        });
    }

    async validate(payload: UserPayload): Promise<UserFromJwt> {
        return {
            id: payload.sub,
            email: payload.email,
            type: payload.type,
        };
    }
}
