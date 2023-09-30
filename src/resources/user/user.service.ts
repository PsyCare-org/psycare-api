import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

    async create(createUserDto: CreateUserDto) {
        const user: User = new User(
            createUserDto.email,
            bcrypt.hashSync(createUserDto.password, 10),
            createUserDto.name,
            createUserDto.surname,
            createUserDto.gender,
            new Date(createUserDto.birthDate),
        );

        return this.repo.save(user).catch((err) => {
            if (/(email)[\s\S]+(already exists)/.test(err.detail)) {
                throw new BadRequestException('Account with this email already exists.');
            }
            throw new BadRequestException(err.message);
        });
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const oldUser = await this.repo.findOne({ where: { id } });

        if (!oldUser) {
            throw new NotFoundException();
        }

        const updatedUser = Object.assign(oldUser, updateUserDto);

        return this.repo.save(updatedUser);
    }

    async remove(id: number) {
        const user = await this.repo.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException();
        }

        return this.repo.remove([user]);
    }
}
