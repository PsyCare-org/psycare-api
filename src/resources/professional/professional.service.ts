import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, FindOptionsWhere, In, Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import puppeteer from 'puppeteer';
import { ConfigService } from '@nestjs/config';
import { FindProfessionalDto } from './dto/find-professional.dto';
import { Avatar, Professional } from '@psycare/entities';
import {
    InvalidCredentialsException,
    PersonNotFoundException,
    ValidateProfessionalException,
} from '@psycare/exceptions';
import { UpdatePasswordDto } from '@psycare/dtos';
import { bufferToImage } from '@psycare/helpers';

@Injectable()
export class ProfessionalService {
    constructor(
        @InjectRepository(Professional)
        private readonly repo: Repository<Professional>,
        private config: ConfigService,
    ) {}

    private async validateProfessional(professional: Professional): Promise<boolean> {
        const {
            validationUrl,
            bypass: { crp: crpBypass, cpf: cpfBypass },
        } = this.config.get('professional');

        if (professional.crp === crpBypass && professional.cpf === cpfBypass) {
            return true;
        }

        const brower = await puppeteer.launch({
            headless: 'new',
            debuggingPort: 0,
        });

        try {
            const page = await brower.newPage();
            await page.goto(validationUrl, { waitUntil: 'networkidle2' });
            await page.click('[data-target="#buscaAvancada"]');
            await page.type('#registroconselho', professional.crp.split('/')[1]);
            await page.type('#cpf', professional.cpf);

            let result: boolean;
            let attempts = 0;

            while (attempts < 3) {
                await page.click('button.form-group');

                const request = page.waitForResponse((res) => res.url().includes('/psi/busca'));

                await request
                    .then(async (response) => {
                        const res = await response.json();

                        if (Array.isArray(res)) {
                            result =
                                res.findIndex((el) => {
                                    return (
                                        el.Nome.toLowerCase().includes(professional.name.toLowerCase()) &&
                                        el.situacao === 'ATIVO'
                                    );
                                }) !== -1;
                            attempts = 3;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        attempts++;
                    });
            }

            await page.close();

            return result;
        } catch (error) {
            console.error(error);
            throw new ValidateProfessionalException();
        } finally {
            brower.close();
        }
    }

    async create(createProfessionalDto: CreateProfessionalDto) {
        const professional: Professional = new Professional(
            createProfessionalDto.email,
            bcrypt.hashSync(createProfessionalDto.password, 10),
            createProfessionalDto.phoneNumber,
            createProfessionalDto.name,
            createProfessionalDto.surname,
            createProfessionalDto.gender,
            new Date(createProfessionalDto.birthDate),
            createProfessionalDto.cpf,
            createProfessionalDto.crp,
            createProfessionalDto.type,
            createProfessionalDto.languages,
            createProfessionalDto.abstract,
            createProfessionalDto.expericences,
            createProfessionalDto.specializations,
            createProfessionalDto.description,
            createProfessionalDto.historic,
        );

        const isProfessionalValid = await this.validateProfessional(professional);
        if (!isProfessionalValid) {
            throw new BadRequestException('Credênciais inválidas(CPF, CRP e Nome)');
        }

        return this.repo.save(professional);
    }

    async findOne(id: number) {
        const professional = await this.repo.findOne({
            where: { id },
            relations: {
                avatar: true,
                attendances: {
                    rating: true,
                },
            },
        });

        if (!professional) {
            throw new PersonNotFoundException();
        }

        if (professional.avatar instanceof Avatar) {
            professional.avatar = bufferToImage(professional.avatar.data);
        }

        if (professional.attendances) {
            professional.occupiedHours = professional.attendances.map((el) => ({
                calendarHour: el.calendarHour,
                userId: el.userId,
            }));

            const ratings = professional.attendances.filter((el) => el.rating).map((el) => el.rating);

            if (ratings.length > 0) {
                professional.rating = ratings.reduce((acc, cur) => acc + cur.value, 0) / ratings.length;
                professional.ratings = ratings;
                professional.ratingCount = ratings.length;
            }
        }

        return professional;
    }

    async findAll(findProfessionalDto: FindProfessionalDto) {
        const { page, rowsPerPage, name, types, languages, reason } = findProfessionalDto;

        const defaultFilter: FindOptionsWhere<Professional> = {
            ...(name && { name: Like(`%${name}%`) }),
            ...(types && { type: In(types) }),
            ...(languages && { languages: ArrayContains(languages) }),
        };

        const filter = reason
            ? ['abstract', 'expericences', 'specializations', 'description', 'historic'].map((column) => ({
                  [column]: Like(`%${reason}%`),
                  ...defaultFilter,
              }))
            : { ...defaultFilter };

        const [result, total] = await this.repo.findAndCount({
            take: rowsPerPage,
            skip: page * rowsPerPage,
            where: filter,
            order: { id: 'ASC' },
            relations: {
                avatar: true,
                attendances: {
                    rating: true,
                },
            },
        });

        return {
            total,
            data: result.map((item) => {
                if (item.avatar instanceof Avatar) {
                    item.avatar = bufferToImage(item.avatar.data);
                }

                if (item.attendances) {
                    const ratings = item.attendances.filter((el) => el.rating).map((el) => el.rating);

                    if (ratings.length > 0) {
                        item.rating = ratings.reduce((acc, cur) => acc + cur.value, 0) / ratings.length;
                        item.ratingCount = ratings.length;
                    }
                }

                return item;
            }),
        };
    }

    async update(id: number, updateProfessionalDto: UpdateProfessionalDto) {
        const oldProfessional = await this.repo.findOne({ where: { id } });

        if (!oldProfessional) {
            throw new PersonNotFoundException();
        }

        const updatedProfessional = Object.assign(oldProfessional, updateProfessionalDto);

        return this.repo.save(updatedProfessional);
    }

    async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
        const oldProfessional = await this.repo.findOne({
            where: { id },
            select: { password: true },
        });

        if (!oldProfessional) {
            throw new PersonNotFoundException();
        }

        const isCurrentPasswordValid = await bcrypt.compare(
            updatePasswordDto.currentPassword,
            oldProfessional.password,
        );
        if (!isCurrentPasswordValid) {
            throw new InvalidCredentialsException();
        }

        const updatedUProfessional = Object.assign(oldProfessional, {
            password: bcrypt.hashSync(updatePasswordDto.newPassword, 10),
        });

        return this.repo.update({ id }, updatedUProfessional);
    }

    async remove(id: number) {
        const professional = await this.repo.findOne({ where: { id } });

        if (!professional) {
            throw new PersonNotFoundException();
        }

        return this.repo.remove([professional]);
    }
}
