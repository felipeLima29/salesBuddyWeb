import UserDTO from "../dtos/UserDTO.js";
import UserService from "../services/UserService.js";


export async function insertUser(req, res) {

    try {
        const userDto = new UserDTO(req.body);
        await UserService.createUser(userDto);

        return res.status(201).json({ msg: "Usuário inserido com sucesso." });
    } catch (error) {
        return res.status(400).json({
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