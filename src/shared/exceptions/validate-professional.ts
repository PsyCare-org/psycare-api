import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidateProfessionalException extends HttpException {
    constructor() {
        super('Ocorreu um erro ao tentar validar as credenciais do profissional', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
