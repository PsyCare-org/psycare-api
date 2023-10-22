import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Controller('meeting')
@ApiTags('meeting')
export class MeetingController {
    constructor(private readonly meetingService: MeetingService) {}

    @Post()
    create(@Body() createDto: CreateMeetingDto) {
        return this.meetingService.create(createDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.meetingService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdateMeetingDto) {
        return this.meetingService.update(+id, updateDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.meetingService.remove(+id);
    }
}
