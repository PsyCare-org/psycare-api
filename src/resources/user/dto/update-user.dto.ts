import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
    IsEnum,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    ValidateIf,
} from 'class-validator';
import { Gender } from 'src/shared/enums/gender';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
    })
    password: string;

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
