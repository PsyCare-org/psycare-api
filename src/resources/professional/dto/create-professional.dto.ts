import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsString,
    ValidateIf,
} from 'class-validator';
import { CreatePersonDto } from 'src/shared/dtos/create-person.dto';
import { ProfessionalType } from 'src/shared/enums/professional-type';

export class CreateProfessionalDto extends CreatePersonDto {
    @IsEnum(ProfessionalType)
    @IsNotEmpty()
    type: ProfessionalType;

    @IsArray()
    @IsNotEmpty()
    languages: string[];

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
