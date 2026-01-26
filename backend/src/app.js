import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import sequelize from './database/db.js';
import './models/User.js';
import './models/Sales.js';
import seedAdmin from './database/seedAdmin.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const startServer = async () => {
    try {
        await sequelize.sync();
        console.log('Tabelas criadas no Banco de Dados!');

        await seedAdmin();

        app.listen(3000, () => {
            console.log('Server rodando na porta 3000');
        });
    } catch (error) {
        console.error('Erro ao conectar:', error);
    }
};

startServer();