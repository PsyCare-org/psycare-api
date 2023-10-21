import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowUp } from '@psycare/entities';
import { ResourceNotFoundException } from '@psycare/exceptions';
import { Repository } from 'typeorm';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';

@Injectable()
export class FollowUpService {
    constructor(@InjectRepository(FollowUp) private repo: Repository<FollowUp>) {}

    create(createDto: CreateFollowUpDto) {
        const medicalRecord: FollowUp = new FollowUp(createDto.attendanceId, createDto.title, createDto.description);

        return this.repo.save(medicalRecord);
    }

    async findOne(id: number) {
        const followUp = await this.repo.findOne({ where: { id } });

        if (!followUp) throw new ResourceNotFoundException();

        return followUp;
    }

    async update(id: number, updateDto: UpdateFollowUpDto) {
        const oldFollowUp = await this.repo.findOne({ where: { id } });

        if (!oldFollowUp) throw new ResourceNotFoundException();

        const updatedFollowUp = Object.assign(oldFollowUp, updateDto);

        return this.repo.save(updatedFollowUp);
    }

    async remove(id: number) {
        const followUp = await this.repo.findOne({ where: { id } });

        if (!followUp) throw new ResourceNotFoundException();

        return this.repo.remove([followUp]);
    }
}
