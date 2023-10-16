import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends HttpException {
    constructor() {
        super('Recurso não encontrada no sistema', HttpStatus.NOT_FOUND);
    }
}
