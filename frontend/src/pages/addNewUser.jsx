import { useState } from 'react';
import icPersonBlue from '../assets/icPersonBlue.svg';
import ButtonEditUser from '../components/buttons/buttonsEditUser';
import InputAddUser from '../components/inputs/inputAddUser';
import axios from 'axios';
import { toast } from 'react-toastify';

function addNewUser() {

    const [usuario, setUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [cnpj, setCnpj] = useState('');

    const handleInsert = async (e) => {
        if(e) e.preventDefault();

        if(!usuario, !nome, !email, !empresa, !cnpj){
            toast.error('Preencha todos os campos.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/insertUser',
                {usuario, nome, email, empresa, cnpj}
            );

            toast.success('Usuário inserido com sucesso.');
            setUsuario('');
            setNome('');
            setEmail('');
            setEmpresa('');
            setCnpj('');
            console.log(response.data);
        } catch (error) {   
            error.message;
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
                        <InputAddUser 
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="NOME" className='txViewInfo'>NOME</label>
                        <InputAddUser
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="E-MAIL" className='txViewInfo'>E-MAIL</label>
                        <InputAddUser
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="EMPRESA" className='txViewInfo'>EMPRESA</label>
                        <InputAddUser
                            value={empresa}
                            onChange={(e) => setEmpresa(e.target.value)}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="CNPJ" className='txViewInfo'>CNPJ</label>
                        <InputAddUser 
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                        />
                    </div>
                </div>
                <ButtonEditUser 
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