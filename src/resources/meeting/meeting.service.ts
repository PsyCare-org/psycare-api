import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from '@psycare/entities';
import { Repository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { ResourceNotFoundException } from '@psycare/exceptions';

@Injectable()
export class MeetingService {
    constructor(@InjectRepository(Meeting) private repo: Repository<Meeting>) {}

    create(createDto: CreateMeetingDto) {
        const medicalRecord: Meeting = new Meeting(createDto.attendanceId, createDto.dateTime);

        return this.repo.save(medicalRecord);
    }

    async findOne(id: number) {
        const followUp = await this.repo.findOne({ where: { id } });

        if (!followUp) throw new ResourceNotFoundException();

        return followUp;
    }

    async remove(id: number) {
        const followUp = await this.repo.findOne({ where: { id } });

        if (!followUp) throw new ResourceNotFoundException();

        return this.repo.remove([followUp]);
    }
}
