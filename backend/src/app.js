import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import sequelize from './database/db.js';

const app = express();
app.use(express.json());
app.use(cors())
app.use(router);

sequelize.sync().then(() => {
    console.log("Banco conectado!")
    app.listen(3000, () => {
        console.log("API rodando.")
    })
})