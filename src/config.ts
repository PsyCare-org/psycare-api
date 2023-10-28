export default () => ({
    port: parseInt(process.env.PORT) || 8000,
    call: {
        apiUrl: process.env.CALL_API_URL,
        token: process.env.CALL_TOKEN,
    },
    professional: {
        validationUrl: 'https://cadastro.cfp.org.br/',
        bypass: {
            cpf: '000.000.000-00',
            crp: '00/00000',
        },
    },
    database: {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: false,
        autoLoadEntities: true,
    },
    auth: {
        privateKey: process.env.AUTH_PRIVATE_KEY,
        publicKey: process.env.AUTH_PUBLIC_KEY,
    },
});
