import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateNoteDto {
    @IsNumber()
    @IsNotEmpty()
    meetingId: number;

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
