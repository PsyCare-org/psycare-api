import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMeetingDto } from './dto/create-meeting.dto';

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

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.meetingService.remove(+id);
    }
}
