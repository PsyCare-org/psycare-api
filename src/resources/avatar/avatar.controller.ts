import { Controller, Delete, Get, HttpCode, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('avatar')
export class AvatarController {
    constructor(private readonly avatarService: AvatarService) {}

    @Get('user/:id')
    async findUserAvatar(@Param('id') id: number, @Res({ passthrough: true }) res: Response) {
        return this.avatarService.findById('user', id, res);
    }

    @Get('professional/:id')
    async findProfessionalAvatar(@Param('id') id: number, @Res({ passthrough: true }) res: Response) {
        return this.avatarService.findById('professional', id, res);
    }

    @Post('user/:id')
    @UseInterceptors(FileInterceptor('file'))
    updateUserAvatar(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
        return this.avatarService.addAvatar('user', id, file.buffer, file.originalname);
    }

    @Post('professional/:id')
    @UseInterceptors(FileInterceptor('file'))
    updateProfessionalAvatar(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
        return this.avatarService.addAvatar('professional', id, file.buffer, file.originalname);
    }

    @Delete('user/:id')
    @HttpCode(204)
    deleteUserAvatar(@Param('id') id: number) {
        return this.avatarService.deleteById('user', id);
    }

    @Delete('professional/:id')
    @HttpCode(204)
    deleteProfessionalAvatar(@Param('id') id: number) {
        return this.avatarService.deleteById('professional', id);
    }
}
