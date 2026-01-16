import User from "../models/User.js";

class UserService {

    async createUser(dto) {
        const verifyUser = await User.findOne({
            where: { usuario: dto.usuario }
        })

        if (verifyUser) {
            throw new Error("Usuário já existe.");
        }

        const newUser = User.create(dto);
        return newUser;
    }

    async listAllUsers() {
        const listUsers = await User.findAll({ attributes: ['id', 'usuario', 'nome', 'empresa', 'cnpj'] });
        return listUsers;
    }

    async getUserId(dto) {
        if (!dto.id) {
            throw new Error("ID não fornecido.");
        }

        const verifyUser = await User.findOne({
            where: { id: dto.id },
            attributes: ['usuario', 'nome', 'empresa', 'cnpj']
        })

        if (!verifyUser) {
            throw new Error("Usuário com esse ID não encontrado.");
        }

        return verifyUser;
    }

}
export default new UserService();