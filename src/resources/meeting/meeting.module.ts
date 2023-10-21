import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from '@psycare/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Meeting])],
    controllers: [MeetingController],
    providers: [MeetingService],
})
export class MeetingModule {}
