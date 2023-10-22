import { Body, Controller, Delete, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('rating')
@ApiTags('rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    @Post()
    create(@Body() createRatingDto: CreateRatingDto) {
        return this.ratingService.create(createRatingDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdateRatingDto) {
        return this.ratingService.update(+id, updateDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.ratingService.remove(+id);
    }
}
