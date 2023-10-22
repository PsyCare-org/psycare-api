import { PartialType } from '@nestjs/mapped-types';
import { CreateMeetingDto } from './create-meeting.dto';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UpdateMeetingDto extends PartialType(CreateMeetingDto) {
    @IsString()
    @IsNotEmpty()
    dateTime: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    relatory: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    analisys: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    observations: string;
}
