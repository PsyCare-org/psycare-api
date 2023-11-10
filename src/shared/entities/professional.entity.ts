import { Gender, Language, ProfessionalType } from '@psycare/enums';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';
import { Rating } from './rating.entity';
import { Avatar } from './avatar.entity';

@Entity('professional')
export class Professional {
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

    @JoinColumn({ name: 'avatarId' })
    @OneToOne(() => Avatar, { nullable: true })
    avatar?: Avatar | string | null;

    @Column({ nullable: true })
    avatarId?: number | null;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @Column({
        type: 'varchar',
        length: 14,
        select: false,
    })
    cpf: string;

    @Column({
        type: 'varchar',
        length: 8,
    })
    crp: string;

    @Column({
        type: 'enum',
        enum: ProfessionalType,
    })
    type: ProfessionalType;

    @Column({
        type: 'enum',
        enum: Language,
        array: true,
    })
    languages: Language[];

    @Column({
        type: 'varchar',
        length: 1000,
    })
    abstract: string;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true,
    })
    expericences?: string;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true,
    })
    specializations?: string;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true,
    })
    description?: string;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true,
    })
    historic?: string;

    @OneToMany(() => Attendance, (attendance) => attendance.professional)
    attendances: Attendance[];

    rating?: number;
    ratings?: Rating[];
    ratingCount?: number;

    occupiedHours?: Pick<Attendance, 'calendarHour' | 'userId'>[];

    constructor(
        email: string,
        password: string,
        phoneNumber: string = null,
        name: string,
        surname: string,
        gender: Gender,
        birthDate: Date,
        cpf: string,
        crp: string,
        type: ProfessionalType,
        languages: Language[],
        abstract: string,
        expericences?: string,
        specializations?: string,
        description?: string,
        historic?: string,
    ) {
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.birthDate = birthDate;
        this.cpf = cpf;
        this.crp = crp;
        this.type = type;
        this.languages = languages;
        this.abstract = abstract;
        this.expericences = expericences;
        this.specializations = specializations;
        this.description = description;
        this.historic = historic;
    }
}
