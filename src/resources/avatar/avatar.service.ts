import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonNotFoundException, ResourceNotFoundException } from '@psycare/exceptions';
import { Avatar, Professional, User } from '@psycare/entities';
import { bufferToImage } from '@psycare/helpers';

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
            throw new ResourceNotFoundException();
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

    async findById(type: 'user' | 'professional', id: number) {
        const fileId = await this.getFileId(type, id);

        if (!fileId) {
            return '';
        }

        const avatar = await this.getAvatarById(fileId);

        return bufferToImage(avatar.data);
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
