import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avatar } from './entities/avatar.entity';
import { User } from '../user/entities/user.entity';
import { Professional } from '../professional/entities/professional.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Avatar, User, Professional])],
    controllers: [AvatarController],
    providers: [AvatarService],
})
export class AvatarModule {}
