import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { NoteService } from './note.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('note')
@ApiTags('note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Post()
    create(@Body() createDto: CreateNoteDto) {
        return this.noteService.create(createDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.noteService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdateNoteDto) {
        return this.noteService.update(+id, updateDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.noteService.remove(+id);
    }
}
