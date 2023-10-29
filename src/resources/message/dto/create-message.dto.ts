import { PersonType } from '@psycare/types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsNumber()
    @IsNotEmpty()
    attendanceId: number;

    @IsString()
    @IsNotEmpty()
    sender: PersonType;

    @IsString()
    @IsNotEmpty()
    content: string;
}
