import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '../enums/gender';

export class Person {
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
        select: false,
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 15,
        nullable: true,
    })
    phoneNumber?: string;

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

    constructor(email: string, password: string, phoneNumber: string, name: string, surname: string, gender: Gender, birthDate: Date) {
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.birthDate = birthDate;
    }
}
