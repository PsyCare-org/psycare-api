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
import { PersonType } from '@psycare/types';

@Injectable()
export class AttendanceService {
    constructor(@InjectRepository(Attendance) private repo: Repository<Attendance>) {}

    async findOne(personType: PersonType, id: number) {
        const attendance = await this.repo.findOne({
            where: { id },
            relations: {
                professional: {
                    avatar: true,
                },
                user: {
                    avatar: true,
                },
                rating: true,
                followUps: true,
                meetings: true,
                ...(personType === 'professional' && { medicalRecord: true }),
            },
        });

        if (!attendance) throw new NotFoundException();

        if (attendance.professional.avatar) {
            attendance.professional.avatar = bufferToImage((attendance.professional.avatar as Avatar).data);
        }

        if (attendance.user.avatar) {
            attendance.user.avatar = bufferToImage((attendance.user.avatar as Avatar).data);
        }

        if (personType === 'user' && attendance.meetings) {
            attendance.meetings = attendance.meetings.map((el) => ({
                id: el.id,
                attendanceId: el.attendanceId,
                dateTime: el.dateTime,
            })) as any;
        }

        return attendance;
    }

    async findAll(personType: PersonType, id: number) {
        const [result, total] = await this.repo.findAndCount({
            where: {
                ...(personType === 'user' && { userId: id }),
                ...(personType === 'professional' && { professionalId: id }),
            },
            relations: {
                user: {
                    avatar: true,
                },
                professional: {
                    avatar: true,
                },
                meetings: true,
            },
        });

        return {
            data: result.reduce(
                (acc: SplitedResult, cur) => {
                    if (cur.professional.avatar) {
                        cur.professional.avatar = bufferToImage((cur.professional.avatar as Avatar).data);
                    }

                    if (cur.user.avatar) {
                        cur.user.avatar = bufferToImage((cur.user.avatar as Avatar).data);
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

    async findAllMessages(personType: PersonType, id: number) {
        const [result, total] = await this.repo.findAndCount({
            where: {
                ...(personType === 'user' && { userId: id }),
                ...(personType === 'professional' && { professionalId: id }),
            },
            relations: {
                user: {
                    avatar: true,
                },
                professional: {
                    avatar: true,
                },
                messages: true,
            },
            order: {
                messages: {
                    createdAt: 'DESC',
                },
            },
        });

        return {
            data: result.map((el: any) => {
                if (el.professional.avatar) {
                    el.professional.avatar = bufferToImage((el.professional.avatar as Avatar).data);
                }

                if (el.user.avatar) {
                    el.user.avatar = bufferToImage((el.user.avatar as Avatar).data);
                }

                el.lastMessage = el.messages ? el.messages[0] : null;
                delete el.messages;

                return el;
            }),
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
