import { Controller, Delete, Get, HttpCode, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('avatar')
export class AvatarController {
    constructor(private readonly avatarService: AvatarService) {}

    @Get(':personType/:id')
    async findAvatar(@Param('personType') personType: 'user' | 'professional', @Param('id') id: number) {
        return this.avatarService.findById(personType, id);
    }

    @Post(':personType/:id')
    @UseInterceptors(FileInterceptor('file'))
    updateUserAvatar(
        @Param('personType') personType: 'user' | 'professional',
        @Param('id') id: number,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.avatarService.addAvatar(personType, id, file.buffer, file.originalname);
    }

    @Delete(':personType/:id')
    @HttpCode(204)
    deleteUserAvatar(@Param('personType') personType: 'user' | 'professional', @Param('id') id: number) {
        return this.avatarService.deleteById(personType, id);
    }
}
