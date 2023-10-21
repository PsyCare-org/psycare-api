import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '@psycare/entities';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { ResourceNotFoundException } from '@psycare/exceptions';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService {
    constructor(@InjectRepository(Note) private repo: Repository<Note>) {}

    create(createDto: CreateNoteDto) {
        const note: Note = new Note(
            createDto.meetingId,
            createDto.status,
            createDto.relatory,
            createDto.analisys,
            createDto.observations,
        );

        return this.repo.save(note);
    }

    async findOne(id: number) {
        const note = await this.repo.findOne({ where: { id } });

        if (!note) throw new ResourceNotFoundException();

        return note;
    }

    async update(id: number, updateDto: UpdateNoteDto) {
        const oldNote = await this.repo.findOne({ where: { id } });

        if (!oldNote) throw new ResourceNotFoundException();

        const updatedNote = Object.assign(oldNote, updateDto);

        return this.repo.save(updatedNote);
    }

    async remove(id: number) {
        const note = await this.repo.findOne({ where: { id } });

        if (!note) throw new ResourceNotFoundException();

        return this.repo.remove([note]);
    }
}
