import { Attendance } from 'src/resources/attendance/entities/attendance.entity';
import { Person } from 'src/shared/classes/person';
import { Entity, OneToMany } from 'typeorm';

@Entity('user')
export class User extends Person {
    @OneToMany(() => Attendance, (attendance) => attendance.user)
    attendances: Attendance[];
}
