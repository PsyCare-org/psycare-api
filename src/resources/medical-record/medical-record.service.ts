import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRecord } from '@psycare/entities';
import { Repository } from 'typeorm';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { ResourceNotFoundException } from '@psycare/exceptions';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';

@Injectable()
export class MedicalRecordService {
    constructor(@InjectRepository(MedicalRecord) private repo: Repository<MedicalRecord>) {}

    create(createDto: CreateMedicalRecordDto) {
        const medicalRecord: MedicalRecord = new MedicalRecord(
            createDto.attendanceId,
            createDto.initialDemand,
            createDto.pastHistory,
            createDto.intervationPlan,
            createDto.evolutions,
        );

        return this.repo.save(medicalRecord);
    }

    async findOne(id: number) {
        const medicalRecord = await this.repo.findOne({ where: { id } });

        if (!medicalRecord) throw new ResourceNotFoundException();

        return medicalRecord;
    }

    async update(id: number, updateDto: UpdateMedicalRecordDto) {
        const oldMedicalRecord = await this.repo.findOne({ where: { id } });

        if (!oldMedicalRecord) throw new ResourceNotFoundException();

        const updatedMedicalRecord = Object.assign(oldMedicalRecord, updateDto);

        return this.repo.save(updatedMedicalRecord);
    }

    async remove(id: number) {
        const medicalRecord = await this.repo.findOne({ where: { id } });

        if (!medicalRecord) throw new ResourceNotFoundException();

        return this.repo.remove([medicalRecord]);
    }
}
