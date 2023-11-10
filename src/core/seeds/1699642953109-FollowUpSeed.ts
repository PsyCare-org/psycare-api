import { Attendance, FollowUp } from '@psycare/entities';
import { AppDataSource } from 'src/data-source';
import { MigrationInterface } from 'typeorm';
import { followUpData } from './data/follow-up';

export class FollowUpSeed1699642953109 implements MigrationInterface {
    private attendanceRepo = AppDataSource.getRepository(Attendance);
    private followUpRepo = AppDataSource.getRepository(FollowUp);

    private generateFollowUp(id: number, index: number) {
        const followUp = followUpData[index];

        return new FollowUp(id, followUp.title, followUp.type, followUp.check, followUp.description);
    }

    public async up(): Promise<void> {
        const { id } = await this.attendanceRepo.findOne({
            where: {
                professional: { email: 'profissional@gmail.com' },
                user: { email: 'kau.matosr@gmail.com' },
            },
            select: {
                professional: { email: true },
                user: { email: true },
            },
        });

        const followUps: FollowUp[] = [...Array(7)].map((_, index) => this.generateFollowUp(id, index));
        this.followUpRepo.save(followUps);
    }

    public async down(): Promise<void> {}
}
