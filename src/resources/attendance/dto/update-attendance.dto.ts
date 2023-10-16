import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceDto } from './create-attendance.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { AttendanceStatus, CalendarHour } from '@psycare/enums';

export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {
    @IsEnum(CalendarHour)
    @IsNotEmpty()
    calendarHour: CalendarHour;

    @IsEnum(AttendanceStatus)
    @IsNotEmpty()
    status: AttendanceStatus;
}
