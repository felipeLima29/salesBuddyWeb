import { useState } from "react";
import ButtonLogin from "../components/buttons/buttonLogin";
import InputUser from "../components/inputs/inputUser";
import { isNull } from "../utils/verifyIsNull";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {

    const [usuario, setUsuario] = useState("");
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        if (isNull(usuario)) {
            toast.info("Por favor, preencha o campo de usuário.");
            return;
        }
        try {
            const response = await axios.put("http://localhost:3000/forgotPassword",
                { usuario }
            );

            const responseData = response.data;
            toast.success(responseData.message);
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message);
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