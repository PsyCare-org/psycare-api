import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Professional } from '../professional/entities/professional.entity';
import { Repository } from 'typeorm';
import { Avatar } from './entities/avatar.entity';
import { PersonNotFoundException } from 'src/shared/exceptions/person-not-found';
import { Response } from 'express';
import { Readable } from 'stream';

@Injectable()
export class AvatarService {
    constructor(
        @InjectRepository(Avatar) private readonly avatarRepo: Repository<Avatar>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Professional)
        private readonly proRepo: Repository<Professional>,
    ) {}

    private async uploadAvatar(dataBuffer: Buffer, name: string) {
        const avatar: Avatar = new Avatar(name, dataBuffer);
        return this.avatarRepo.save(avatar);
    }

    private async getFileById(id: number) {
        const file = await this.avatarRepo.findOne({ where: { id } });
        if (!file) {
            throw new NotFoundException('Avatar não encontrado no sistema');
        }
        return file;
    }

    async findById(id: number, res: Response) {
        const avatar = await this.getFileById(id);

        const stream = Readable.from(avatar.data);

        res.set({
            'Content-Disposition': `inline; filename="${avatar.name}"`,
            'Content-Type': 'image',
        });

        return new StreamableFile(stream);
    }

    async addAvatar(type: 'user' | 'professional', id: number, imageBuffer: Buffer, name: string) {
        const user = await this.userRepo.findOne({ where: { id } });
        const professional = await this.proRepo.findOne({ where: { id } });

        if (!user && !professional) {
            throw new PersonNotFoundException();
        }

        const { id: avatarId } = await this.uploadAvatar(imageBuffer, name);

        if (type === 'user') {
            return await this.userRepo.update({ id }, { avatarId });
        } else {
            return await this.proRepo.update({ id }, { avatarId });
        }
    }
}
