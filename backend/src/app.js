import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import sequelize from './database/db.js';
import './models/User.js';
import './models/Sales.js';
import seedAdmin from './database/seedAdmin.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const startServer = async () => {
    try {
        await sequelize.sync({alter: true});
        console.log('Tabelas criadas no Banco de Dados!');

        await seedAdmin();

        app.listen(process.env.PORT, () => {
            console.log('Server rodando na porta', process.env.PORT);
        });
    } catch (error) {
        console.error('Erro ao conectar:', error.message);
    }
};

startServer();