import icLogo from '../assets/icLogo.svg';
import InputUser from '../components/inputs/inputUser.jsx';
import InputPassword from '../components/inputs/inputPassword.jsx';
import ButtonLogin from '../components/buttons/buttonLogin.jsx';
import { Link } from 'react-router-dom';

function PortalLogin() {

    return (
        <div className='bodyLogin'>
            <div className="logoContainer">
                <img src={icLogo} alt="icLogo" id="icLogo" />

            </div>
            <div className='inputContainer'>
                <InputUser />
                <InputPassword />
                <Link to="/usersList"><ButtonLogin /></Link>
                <Link to="/forgot-password"
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