import { HttpException, HttpStatus } from '@nestjs/common';

export class PersonNotFoundException extends HttpException {
    constructor() {
        super('Pessoa não encontrada no sistema', HttpStatus.NOT_FOUND);
    }
}
