import { Person } from 'src/shared/classes/person';
import { Entity } from 'typeorm';

@Entity('user')
export class User extends Person {}
