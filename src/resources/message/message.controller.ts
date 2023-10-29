import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
@ApiTags('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post()
    create(@Body() createDto: CreateMessageDto) {
        return this.messageService.create(createDto);
    }

    @Get(':attendanceId')
    listAll(@Param('attendanceId') attendanceId: string) {
        return this.messageService.listAll(+attendanceId);
    }
}
