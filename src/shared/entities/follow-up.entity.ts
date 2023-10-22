import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';

@Entity('followUp')
export class FollowUp {
    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn()
    @ManyToOne(() => Attendance, (attendance) => attendance.followUps)
    attendance: Attendance;

    @Column()
    attendanceId: number;

    @Column({
        type: 'varchar',
        length: 1000,
    })
    title: string;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true,
    })
    description?: string;

    constructor(attendanceId: number, title: string, description?: string) {
        this.attendanceId = attendanceId;
        this.title = title;
        this.description = description;
    }
}
