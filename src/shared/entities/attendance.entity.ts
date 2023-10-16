import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AttendanceStatus } from '@psycare/enums';
import { CalendarHour } from '@psycare/types';
import { Professional } from './professional.entity';
import { User } from './user.entity';

@Entity('attendance')
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: AttendanceStatus,
    })
    status: AttendanceStatus;

    @Column({
        type: 'varchar',
        length: '6',
    })
    calendarHour: CalendarHour;

    @ManyToOne(() => Professional, { nullable: false })
    professional: Professional;

    @Column()
    professionalId: number;

    @ManyToOne(() => User, { nullable: false })
    user: User;

    @Column()
    userId: number;
}
