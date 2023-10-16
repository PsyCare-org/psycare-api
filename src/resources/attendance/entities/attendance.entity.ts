import { AttendanceStatus } from 'src/shared/enums/attendance-stats';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CalendarHour } from 'src/shared/types';
import { Professional } from 'src/resources/professional/entities/professional.entity';
import { User } from 'src/resources/user/entities/user.entity';

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
