import icLogo from '../assets/icLogo.svg';
import InputUser from '../components/inputs/inputUser.jsx';
import InputPassword from '../components/inputs/inputPassword.jsx';
import ButtonLogin from '../components/buttons/buttonLogin.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { isNull } from '../utils/verifyIsNull.js';
import { toast } from 'react-toastify';
import axios from 'axios';

function PortalLogin() {

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (isNull(usuario) || isNull(password)) {
            toast.success('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/login',
                { usuario, password }
            );
            const responseData = response.data;

            navigate('/usersList');
            toast.success(responseData.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bodyLogin'>
            <div className="logoContainer">
                <img src={icLogo} alt="icLogo" id="icLogo" />

            </div>
            <div className='inputContainer'>
                <InputUser onChange={(e) => setUsuario(e.target.value)} />
                <InputPassword onChange={(e) => setPassword(e.target.value)} />

                <ButtonLogin handleLogin={handleLogin} />

                <Link to="/forgotPassword"
                    id="navForgetPassword"
                    style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '13px',
                        fontWeight: '600'
                    }}>Esqueci a senha
                </Link>
            </div>
        </div>
    )
}

export default PortalLogin;