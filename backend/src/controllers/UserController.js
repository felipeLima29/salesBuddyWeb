import UserDTO from "../dtos/UserDTO.js";
import sendEmailUser from "../services/EmailProvider.js";
import UserService from "../services/UserService.js";
import isNull from "../utils/verifyIsNull.js";

export async function insertUser(req, res) {
    try {
        const userDto = new UserDTO(req.body);
        if (isNull(userDto.usuario) ||
            isNull(userDto.nome) ||
            isNull(userDto.email) ||
            isNull(userDto.empresa) ||
            isNull(userDto.cnpj)) {
            return res.status(400).json({
                error: true,
                message: "Todos os campos são obrigatórios."
            });
        }
        const clearCnpj = userDto.cnpj.replace(/\D/g, '');
        userDto.cnpj = clearCnpj;
        const { newUser, tempPassword } = await UserService.createUser(userDto);
        sendEmailUser(newUser.email, tempPassword);

        return res.status(201).json({
            message: "Usuário inserido com sucesso.",
            user: newUser,
            password: tempPassword
        })
    } catch (error) {
        return res.status(409).json({
            error: true,
            message: error.message
        })
    }
}

export async function listAllUser(req, res) {
    try {
        const listUsers = await UserService.listAllUsers();
        return res.status(200).json(listUsers)
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

export async function getUserId(req, res) {
    try {
        const userDto = new UserDTO(req.params);
        if (isNull(req.params.id)) {
            return res.status(400).json({
                error: true,
                message: "ID do usuário é obrigatório."
            });
        }
        const getUser = await UserService.getUserId(userDto);

        return res.status(200).json(getUser)
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const userDto = new UserDTO(req.body);

        if (isNull(id) ||
            isNull(userDto.usuario) ||
            isNull(userDto.nome) ||
            isNull(userDto.email) ||
            isNull(userDto.empresa) ||
            isNull(userDto.cnpj)) {
            return res.status(400).json({
                error: true,
                message: "Todos os campos são obrigatórios."
            });
        }
        await UserService.updateUser(userDto, id);

        return res.status(200).json({
            message: "Usuário atualizado com sucesso."
        })
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

export async function deleteUsers(req, res) {
    try {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Nenhum ID fornecido ou formato inválido." });
        }
        const response = await UserService.deleteUsers(ids);

        console.log(response);
        return res.status(200).json({
            message: "Usuário(s) deletado(s) com sucesso.",
            affectedRows: response
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

export async function changePassword(req, res) {
    try {
        const userDto = new UserDTO(req.body);
        const usuario = userDto.usuario;
        if (isNull(usuario)) {
            return res.status(400).json({
                error: true,
                message: "Usuário e nova senha são obrigatórios."
            });
        }

        await UserService.changePassword(usuario);
        return res.status(200).json({
            message: "Senha alterada com sucesso. Verifique seu email."
        });

    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error.message
        })
    }
}