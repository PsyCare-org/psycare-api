import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';
import { IsDateString, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, ValidateIf } from 'class-validator';
import { Gender } from 'src/shared/enums/gender';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
    @IsPhoneNumber('BR')
    @IsString()
    phoneNumber?: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    surname?: string;

    @IsNotEmpty()
    @IsEnum(Gender)
    @IsString()
    gender: Gender;

    @IsNotEmpty()
    @IsDateString()
    birthDate: string;
}
