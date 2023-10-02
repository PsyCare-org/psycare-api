import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Professional } from '../professional/entities/professional.entity';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { InvalidCredentialsException } from 'src/shared/exceptions/invalid-credentials';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Professional)
        private readonly proRepo: Repository<Professional>,
        private jwtService: JwtService,
    ) {}

    async signIn({ email, password }: SignInDto) {
        const user = await this.userRepo.findOne({ where: { email } });
        const professional = await this.proRepo.findOne({ where: { email } });

        if (!user && !professional) {
            throw new NotFoundException({}, 'Usuário não encontrado');
        }

        const personType = !!user ? 'user' : 'professional';
        const isValid = bcrypt.compareSync(password, personType === 'user' ? user.password : professional.password);

        if (!isValid) {
            throw new InvalidCredentialsException();
        }

        return {
            id: user ? user.id : professional.id,
            name: !!user ? user.name : professional.name,
            email: !!user ? user.email : professional.email,
            accessToken: this.jwtService.sign({
                sub: !!user ? user.id : professional.id,
                email: !!user ? user.email : professional.email,
                type: personType,
            }),
        };
    }
}
