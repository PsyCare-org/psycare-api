import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    migrations: [`${__dirname}/**/core/seeds/*.ts`],
    entities: [`${__dirname}/**/shared/entities/*.ts`],
});
