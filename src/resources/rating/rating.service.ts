import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from '@psycare/entities';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';

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
}
