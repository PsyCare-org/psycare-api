import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from '@psycare/decorators';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('sign-in')
    async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto);
    }
}
