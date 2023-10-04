import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidateProfessionalException extends HttpException {
    constructor() {
        super("An error occurred when trying to validate the professional's credentials", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
