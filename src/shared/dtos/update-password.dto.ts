import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
    @IsNotEmpty()
    @IsString()
    currentPassword: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}
