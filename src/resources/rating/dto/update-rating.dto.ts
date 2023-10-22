import { PartialType } from '@nestjs/mapped-types';
import { CreateRatingDto } from './create-rating.dto';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class UpdateRatingDto extends PartialType(CreateRatingDto) {
    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    description: string;
}
