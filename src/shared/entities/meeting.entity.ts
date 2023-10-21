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

    constructor(attendanceId: number, dateTime?: string) {
        this.attendanceId = attendanceId;
        this.dateTime = dateTime;
    }
}
