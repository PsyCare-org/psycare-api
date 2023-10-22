import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';
import { FollowUpType } from '@psycare/enums/follow-up-type';

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
        type: 'enum',
        enum: FollowUpType,
    })
    type: FollowUpType;

    @Column({
        type: 'boolean',
    })
    check: boolean;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true,
    })
    description?: string;

    constructor(attendanceId: number, title: string, type: FollowUpType, check: boolean, description?: string) {
        this.attendanceId = attendanceId;
        this.title = title;
        this.type = type;
        this.check = check;
        this.description = description;
    }
}
