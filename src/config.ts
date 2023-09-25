export default () => ({
    port: parseInt(process.env.PORT) || 8000,
    database: {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: true,
        autoLoadEntities: true,
    },
});
