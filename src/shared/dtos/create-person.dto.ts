import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, ValidateIf } from 'class-validator';
import { Gender } from 'src/shared/enums/gender';

export class CreatePersonDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
    })
    password: string;

    @IsPhoneNumber('BR')
    @IsString()
    phoneNumber?: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    surname: string | null;

    @IsNotEmpty()
    @IsEnum(Gender)
    @IsString()
    gender: Gender;

    @IsNotEmpty()
    @IsDateString()
    birthDate: string;
}
