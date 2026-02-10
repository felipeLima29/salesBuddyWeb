import { useState } from "react";
import ButtonLogin from "../components/buttons/buttonLogin";
import InputUser from "../components/inputs/inputUser";
import { isNull } from "../utils/verifyIsNull";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

function ForgotPassword() {

    const [usuario, setUsuario] = useState("");
    const navigate = useNavigate();
    const { forgotPassword } = useUser();

    const handleChangePassword = async () => {
        if (isNull(usuario)) {
            toast.info("Por favor, preencha o campo de usuário.");
            return;
        }
        try {
            const response = await forgotPassword(usuario);
            toast.success(response.message);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }

    };

    return (
        <div className="bodyForgotPassword">
            <div className="divItens">
                <div className="divTxForgotPassword">
                    <h2>Esqueceu sua senha?</h2>
                    <h5>Digite seu login para receber uma nova senha temporária.</h5>
                </div>

                <div className="divInteractForgot">
                    <InputUser
                        placeholder="Digite seu login"
                        className='inputLogin'
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                    <ButtonLogin handleLogin={handleChangePassword} text="ENVIAR" />

                    <Link to='/' className="backLogin">VOLTAR PARA FAZER LOGIN</Link>
                </div>
            </div>

        </div>
    )
}

export default ForgotPassword;