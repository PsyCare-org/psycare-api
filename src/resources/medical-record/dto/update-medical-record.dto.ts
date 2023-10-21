import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalRecordDto } from './create-medical-record.dto';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UpdateMedicalRecordDto extends PartialType(CreateMedicalRecordDto) {
    @IsString()
    @IsNotEmpty()
    initialDemand: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    pastHistory: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    intervationPlan: string;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    evolutions: string;
}
