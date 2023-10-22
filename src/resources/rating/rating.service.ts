import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from '@psycare/entities';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ResourceNotFoundException } from '@psycare/exceptions';

@Injectable()
export class RatingService {
    constructor(@InjectRepository(Rating) private repo: Repository<Rating>) {}

    create(createRatingDto: CreateRatingDto) {
        const rating: Rating = new Rating(
            createRatingDto.attendanceId,
            createRatingDto.value,
            createRatingDto.description,
        );

        return this.repo.save(rating);
    }

    async update(id: number, updateDto: UpdateRatingDto) {
        const oldRating = await this.repo.findOne({ where: { id } });

        if (!oldRating) throw new ResourceNotFoundException();

        const updatedRating = Object.assign(oldRating, updateDto);

        return this.repo.save(updatedRating);
    }

    async remove(id: number) {
        const rating = await this.repo.findOne({ where: { id } });

        if (!rating) throw new ResourceNotFoundException();

        return this.repo.remove([rating]);
    }
}
