export default {
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 2),
    synchronize: false,
    charset: 'utf8mb4',
    entities: [process.env.DB_ENTITIES]
};
