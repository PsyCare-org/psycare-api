import { PartialType } from '@nestjs/mapped-types';
import { CreateFollowUpDto } from './create-follow-up.dto';
import { IsBoolean, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UpdateFollowUpDto extends PartialType(CreateFollowUpDto) {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsBoolean()
    @IsNotEmpty()
    check: boolean;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    description: string;
}
