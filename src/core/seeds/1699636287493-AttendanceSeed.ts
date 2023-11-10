import { faker } from '@faker-js/faker';
import { Attendance, Professional, User } from '@psycare/entities';
import { AttendanceStatus, CalendarHour } from '@psycare/enums';
import { AppDataSource } from 'src/data-source';
import { MigrationInterface, Not } from 'typeorm';

export class AttendanceSeed1699636287493 implements MigrationInterface {
    private userRepo = AppDataSource.getRepository(User);
    private proRepo = AppDataSource.getRepository(Professional);
    private attendanceRepo = AppDataSource.getRepository(Attendance);

    private async handleMainAttendance() {
        const mainProfessional = await this.proRepo.findOne({
            where: { email: 'profissional@gmail.com' },
        });

        const mainUser = await this.userRepo.findOne({
            where: { email: 'kau.matosr@gmail.com' },
        });

        const attendance = new Attendance(
            AttendanceStatus.active,
            CalendarHour.ter09,
            mainProfessional.id,
            mainUser.id,
        );

        await this.attendanceRepo.save(attendance);
    }

    private async handleMainProfessionalAttendances() {
        const mainProfessional = await this.proRepo.findOne({
            where: { email: 'profissional@gmail.com' },
        });

        const [users] = await this.userRepo.findAndCount({
            where: { email: Not('kau.matosr@gmail.com') },
            take: 20,
            skip: 0,
        });

        const calendarHours = Object.keys(CalendarHour)
            .map((key) => CalendarHour[key])
            .filter((value) => typeof value === 'string' && value !== CalendarHour.ter09) as string[];

        const createAttendances = async (source: User[], status: AttendanceStatus) => {
            const attendances: Attendance[] = [];

            source.forEach((user) => {
                const calendarHourIndex = faker.helpers.rangeToNumber({ min: 0, max: calendarHours.length - 1 });

                attendances.push(
                    new Attendance(
                        status,
                        calendarHours[calendarHourIndex] as CalendarHour,
                        mainProfessional.id,
                        user.id,
                    ),
                );

                calendarHours.splice(calendarHourIndex, 1);
            });

            await this.attendanceRepo.save(attendances);
        };

        await createAttendances(users.slice(0, 3), AttendanceStatus.pending);
        await createAttendances(users.slice(4, 18), AttendanceStatus.active);
        await createAttendances(users.slice(19, 20), AttendanceStatus.closed);
    }

    public async up(): Promise<void> {
        await this.handleMainAttendance();

        await this.handleMainProfessionalAttendances();
    }

    public async down(): Promise<void> {}
}
