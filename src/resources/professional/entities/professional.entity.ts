import { Person } from 'src/shared/classes/person';
import { Gender } from 'src/shared/enums/gender';
import { Language } from 'src/shared/enums/language';
import { ProfessionalType } from 'src/shared/enums/professional-type';
import { Column, Entity } from 'typeorm';

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
        default: [Language.portuguese],
    })
    languages: Language[];

    @Column({
        type: 'varchar',
        length: 255,
    })
    abstract: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    expericences: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    specializations: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    description: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    historic: string;

    @Column({
        type: 'float',
        nullable: true,
    })
    rating: number;

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
