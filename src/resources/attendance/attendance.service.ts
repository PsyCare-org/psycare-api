import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance, Avatar } from '@psycare/entities';
import { Repository } from 'typeorm';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { AttendanceStatus } from '@psycare/enums';
import { ResourceNotFoundException } from '@psycare/exceptions';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { SplitedResult } from './types/splitted-result';
import { bufferToImage } from '@psycare/helpers';

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

    async findAll(personType: 'user' | 'professional', id: number) {
        const [result, total] = await this.repo.findAndCount({
            where: {
                ...(personType === 'user' && { userId: id }),
                ...(personType === 'professional' && { professionalId: id }),
            },
            relations: {
                user: true,
                professional: {
                    avatar: true,
                },
            },
        });

        return {
            data: result.reduce(
                (acc: SplitedResult, cur) => {
                    if (cur.professional.avatar) {
                        cur.professional.avatar = bufferToImage((cur.professional.avatar as Avatar).data);
                    }

                    if (cur.status === AttendanceStatus.active) acc.active.push(cur);
                    if (cur.status === AttendanceStatus.closed) acc.closed.push(cur);
                    if (cur.status === AttendanceStatus.pending) acc.pending.push(cur);
                    return acc;
                },
                { active: [], closed: [], pending: [] } as SplitedResult,
            ),
            total,
        };
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
