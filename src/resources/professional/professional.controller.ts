import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
} from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';

@Controller('professional')
export class ProfessionalController {
    constructor(private readonly professionalService: ProfessionalService) {}

    @Post()
    create(@Body() createProfessionalDto: CreateProfessionalDto) {
        return this.professionalService.create(createProfessionalDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.professionalService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProfessionalDto: UpdateProfessionalDto,
    ) {
        return this.professionalService.update(+id, updateProfessionalDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.professionalService.remove(+id);
    }
}
