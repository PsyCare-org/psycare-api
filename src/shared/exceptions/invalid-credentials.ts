import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
    constructor() {
        super('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }
}
