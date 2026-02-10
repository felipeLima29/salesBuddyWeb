import { useState } from 'react';
import icPersonBlue from '../assets/icPersonBlue.svg';
import ButtonEditUser from '../components/buttons/buttonsEditUser';
import { toast } from 'react-toastify';
import { isNull } from '../utils/verifyIsNull';
import validateEmail from '../utils/regex';
import { formatCNPJ } from '../utils/formatters';
import InputUser from '../components/inputs/inputUser';
import { useUser } from '../hooks/useUser';

function addNewUser() {

    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [cnpj, setCnpj] = useState('');
    const { create } = useUser();

    const handleInsert = async (e) => {
        if (e) e.preventDefault();

        if (
            isNull(usuario) ||
            isNull(nome) ||
            isNull(email) ||
            isNull(empresa) ||
            isNull(cnpj)
        ) {
            toast.error('Preenchar todos os campos.');
            return;
        }
        if (formatCNPJ(cnpj).length != 18) {
            toast.error('CNPJ inválido.');
            return;
        }
        if (!validateEmail(email)) {
            toast.error('E-mail inválido.');
            return;
        }
        setLoading(true);
        try {
            const response = await create(usuario, nome, email, empresa, cnpj);
            toast.success(response.message);
            setUsuario('');
            setNome('');
            setEmail('');
            setEmpresa('');
            setCnpj('');
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="body">
            <div className="container">
                <div className='headerImg'>
                    <img src={icPersonBlue} alt="Pessoa Icon" />
                    <h3>CADASTRAR NOVO USUÁRIO</h3>
                </div>

                <div className='formAddUser'>
                    <div className='divAddUser'>
                        <label htmlFor="USUÁRIOS" className='txViewInfo'>USUÁRIO</label>
                        <InputUser
                            className='inputAddUser'
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="NOME" className='txViewInfo'>NOME</label>
                        <InputUser
                            className='inputAddUser'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="E-MAIL" className='txViewInfo'>E-MAIL</label>
                        <InputUser
                            className='inputAddUser'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="EMPRESA" className='txViewInfo'>EMPRESA</label>
                        <InputUser
                            className='inputAddUser'
                            value={empresa}
                            onChange={(e) => setEmpresa(e.target.value)}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="CNPJ" className='txViewInfo'>CNPJ</label>
                        <InputUser
                            className='inputAddUser'
                            value={cnpj}
                            maxLength="18"
                            onChange={(e) => {
                                setCnpj(formatCNPJ(e.target.value));
                            }}
                        />
                    </div>
                </div>
                <ButtonEditUser
                    loading={loading}
                    onSave={handleInsert}
                    classNameTxSave='txActiveUser'
                    classNameButtonSave='buttonActiveUser'
                    classNameTxReset='txInactiveUser'
                    classNameButtonreset='buttonInactiveUser'
                />

            </div>


        </div>
    )

}

export default addNewUser;