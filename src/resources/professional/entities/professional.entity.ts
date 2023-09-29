import { Person } from 'src/shared/classes/person';
import { Gender } from 'src/shared/enums/gender';
import { ProfessionalType } from 'src/shared/enums/professional-type';
import { Column, Entity } from 'typeorm';

@Entity('professional')
export class Professional extends Person {
    @Column({
        type: 'enum',
        enum: ProfessionalType,
    })
    type: ProfessionalType;

    @Column({
        type: 'varchar',
        array: true,
        length: 255,
    })
    languages: string[];

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
        name: string,
        surname: string,
        gender: Gender,
        birthDate: Date,
        type: ProfessionalType,
        languages: string[],
        abstract: string,
        expericences?: string,
        specializations?: string,
        description?: string,
        historic?: string,
    ) {
        super(email, password, name, surname, gender, birthDate);

        this.type = type;
        this.languages = languages;
        this.abstract = abstract;
        this.expericences = expericences;
        this.specializations = specializations;
        this.description = description;
        this.historic = historic;
    }
}