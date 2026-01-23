import UserDTO from "../dtos/UserDTO.js";
import AuthService from "../services/AuthService.js";
import AppError from "../utils/appError.js";

export async function login(req, res) {

    const { usuario, password } = new UserDTO(req.body);

    if (!usuario || !password) {
        return res.status(400).json({
            error: true,
            message: "Usuário e senha são obrigatórios."
        });
    }

    try {
        await AuthService.login({ usuario, password });

        return res.status(200).json({
            error: false,
            login: true,
            message: "Login realizado com sucesso."
        });
    } catch (error) {

        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                error: true,
                login: false,
                message: error.message
            });
        }

        return res.status(500).json({
            error: true,
            login: false,
            message: error.message
        })
    }
}