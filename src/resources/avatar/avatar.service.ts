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

    private async uploadAvatar(dataBuffer: Buffer, name: string, id?: number) {
        const avatar: Avatar = new Avatar(name, dataBuffer);
        if (id) avatar.id = id;

        return this.avatarRepo.save(avatar);
    }

    private async getAvatarById(id: number) {
        const file = await this.avatarRepo.findOne({ where: { id } });
        if (!file) {
            throw new NotFoundException('Avatar não encontrado no sistema');
        }
        return file;
    }

    private async getFileId(type: 'user' | 'professional', sourceId: number) {
        if (type === 'user') {
            const user = await this.userRepo.findOne({ where: { id: sourceId } });

            if (!user) throw new PersonNotFoundException();

            return user.avatarId;
        } else {
            const professional = await this.proRepo.findOne({ where: { id: sourceId } });

            if (!professional) throw new PersonNotFoundException();

            return professional.avatarId;
        }
    }

    async findById(type: 'user' | 'professional', id: number, res: Response) {
        const fileId = await this.getFileId(type, id);

        if (!fileId) {
            return '';
        }

        const avatar = await this.getAvatarById(fileId);

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

        if (type === 'user') {
            const { id: avatarId } = await this.uploadAvatar(imageBuffer, name, user.avatarId);
            return await this.userRepo.update({ id }, { avatarId });
        } else {
            const { id: avatarId } = await this.uploadAvatar(imageBuffer, name, professional.avatarId);
            return await this.proRepo.update({ id }, { avatarId });
        }
    }

    async deleteById(type: 'user' | 'professional', id: number) {
        const user = await this.userRepo.findOne({ where: { id } });
        const professional = await this.proRepo.findOne({ where: { id } });

        if (!user && !professional) {
            throw new PersonNotFoundException();
        }

        const file = await this.getAvatarById(user.avatarId || professional.avatarId);

        if (!file) {
            return '';
        }

        if (type === 'user') {
            const updatedUser = Object.assign(user, { avatarId: null });
            await this.userRepo.update({ id }, updatedUser);
        } else {
            const updatedProfessional = Object.assign(professional, { avatarId: null });
            await this.proRepo.update({ id }, updatedProfessional);
        }

        return this.avatarRepo.remove([file]);
    }
}
