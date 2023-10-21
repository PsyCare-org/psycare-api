import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateMedicalRecordDto {
    @IsNumber()
    @IsNotEmpty()
    attendanceId: number;

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
