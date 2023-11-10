import { User } from '../../shared/entities';
import { MigrationInterface } from 'typeorm';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { Gender } from '../../shared/enums';
import * as bcrypt from 'bcrypt';
import { AppDataSource } from 'src/data-source';

export class UserSeed1699589519577 implements MigrationInterface {
    private generateUser(): User {
        const person = faker.person;
        const name = person.firstName();
        const surname = person.lastName();

        return new User(
            faker.internet.email({ firstName: name, lastName: surname, allowSpecialCharacters: false }),
            bcrypt.hashSync('Teste123@', 10),
            faker.phone.number('(##) #####-####'),
            name,
            surname,
            faker.helpers.enumValue(Gender),
            faker.date.between({ from: '1980-01-01', to: '2004-01-01' }),
        );
    }

    public async up(): Promise<void> {
        const users: User[] = faker.helpers.multiple(this.generateUser, { count: 50 });

        users.unshift(
            new User(
                'kau.matosr@gmail.com',
                bcrypt.hashSync('Teste123@', 10),
                '(54) 99907-4647',
                'Kauan',
                'Rocha',
                Gender.nonBinary,
                new Date('2000-06-02'),
            ),
        );

        await AppDataSource.getRepository(User).save(users);
    }

    public async down(): Promise<void> {}
}
