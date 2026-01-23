import User from "../models/User.js";
import bcrypt from "bcryptjs";
import AppError from "../utils/appError.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class AuthService {

    async login(dto) {
        const userFound = await User.findOne({
            where: { usuario: dto.usuario }
        })
        if (!userFound) {
            throw new AppError('Usuário não encontrado.', 401);
        }
        const passwordMatch = await bcrypt.compare(dto.password, userFound.password);
        if (!passwordMatch) {
            throw new AppError('Senha incorreta.', 401);
        }

        const token = jwt.sign(
            { id: userFound.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        return { token, userFound };
    }

}

export default new AuthService();