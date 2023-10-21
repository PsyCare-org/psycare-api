import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { FollowUpService } from './follow-up.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';

@Controller('follow-up')
@ApiTags('follow-up')
export class FollowUpController {
    constructor(private readonly followUpService: FollowUpService) {}

    @Post()
    create(@Body() createDto: CreateFollowUpDto) {
        return this.followUpService.create(createDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.followUpService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdateFollowUpDto) {
        return this.followUpService.update(+id, updateDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.followUpService.remove(+id);
    }
}
