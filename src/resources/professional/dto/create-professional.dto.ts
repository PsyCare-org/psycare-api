import { IsArray, IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { CreatePersonDto } from 'src/shared/dtos/create-person.dto';
import { Language } from 'src/shared/enums/language';
import { ProfessionalType } from 'src/shared/enums/professional-type';

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
