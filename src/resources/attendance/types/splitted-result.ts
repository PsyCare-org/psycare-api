import { Attendance } from '@psycare/entities';

export type SplitedResult = {
    pending: Attendance[];
    active: Attendance[];
    closed: Attendance[];
};
