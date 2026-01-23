import { Op, where } from "sequelize";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generatePassword from "../utils/generatePassword.js";

class UserService {

    async createUser(dto) {
        const verifyUser = await User.findOne({
            where: {
                [Op.or]: [
                    {usuario: dto.usuario},
                    {email: dto.email}
                ],
            }
        })

        if (verifyUser) {
            throw new Error("Usuário já existe.");
        }
        
        const plainPassword = generatePassword();
        const passwordHash = await bcrypt.hash(plainPassword, 10);

        const newUser = User.create({
            ...dto,
            password: passwordHash
        });

        newUser.password = undefined;
        return { newUser, tempPassword: plainPassword };
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
            attributes: ['usuario', 'nome', 'email', 'empresa', 'cnpj']
        })
        if (!verifyUser) {
            throw new Error("Usuário com esse ID não encontrado.");
        }
        return verifyUser;
    }

    async updateUser(dto, id) {
        if (!dto) {
            throw new Error("Dados não fornecidos.");
        }
        const verifyUser = await User.findOne({
            where: { id: id }
        })
        if (!verifyUser) {
            throw new Error("Usuário não encontrado.");
        }
        const userConflic = await User.findOne({
            where: { 
                [Op.or]: [
                    {usuario: dto.usuario},
                    {email: dto.email}
                ],
                id: { [Op.ne]: id }
            }
        })
        if(userConflic){
            throw new Error("Email ou Usuário já foi cadastrado por outra pessoa.");
        }
        await User.update(dto, {
            where: { id: id }
        });
    }

    async deleteUsers(array) {
        const deleteRows = await User.destroy({
            where: {id: array}
        });
        return deleteRows;
    }

}
export default new UserService();