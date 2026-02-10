import icLogo from '../assets/icLogo.svg';
import InputUser from '../components/inputs/inputUser.jsx';
import ButtonLogin from '../components/buttons/buttonLogin.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth.jsx';
import { useEffect, useRef } from 'react';

function PortalLogin() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const validationSchema = Yup.object({
        usuario: Yup.string().required('Usuário é obrigatório.'),
        password: Yup.string().required('Senha é obrigatório.')
    });

    const formik = useFormik({
        initialValues: {
            usuario: '',
            password: ''
        },
        validationSchema: validationSchema,

        onSubmit: async (values) => {
            try {
                await login(values.usuario, values.password);
                toast.success('Login realizado com sucesso.');
                navigate('/usersList');
            } catch (error) {
                toast.error(error.message);
            }
        }
    });

    const trys = useRef(0);
    useEffect(() => {
        if (formik.submitCount > trys.current) {
            trys.current = formik.submitCount
            
            if(!formik.isValid) {
                const listErrors = Object.values(formik.errors);
                if(listErrors.length > 0){
                    toast.error(listErrors[0])
                }
            }

        }
    }, [formik.submitCount, formik.isValid, formik.errors]);

    return (
        <div className='bodyLogin'>
            <div className="logoContainer">
                <img src={icLogo} alt="icLogo" id="icLogo" />
            </div>

            <form onSubmit={formik.handleSubmit} className='inputContainer'>
                <div>
                    <InputUser
                        name='usuario'
                        type="text"
                        className='inputLogin'
                        placeholder="Usuário"
                        value={formik.values.usuario}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                </div>

                <div>
                    <InputUser
                        name='password'
                        type='password'
                        className='inputLogin'
                        placeholder="Senha"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                </div>

                <ButtonLogin handleLogin={formik.handleSubmit} text="LOGIN" />

                <Link to="/forgotPassword"
                    id="navForgetPassword"
                    style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '13px',
                        fontWeight: '600'
                    }}>Esqueci a senha
                </Link>
            </form >
        </div>

    )
}

export default PortalLogin;