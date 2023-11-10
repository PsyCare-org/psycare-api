import { Attendance, MedicalRecord } from '@psycare/entities';
import { AppDataSource } from 'src/data-source';
import { MigrationInterface } from 'typeorm';
import { medicalRecordData } from './data/medical-record';

export class MedicalRecordSeed1699642245555 implements MigrationInterface {
    private attendanceRepo = AppDataSource.getRepository(Attendance);
    private medicalRecordRepo = AppDataSource.getRepository(MedicalRecord);

    public async up(): Promise<void> {
        const mainAttendance = await this.attendanceRepo.findOne({
            where: {
                professional: { email: 'profissional@gmail.com' },
                user: { email: 'kau.matosr@gmail.com' },
            },
            select: {
                professional: { email: true },
                user: { email: true },
            },
        });

        const medicalRecord = new MedicalRecord(
            mainAttendance.id,
            medicalRecordData.initialDemand,
            medicalRecordData.pastHistory,
            medicalRecordData.intervationPlan,
            medicalRecordData.evolutions,
        );

        await this.medicalRecordRepo.save(medicalRecord);
    }

    public async down(): Promise<void> {}
}
