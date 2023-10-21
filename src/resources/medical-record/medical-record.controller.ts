import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('medical-record')
@ApiTags('medical-record')
export class MedicalRecordController {
    constructor(private readonly medicalRecordService: MedicalRecordService) {}

    @Post()
    create(@Body() createDto: CreateMedicalRecordDto) {
        return this.medicalRecordService.create(createDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.medicalRecordService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdateMedicalRecordDto) {
        return this.medicalRecordService.update(+id, updateDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.medicalRecordService.remove(+id);
    }
}
