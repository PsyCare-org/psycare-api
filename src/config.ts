export default () => ({
    port: parseInt(process.env.PORT) || 8000,
    cfpUrl: 'https://cadastro.cfp.org.br/',
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
    auth: {
        privateKey: process.env.AUTH_PRIVATE_KEY,
        publicKey: process.env.AUTH_PUBLIC_KEY,
    },
});
