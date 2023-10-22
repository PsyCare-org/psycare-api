import { FollowUpType } from '@psycare/enums';
import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateFollowUpDto {
    @IsNumber()
    @IsNotEmpty()
    attendanceId: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsEnum(FollowUpType)
    @IsNotEmpty()
    type: FollowUpType;

    @IsString()
    @ValidateIf((_, value) => value !== null && value !== undefined)
    description: string;
}
