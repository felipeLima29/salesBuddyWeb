import { Sequelize } from "sequelize";

const sequelize = new Sequelize('salesbuddy', 'admin', 'admin', {
    host: '127.0.0.1',
    dialect: 'postgres',
    port: '5432',
    logging: false
});

export default sequelize;