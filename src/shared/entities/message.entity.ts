import { PersonType } from '@psycare/types';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';

@Entity('message')
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn()
    @ManyToOne(() => Attendance, (attendance) => attendance.messages)
    attendance: Attendance;

    @Column()
    attendanceId: number;

    @Column({
        type: 'varchar',
        length: 20,
    })
    sender: PersonType;

    @Column({
        type: 'varchar',
        length: 1000,
    })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    constructor(attendanceId: number, sender: PersonType, content: string) {
        this.attendanceId = attendanceId;
        this.sender = sender;
        this.content = content;
    }
}
