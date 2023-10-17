import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProfessionalModule } from './professional/professional.module';
import { AuthModule } from './auth/auth.module';
import { AvatarModule } from './avatar/avatar.module';
import { AttendanceModule } from './attendance/attendance.module';
import { RatingModule } from './rating/rating.module';

const resources = [AttendanceModule, AuthModule, AvatarModule, UserModule, ProfessionalModule, RatingModule];

@Module({
    imports: resources,
    exports: resources,
})
export class ResourcesModule {}
