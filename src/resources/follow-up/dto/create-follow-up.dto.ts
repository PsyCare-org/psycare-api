import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateFollowUpDto {
    @IsNumber()
    @IsNotEmpty()
    attendanceId: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    description: string;
}
