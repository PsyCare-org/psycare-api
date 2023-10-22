import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';

@Entity('meeting')
export class Meeting {
    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn()
    @ManyToOne(() => Attendance, (attendance) => attendance.meetings)
    attendance: Attendance;

    @Column()
    attendanceId: number;

    @Column({
        type: 'date',
        default: () => 'NOW()',
    })
    dateTime: string;

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

    constructor(
        attendanceId: number,
        dateTime: string,
        status: string,
        relatory: string,
        analisys?: string,
        observations?: string,
    ) {
        this.attendanceId = attendanceId;
        this.dateTime = dateTime;
        this.status = status;
        this.relatory = relatory;
        this.analisys = analisys;
        this.observations = observations;
    }
}
