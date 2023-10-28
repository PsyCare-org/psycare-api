import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CallService } from './call.service';

@Controller('call')
@ApiTags('call')
export class CallController {
    constructor(private readonly callService: CallService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.callService.findOne(+id);
    }
}
