import { Module } from '@nestjs/common';
import { FollowUpService } from './follow-up.service';
import { FollowUpController } from './follow-up.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowUp } from '@psycare/entities';

@Module({
    imports: [TypeOrmModule.forFeature([FollowUp])],
    controllers: [FollowUpController],
    providers: [FollowUpService],
})
export class FollowUpModule {}
