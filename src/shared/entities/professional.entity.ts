import { Person } from '@psycare/classes';
import { Gender, Language, ProfessionalType } from '@psycare/enums';
import { Column, Entity, OneToMany } from 'typeorm';
import { Attendance } from './attendance.entity';
import { Rating } from './rating.entity';

@Entity('professional')
export class Professional extends Person {
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
        super(email, password, phoneNumber, name, surname, gender, birthDate);

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
