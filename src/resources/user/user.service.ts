import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@psycare/entities';
import { InvalidCredentialsException, PersonNotFoundException } from '@psycare/exceptions';
import { UpdatePasswordDto } from '@psycare/dtos';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

    async create(createUserDto: CreateUserDto) {
        const user: User = new User(
            createUserDto.email,
            bcrypt.hashSync(createUserDto.password, 10),
            createUserDto.phoneNumber,
            createUserDto.name,
            createUserDto.surname,
            createUserDto.gender,
            new Date(createUserDto.birthDate),
        );

        return this.repo.save(user);
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const oldUser = await this.repo.findOne({ where: { id } });

        if (!oldUser) {
            throw new PersonNotFoundException();
        }

        const updatedUser = Object.assign(oldUser, updateUserDto);

        return this.repo.save(updatedUser);
    }

    async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
        const oldUser = await this.repo.findOne({
            where: { id },
            select: { password: true },
        });

        if (!oldUser) {
            throw new PersonNotFoundException();
        }

        const isCurrentPasswordValid = await bcrypt.compare(updatePasswordDto.currentPassword, oldUser.password);
        if (!isCurrentPasswordValid) {
            throw new InvalidCredentialsException();
        }

        const updatedUser = Object.assign(oldUser, {
            password: bcrypt.hashSync(updatePasswordDto.newPassword, 10),
        });

        return this.repo.update({ id }, updatedUser);
    }

    async remove(id: number) {
        const user = await this.repo.findOne({ where: { id } });

        if (!user) {
            throw new PersonNotFoundException();
        }

        return this.repo.remove([user]);
    }
}
