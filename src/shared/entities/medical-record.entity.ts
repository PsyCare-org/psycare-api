import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';

@Entity('medicalRecord')
export class MedicalRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn()
    @OneToOne(() => Attendance, (attendance) => attendance.medicalRecord)
    attendance: Attendance;

    @Column()
    attendanceId: number;

    @Column({
        type: 'varchar',
        length: 1000,
    })
    initialDemand: string;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true,
    })
    pastHistory?: string;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true,
    })
    intervationPlan?: string;

    @Column({
        type: 'varchar',
        length: 1000,
        nullable: true,
    })
    evolutions?: string;

    constructor(
        attendanceId: number,
        initialDemand: string,
        pastHistory?: string,
        intervationPlan?: string,
        evolutions?: string,
    ) {
        this.attendanceId = attendanceId;
        this.initialDemand = initialDemand;
        this.pastHistory = pastHistory;
        this.intervationPlan = intervationPlan;
        this.evolutions = evolutions;
    }
}
