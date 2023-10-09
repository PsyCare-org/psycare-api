import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { FindProfessionalDto } from './dto/find-professional.dto';
import { Language } from 'src/shared/enums/language';
import { ProfessionalType } from 'src/shared/enums/professional-type';

@Controller('professional')
export class ProfessionalController {
    constructor(private readonly professionalService: ProfessionalService) {}

    @Public()
    @Post()
    create(@Body() createProfessionalDto: CreateProfessionalDto) {
        return this.professionalService.create(createProfessionalDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.professionalService.findOne(+id);
    }

    @Get()
    findAll(@Query() findProfessionalDto: FindProfessionalDto) {
        if (typeof findProfessionalDto.languages === 'string') {
            findProfessionalDto.languages = (findProfessionalDto.languages as string).split(',') as Language[];
        }
        if (typeof findProfessionalDto.types === 'string') {
            findProfessionalDto.types = (findProfessionalDto.types as string).split(',') as ProfessionalType[];
        }

        return this.professionalService.findAll(findProfessionalDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProfessionalDto: UpdateProfessionalDto) {
        return this.professionalService.update(+id, updateProfessionalDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.professionalService.remove(+id);
    }
}
