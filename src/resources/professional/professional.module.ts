import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Professional } from '@psycare/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Professional]), ConfigModule],
    controllers: [ProfessionalController],
    providers: [ProfessionalService],
})
export class ProfessionalModule {}
