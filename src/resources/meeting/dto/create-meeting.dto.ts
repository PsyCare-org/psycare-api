import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateMeetingDto {
    @IsNumber()
    @IsNotEmpty()
    attendanceId: number;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    dateTime: string;
}
