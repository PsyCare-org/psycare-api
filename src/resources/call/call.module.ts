import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CallController } from './call.controller';
import { CallService } from './call.service';

@Module({
    imports: [ConfigModule, HttpModule],
    controllers: [CallController],
    providers: [CallService],
})
export class CallModule {}
