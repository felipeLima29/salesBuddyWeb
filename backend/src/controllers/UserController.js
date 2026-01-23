import UserDTO from "../dtos/UserDTO.js";
import UserService from "../services/UserService.js";

export async function insertUser(req, res) {
    try {
        const userDto = new UserDTO(req.body);
        const { newUser, tempPassword } = await UserService.createUser(userDto);

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
        const listUsers = await UserService.listAllUsers({});
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