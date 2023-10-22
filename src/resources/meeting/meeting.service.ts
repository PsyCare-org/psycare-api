import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from '@psycare/entities';
import { Repository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { ResourceNotFoundException } from '@psycare/exceptions';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Injectable()
export class MeetingService {
    constructor(@InjectRepository(Meeting) private repo: Repository<Meeting>) {}

    create(createDto: CreateMeetingDto) {
        const medicalRecord: Meeting = new Meeting(
            createDto.attendanceId,
            createDto.dateTime,
            createDto.status,
            createDto.relatory,
            createDto.analisys,
            createDto.observations,
        );

        return this.repo.save(medicalRecord);
    }

    async findOne(id: number) {
        const followUp = await this.repo.findOne({ where: { id } });

        if (!followUp) throw new ResourceNotFoundException();

        return followUp;
    }

    async update(id: number, updateDto: UpdateMeetingDto) {
        const oldMeeting = await this.repo.findOne({ where: { id } });

        if (!oldMeeting) throw new ResourceNotFoundException();

        const updatedMeeting = Object.assign(oldMeeting, updateDto);

        return this.repo.save(updatedMeeting);
    }

    async remove(id: number) {
        const followUp = await this.repo.findOne({ where: { id } });

        if (!followUp) throw new ResourceNotFoundException();

        return this.repo.remove([followUp]);
    }
}
