import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Professional } from './entities/professional.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, FindOptionsWhere, Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import puppeteer from 'puppeteer';
import { ConfigService } from '@nestjs/config';
import { ValidateProfessionalException } from 'src/shared/exceptions/validate-professional';
import { FindProfessionalDto } from './dto/find-professional.dto';

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
                                    return el.Nome.toLowerCase().includes(professional.name.toLowerCase()) && el.situacao === 'ATIVO';
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
            throw new BadRequestException('Invalid Professional credentials (CPF, CRP and Name)');
        }

        return this.repo.save(professional).catch((err) => {
            if (/(email)[\s\S]+(already exists)/.test(err.detail)) {
                throw new BadRequestException('Account with this email already exists.');
            }
            throw new BadRequestException(err.message);
        });
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    async findAll(findProfessionalDto: FindProfessionalDto) {
        const { take, skip, type, languages, reason } = findProfessionalDto;

        const typeAndLangFilter: FindOptionsWhere<Professional> = {
            ...(type && { type }),
            ...(languages && { languages: ArrayContains(languages) }),
        };

        const likeColumns = ['abstract', 'expericences', 'specializations', 'description', 'historic'];

        const [result, total] = await this.repo.findAndCount({
            take: take,
            skip: skip,
            where: reason
                ? likeColumns.map((column) => ({
                      [column]: Like(`%${reason}%`),
                      ...typeAndLangFilter,
                  }))
                : { ...typeAndLangFilter },
        });

        return {
            total,
            data: result,
        };
    }

    async update(id: number, updateProfessionalDto: UpdateProfessionalDto) {
        const oldProfessional = await this.repo.findOne({ where: { id } });

        if (!oldProfessional) {
            throw new NotFoundException();
        }

        const updatedProfessional = Object.assign(oldProfessional, updateProfessionalDto);

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
