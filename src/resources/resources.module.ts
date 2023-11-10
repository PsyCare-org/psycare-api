import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProfessionalModule } from './professional/professional.module';
import { AvatarModule } from './avatar/avatar.module';
import { AttendanceModule } from './attendance/attendance.module';
import { RatingModule } from './rating/rating.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { FollowUpModule } from './follow-up/follow-up.module';
import { MeetingModule } from './meeting/meeting.module';
import { CallModule } from './call/call.module';
import { MessageModule } from './message/message.module';

const resources = [
    AttendanceModule,
    AvatarModule,
    UserModule,
    ProfessionalModule,
    RatingModule,
    MedicalRecordModule,
    FollowUpModule,
    MeetingModule,
    CallModule,
    MessageModule,
];

@Module({
    imports: resources,
    exports: resources,
})
export class ResourcesModule {}
