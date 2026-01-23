import UserDTO from "../dtos/UserDTO.js";
import AuthService from "../services/AuthService.js";

export async function login(req, res) {

    const { usuario, password } = new UserDTO(req.body);

    if (!usuario || !password) {
        return res.status(400).json({
            error: true,
            message: "Usuário e senha são obrigatórios."
        });
    }

    try {
        const loginSuccess = await AuthService.login({ usuario, password });

        return res.status(200).json({
            error: false,
            message: loginSuccess ? "Login bem sucedido." : "Credenciais inválidas."
        });
    } catch (error) {
        return res.status(401).json({
            error: true,
            message: error.message
        })
    }
}