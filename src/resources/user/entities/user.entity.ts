import { Gender } from 'src/shared/enums/gender';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    surname?: string | null;

    @Column({
        type: 'enum',
        enum: Gender,
    })
    gender: Gender;

    @Column({
        type: 'date',
    })
    birthDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    constructor(
        email: string,
        password: string,
        name: string,
        surname: string,
        gender: Gender,
        birthDate: Date,
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.birthDate = birthDate;
    }
}
