import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateMeetingDto {
    @IsNumber()
    @IsNotEmpty()
    attendanceId: number;

    @IsString()
    @IsNotEmpty()
    dateTime: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    relatory: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    analisys: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    observations: string;
}
