import { IsArray, IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { CreatePersonDto } from '@psycare/dtos';
import { Language, ProfessionalType } from '@psycare/enums';

export class CreateProfessionalDto extends CreatePersonDto {
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsString()
    @IsNotEmpty()
    crp: string;

    @IsEnum(ProfessionalType)
    @IsNotEmpty()
    type: ProfessionalType;

    @IsArray()
    @IsEnum(Language, { each: true })
    @IsNotEmpty()
    languages: Language[];

    @IsString()
    @IsNotEmpty()
    abstract: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    expericences: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    specializations: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    description: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    historic: string;
}
