import { Module } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { MedicalRecordController } from './medical-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalRecord } from '@psycare/entities';

@Module({
    imports: [TypeOrmModule.forFeature([MedicalRecord])],
    controllers: [MedicalRecordController],
    providers: [MedicalRecordService],
})
export class MedicalRecordModule {}
