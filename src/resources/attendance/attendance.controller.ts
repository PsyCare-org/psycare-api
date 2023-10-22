import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiTags } from '@nestjs/swagger';
import { PersonType } from '@psycare/types';

@Controller('attendance')
@ApiTags('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) {}

    @Get(':personType/:id')
    findOne(@Param('personType') personType: PersonType, @Param('id') id: string) {
        return this.attendanceService.findOne(personType, +id);
    }

    @Get('list/:personType/:id')
    findAll(@Param('personType') personType: PersonType, @Param('id') id: number) {
        return this.attendanceService.findAll(personType, +id);
    }

    @Post()
    create(@Body() createAttendanceDto: CreateAttendanceDto) {
        return this.attendanceService.create(createAttendanceDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
        return this.attendanceService.update(+id, updateAttendanceDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.attendanceService.remove(+id);
    }
}
