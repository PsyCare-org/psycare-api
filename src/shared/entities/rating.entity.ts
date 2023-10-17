import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';

@Entity('rating')
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn()
    @OneToOne(() => Attendance, (attendance) => attendance.rating)
    attendance: Attendance;

    @Column()
    attendanceId: number;

    @Column({
        type: 'float',
    })
    value: number;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true,
    })
    description?: string;

    @CreateDateColumn()
    createdAt: Date;

    constructor(attendanceId: number, value: number, description?: string) {
        this.attendanceId = attendanceId;
        this.value = value;
        this.description = description;
    }
}
