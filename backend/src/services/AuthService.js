import User from "../models/User.js";
import bcrypt from "bcryptjs";
import AppError from "../utils/appError.js";
import dotenv from 'dotenv';

dotenv.config();

class AuthService {

    async login(dto) {
        const userFound = await User.findOne({
            where: { usuario: dto.usuario }
        })
        if (!userFound) {
            throw new Error("Usuário não encontrado.");
        }
        const passwordMatch = await bcrypt.compare(dto.password, userFound.password);
        console.log(process.env.EMAIL_RESET, " | ", process.env.PASSWORD_RESET);
        if(!passwordMatch) {
            throw new AppError('Senha incorreta.', 401);
        }
        return passwordMatch;
    }

}

export default new AuthService();