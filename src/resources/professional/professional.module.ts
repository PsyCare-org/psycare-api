import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Professional])],
    controllers: [ProfessionalController],
    providers: [ProfessionalService],
})
export class ProfessionalModule {}
