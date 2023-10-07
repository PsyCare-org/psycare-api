import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('avatar')
export class Avatar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    name: string;

    @Column({
        type: 'bytea',
    })
    data: Uint8Array;

    constructor(name: string, data: Uint8Array) {
        this.name = name;
        this.data = data;
    }
}
