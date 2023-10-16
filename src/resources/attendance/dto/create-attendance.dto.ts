import { CalendarHour } from '@psycare/enums';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAttendanceDto {
    @IsEnum(CalendarHour)
    @IsNotEmpty()
    calendarHour: CalendarHour;

    @IsNumber()
    @IsNotEmpty()
    professionalId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
