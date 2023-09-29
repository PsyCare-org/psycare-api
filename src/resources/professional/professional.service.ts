import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Professional } from './entities/professional.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfessionalService {
    constructor(
        @InjectRepository(Professional)
        private readonly repo: Repository<Professional>,
    ) {}

    create(createProfessionalDto: CreateProfessionalDto) {
        const professional: Professional = new Professional(
            createProfessionalDto.email,
            bcrypt.hashSync(createProfessionalDto.password, 10),
            createProfessionalDto.name,
            createProfessionalDto.surname,
            createProfessionalDto.gender,
            new Date(createProfessionalDto.birthDate),
            createProfessionalDto.type,
            createProfessionalDto.languages,
            createProfessionalDto.abstract,
            createProfessionalDto.expericences,
            createProfessionalDto.specializations,
            createProfessionalDto.description,
            createProfessionalDto.historic,
        );

        this.repo.save(professional).catch((err) => {
            if (/(email)[\s\S]+(already exists)/.test(err.detail)) {
                throw new BadRequestException(
                    'Account with this email already exists.',
                );
            }
            throw new BadRequestException(err.message);
        });
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    async update(id: number, updateProfessionalDto: UpdateProfessionalDto) {
        const oldProfessional = await this.repo.findOne({ where: { id } });

        if (!oldProfessional) {
            throw new NotFoundException();
        }

        const updatedProfessional = Object.assign(
            oldProfessional,
            updateProfessionalDto,
        );

        return this.repo.save(updatedProfessional);
    }

    async remove(id: number) {
        const professional = await this.repo.findOne({ where: { id } });

        if (!professional) {
            throw new NotFoundException();
        }

        return this.repo.remove([professional]);
    }
}
