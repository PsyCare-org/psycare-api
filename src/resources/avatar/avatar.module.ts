import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avatar, Professional, User } from '@psycare/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Avatar, User, Professional])],
    controllers: [AvatarController],
    providers: [AvatarService],
})
export class AvatarModule {}
