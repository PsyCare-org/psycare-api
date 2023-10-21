import { PartialType } from '@nestjs/mapped-types';
import { CreateFollowUpDto } from './create-follow-up.dto';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UpdateFollowUpDto extends PartialType(CreateFollowUpDto) {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    description: string;
}
