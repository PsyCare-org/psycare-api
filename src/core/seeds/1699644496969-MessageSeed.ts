import { Attendance, Message } from '@psycare/entities';
import { AppDataSource } from 'src/data-source';
import { MigrationInterface } from 'typeorm';
import { messageData } from './data/message';

export class MessageSeed1699644496969 implements MigrationInterface {
    private attendanceRepo = AppDataSource.getRepository(Attendance);
    private messageRepo = AppDataSource.getRepository(Message);

    private generateMessage(id: number, index: number) {
        const message = messageData[index];

        return new Message(id, message.sender, message.content);
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

        const messages: Message[] = [...Array(27)].map((_, index) => this.generateMessage(id, index));
        this.messageRepo.save(messages);
    }

    public async down(): Promise<void> {}
}
