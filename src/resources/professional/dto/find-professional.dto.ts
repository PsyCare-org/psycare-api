import { IsArray, IsEnum, IsNumber, IsString, ValidateIf } from 'class-validator';
import { Language } from 'src/shared/enums/language';
import { ProfessionalType } from 'src/shared/enums/professional-type';

export class FindProfessionalDto {
    @IsNumber()
    take: number = 10;

    @IsNumber()
    skip: number = 0;

    @IsEnum(ProfessionalType)
    @ValidateIf((_, value) => value !== null && value !== undefined)
    type: ProfessionalType;

    @IsArray()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    languages: Language[];

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    reason: string;
}
