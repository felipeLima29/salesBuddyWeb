import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from 'dotenv';

dotenv.config();

export default async function seedAdmin() {
    try {
        const adminExists = await User.findOne({
            where: { usuario: process.env.USER_ADMIN }
        });

        if (adminExists){
            console.log("Admin já existe, cancelando criação.");
            return;
        }
        const hashPassword = await bcrypt.hash(process.env.PASSWORD_ADMIN, 10);
        
        await User.create({
            usuario: process.env.USER_ADMIN,
            password: hashPassword,
            nome: "Administrador",
            email: "admin@sistema.com",
            empresa: "Sistema",
            cnpj: "00.000.000/0001-00"
        })

        console.log("Admin criado com sucesso.");
    } catch (error) {
        console.log("Erro ao criar usuário admin:", error.message);
    }
}