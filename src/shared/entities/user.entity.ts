import { Person } from 'src/shared/classes/person';
import { Entity, OneToMany } from 'typeorm';
import { Attendance } from './attendance.entity';

@Entity('user')
export class User extends Person {
    @OneToMany(() => Attendance, (attendance) => attendance.user)
    attendances: Attendance[];
}
