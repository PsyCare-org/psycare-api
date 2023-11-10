import { Attendance, Meeting } from '@psycare/entities';
import { AppDataSource } from 'src/data-source';
import { MigrationInterface } from 'typeorm';
import { meetingData } from './data/meeting';

export class MeetingSeed1699643701846 implements MigrationInterface {
    private attendanceRepo = AppDataSource.getRepository(Attendance);
    private meetingRepo = AppDataSource.getRepository(Meeting);

    private generateMeeting(id: number, index: number) {
        const meeting = meetingData[index];

        return new Meeting(
            id,
            meeting.dateTime,
            meeting.status,
            meeting.relatory,
            meeting.analisys,
            meeting.observations,
        );
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

        const meetings: Meeting[] = [...Array(10)].map((_, index) => this.generateMeeting(id, index));
        this.meetingRepo.save(meetings);
    }

    public async down(): Promise<void> {}
}
