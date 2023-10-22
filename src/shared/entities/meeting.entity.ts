import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';
import { Note } from './note.entity';

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

    @OneToOne(() => Note, (note) => note.meeting, { nullable: true })
    note?: Note;

    constructor(attendanceId: number, dateTime?: string) {
        this.attendanceId = attendanceId;
        this.dateTime = dateTime;
    }
}
