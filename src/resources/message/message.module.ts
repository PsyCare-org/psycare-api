import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '@psycare/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    controllers: [MessageController],
    providers: [MessageService],
})
export class MessageModule {}
