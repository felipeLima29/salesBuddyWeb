import { Op, where } from "sequelize";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generatePassword from "../utils/generatePassword.js";
import AppError from "../utils/appError.js";
import { sendEmailUser } from "./EmailProvider.js";

class UserService {

    async createUser(dto) {
        if (dto.cnpj.length != 14) {
            throw new AppError('CNPJ inválido.', 400);
        }
        const verifyUser = await User.findOne({
            where: {
                [Op.or]: [
                    { usuario: dto.usuario },
                    { email: dto.email }
                ],
            }
        })

        if (verifyUser) {
            throw new AppError("Usuário já existe.", 409);
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
            throw new AppError("ID não fornecido.", 400);
        }
        const verifyUser = await User.findOne({
            where: { id: dto.id },
            attributes: ['usuario', 'nome', 'email', 'empresa', 'cnpj']
        })
        if (!verifyUser) {
            throw new AppError("Usuário com esse ID não encontrado.", 404);
        }
        return verifyUser;
    }

    async updateUser(dto, id) {
        if (!dto) {
            throw new AppError("Dados não fornecidos.", 400);
        }

        const user = await User.findByPk(id);
        if (!user) throw new AppError('Usuário não encontrado.', 404);
        if (user.isAdmin) throw new AppError('Você não pode alterar informações de um administrador.', 401);

        const conflictConditions = [];

        if (dto.email && dto.email == user.email) conflictConditions.push({ email: dto.email });

        if (dto.usuario && dto.usuario !== user.usuario) {
            conflictConditions.push({ usuario: dto.usuario });
        }

        if (conflictConditions.length > 0) {
            const userConflict = await User.findOne({
                where: {
                    [Op.or]: conflictConditions,
                    id: { [Op.ne]: id }
                }
            });

            if (userConflict) {
                throw new AppError('Email ou Usuário já em uso.', 409);
            }
        }

        const updateData = {};
        if (dto.nome) updateData.nome = dto.nome;
        if (dto.email) updateData.email = dto.email;
        if (dto.usuario) updateData.usuario = dto.usuario;
        if (dto.empresa) updateData.empresa = dto.empresa;
        if (dto.cnpj) updateData.cnpj = dto.cnpj;

        await user.update(updateData);
    }

    async deleteUsers(array) {

        const verifyAdmin = await User.findOne({
            where: {
                id: array,
                isAdmin: true
            }
        })
        if (verifyAdmin) {
            throw new AppError('Você não pode deletar um administrador.', 400);
        }

        const deleteRows = await User.destroy({
            where: { id: array }
        });
        return deleteRows;
    }

    async resetPassword(usuario) {
        if (!usuario) {
            throw new AppError("Digite um usuário para atualizar.", 400);
        }

        const user = await User.findOne({ where: { usuario } });
        if(user.isAdmin) throw new AppError('Você não tem autorização de alterar a senha de um administrador.', 401);
        if (!user) throw new AppError("Usuário não encontrado.", 404);

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
        const user = await User.findOne({ where: { usuario } });
        if (!user) {
            throw new AppError("Usuário não encontrado.", 404);
        }
        const passwordMatch = await bcrypt.compare(actualPassword, user.password);
        if (!passwordMatch) {
            throw new AppError("Senha atual incorreta.", 401);
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);
        await User.update(
            { password: passwordHash },
            { where: { usuario: usuario } }
        );
    }

}
export default new UserService();