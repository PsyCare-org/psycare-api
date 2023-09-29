import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';
import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { Gender } from 'src/shared/enums/gender';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    surname: string;

    @IsNotEmpty()
    @IsEnum(Gender)
    @IsString()
    gender: Gender;
}
