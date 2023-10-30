import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '@psycare/entities';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
    constructor(@InjectRepository(Message) private readonly repo: Repository<Message>) {}

    create(createDto: CreateMessageDto) {
        const message: Message = new Message(createDto.attendanceId, createDto.sender, createDto.content);

        return this.repo.save(message);
    }

    async listAll(attendanceId: number) {
        const [result, total] = await this.repo.findAndCount({
            where: { attendanceId },
            order: { createdAt: 'ASC' },
        });

        return {
            data: result,
            total,
        };
    }
}
