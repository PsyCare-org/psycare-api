import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Meeting } from './meeting.entity';

@Entity('note')
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn()
    @OneToOne(() => Meeting, (meeting) => meeting.note)
    meeting: Meeting;

    @Column()
    meetingId: number;

    @Column({
        type: 'varchar',
        length: 1000,
    })
    status: string;

    @Column({
        type: 'varchar',
        length: 2000,
    })
    relatory: string;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true,
    })
    analisys?: string;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true,
    })
    observations?: string;

    constructor(meetingId: number, status: string, relatory: string, analisys?: string, observations?: string) {
        this.meetingId = meetingId;
        this.status = status;
        this.relatory = relatory;
        this.analisys = analisys;
        this.observations = observations;
    }
}
