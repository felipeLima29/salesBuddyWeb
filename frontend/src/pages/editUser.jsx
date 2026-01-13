import icEditUser from '../assets/icEditUser.svg';
import InputAddUser from '../components/inputs/inputAddUser';
import ButtonEditUser from '../components/buttons/buttonsEditUser';
import { useState } from 'react';

function EditUser() {

    const [usuario, setUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [cnpj, setCnpj] = useState('');

    return (
        <div className="body">
            <div className="container">
                <div className="headerImg">
                    <img src={icEditUser} alt="Editar Usuário" />
                    <h3>EDITAR USUÁRIO</h3>
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
                            onChange={(e) => e.target.value}
                        />
                    </div>
                </div>
                <ButtonEditUser
                    classNameTxSave='txActiveUser'
                    classNameButtonSave='buttonActiveUser'
                    classNameTxReset='txInactiveUser'
                    classNameButtonreset='buttonInactiveUser'
                />

            </div>
        </div>
    )
}
export default EditUser;