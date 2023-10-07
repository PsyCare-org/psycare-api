import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Professional } from '../professional/entities/professional.entity';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { InvalidCredentialsException } from 'src/shared/exceptions/invalid-credentials';
import { JwtService } from '@nestjs/jwt';
import { PersonNotFoundException } from 'src/shared/exceptions/person-not-found';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Professional)
        private readonly proRepo: Repository<Professional>,
        private jwtService: JwtService,
    ) {}

    async signIn({ email, password }: SignInDto) {
        const user = await this.userRepo.findOne({
            where: { email },
            select: { id: true, name: true, email: true, password: true },
        });
        const professional = await this.proRepo.findOne({
            where: { email },
            select: { id: true, name: true, email: true, password: true },
        });

        if (!user && !professional) {
            throw new PersonNotFoundException();
        }

        const personType = !!user ? 'user' : 'professional';
        const isValid = bcrypt.compareSync(password, personType === 'user' ? user.password : professional.password);

        if (!isValid) {
            throw new InvalidCredentialsException();
        }

        return {
            id: user?.id || professional?.id,
            type: personType,
            name: user?.name || professional?.name,
            email: user?.email || professional?.email,
            accessToken: this.jwtService.sign({
                sub: user?.id || professional?.id,
                email: user?.email || professional?.email,
                type: personType,
            }),
        };
    }
}
