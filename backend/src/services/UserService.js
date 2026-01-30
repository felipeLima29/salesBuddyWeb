import { Op, where } from "sequelize";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generatePassword from "../utils/generatePassword.js";
import AppError from "../utils/appError.js";
import { sendEmailUser } from "./EmailProvider.js";

class UserService {

    async createUser(dto) {
        const verifyUser = await User.findOne({
            where: {
                [Op.or]: [
                    { usuario: dto.usuario },
                    { email: dto.email }
                ],
            }
        })

        if (verifyUser) {
            throw new Error("Usuário já existe.");
        }

        const plainPassword = generatePassword();
        const passwordHash = await bcrypt.hash(plainPassword, 10);

        const newUser = await User.create({
            ...dto,
            isAdmin: false,
            password: passwordHash
        });

        newUser.password = undefined;
        return { newUser, tempPassword: plainPassword };
    }

    async listAllUsers() {
        const listUsers = await User.findAll({ attributes: ['id', 'usuario', 'nome', 'email', 'empresa', 'cnpj'] });
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

        const verifyAdmin = await User.findOne({
            where: {
                id: id,
                isAdmin: true
            }
        });
        if(verifyAdmin){
            throw new AppError("Você não poder alterar informações de um administrador.")
        }

        const userConflic = await User.findOne({
            where: {
                [Op.or]: [
                    { usuario: dto.usuario },
                    { email: dto.email }
                ],
                id: { [Op.ne]: id }
            }
        })
        if (userConflic) {
            throw new AppError('Email ou Usuário já foi cadastrado por outra pessoa.', 409)
        }
        await User.update(dto, {
            where: { id: id }
        });
    }

    async deleteUsers(array) {

        const verifyAdmin = await User.findOne({
            where: {
                id: array,
                isAdmin: true
            }
        })
        if(verifyAdmin){
            throw new AppError('Você não pode deletar um administrador.', 400);
        }

        const deleteRows = await User.destroy({
            where: { id: array }
        });
        return deleteRows;
    }

    async resetPassword(usuario) {
        if (!usuario) {
            throw new AppError("Usuário e nova senha são obrigatórios.", 400);
        }

        const user = await User.findOne({ where: { usuario } });
        if (!user) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        const plainPassword = generatePassword();
        const passwordHash = await bcrypt.hash(plainPassword, 10);

        const updatePassword = async () => {
            await User.update({ password: passwordHash }, {
                where: { usuario: usuario }
            });
            sendEmailUser(user.email, plainPassword);
        };
        return updatePassword();
    }

    async changePassword(usuario, actualPassword, newPassword) {
        const user = await User.findOne({ where: {usuario} });
        if(!user) {
            throw new AppError("Usuário não encontrado.", 404);
        }
        const passwordMatch = await bcrypt.compare(actualPassword, user.password);
        if(!passwordMatch){
            throw new AppError("Senha atual incorreta.", 401);
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);
        await User.update(
            {password: passwordHash},
            {where: {usuario: usuario}}
        );
    }

}
export default new UserService();