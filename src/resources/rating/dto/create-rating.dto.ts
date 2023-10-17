import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateRatingDto {
    @IsNumber()
    @IsNotEmpty()
    attendanceId: number;

    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    description: string;
}
