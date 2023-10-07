import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('avatar')
export class AvatarController {
    constructor(private readonly avatarService: AvatarService) {}

    @Get(':id')
    async findOne(@Param('id') id: number, @Res({ passthrough: true }) res: Response) {
        return this.avatarService.findById(id, res);
    }

    @Post('user/:id')
    @UseInterceptors(FileInterceptor('file'))
    updateUserAvatar(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
        return this.avatarService.addAvatar('user', id, file.buffer, file.originalname);
    }

    @Post('professional/:id')
    @UseInterceptors(FileInterceptor('file'))
    updateProfessionalAvatar(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
        return this.avatarService.addAvatar('user', id, file.buffer, file.originalname);
    }
}
