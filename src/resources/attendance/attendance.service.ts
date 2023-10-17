import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from '@psycare/entities';
import { Repository } from 'typeorm';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { AttendanceStatus } from '@psycare/enums';
import { ResourceNotFoundException } from '@psycare/exceptions';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
    constructor(@InjectRepository(Attendance) private repo: Repository<Attendance>) {}

    async findOne(id: number) {
        const attendance = await this.repo.findOne({
            where: { id },
            relations: ['professional', 'user', 'rating'],
        });

        if (!attendance) throw new NotFoundException();

        return attendance;
    }

    create(createAttendanceDto: CreateAttendanceDto) {
        const attendance: Attendance = new Attendance(
            AttendanceStatus.pending,
            createAttendanceDto.calendarHour,
            createAttendanceDto.professionalId,
            createAttendanceDto.userId,
        );

        return this.repo.save(attendance);
    }

    async update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
        const oldAttendance = await this.repo.findOne({ where: { id } });

        if (!oldAttendance) {
            throw new ResourceNotFoundException();
        }

        const updatedAttendance = Object.assign(oldAttendance, updateAttendanceDto);

        return this.repo.save(updatedAttendance);
    }

    async remove(id: number) {
        const attendance = await this.repo.findOne({ where: { id } });

        if (!attendance) {
            throw new ResourceNotFoundException();
        }

        return this.repo.remove([attendance]);
    }
}
