import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateIf } from 'class-validator';
import { Language, ProfessionalType } from '@psycare/enums';

export class FindProfessionalDto {
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    rowsPerPage: number = 10;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    page: number = 1;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    name?: string | null;

    @Transform(({ value }) => (value as string).split(','))
    @IsArray()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    types?: ProfessionalType[] | null;

    @Transform(({ value }) => (value as string).split(','))
    @IsArray()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    languages?: Language[] | null;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    reason?: string | null;
}
