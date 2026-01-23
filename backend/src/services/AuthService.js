import User from "../models/User.js";
import bcrypt from "bcryptjs";

class AuthService {

    async login(dto) {
        const userFound = await User.findOne({
            where: { usuario: dto.usuario }
        })
        if (!userFound) {
            throw new Error("Usuário não encontrado.");
        }
        const passwordMatch = await bcrypt.compare(dto.password, userFound.password);

        return passwordMatch;
    }

}

export default new AuthService();