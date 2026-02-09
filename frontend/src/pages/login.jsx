import icLogo from '../assets/icLogo.svg';
import InputUser from '../components/inputs/inputUser.jsx';
import ButtonLogin from '../components/buttons/buttonLogin.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { isNull } from '../utils/verifyIsNull.js';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth.jsx';

function PortalLogin() {

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = async () => {
        if (isNull(usuario) || isNull(password)) {
            toast.info('Por favor, preencha todos os campos.');
            return;
        }

        try {
            await login(usuario, password);
            toast.success('Login realizado com sucesso.');
            navigate('/usersList');
            
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div className='bodyLogin'>
            <div className="logoContainer">
                <img src={icLogo} alt="icLogo" id="icLogo" />

            </div>
            <div className='inputContainer'>
                <InputUser type="text" className='inputLogin' placeholder="Usuário" onChange={(e) => setUsuario(e.target.value)} />
                <InputUser type="password" className='inputLogin' placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />

                <ButtonLogin handleLogin={handleLogin} text="LOGIN"/>

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