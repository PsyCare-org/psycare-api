import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    relatory: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    analisys?: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    observations?: string;
}
