import icEditUser from '../assets/icEditUser.svg';
import InputAddUser from '../components/inputs/inputAddUser';
import ButtonEditUser from '../components/buttons/buttonsEditUser';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditUser() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: '',
        usuario: '',
        nome: '',
        empresa: '',
        cnpj: ''
    });

    useEffect(() => {

        const getUser = async () => {

            const response = await axios.get(`http://localhost:3000/getUserId/${id}`);
            const user = response.data;

            const findUser = {
                usuario: user.usuario,
                nome: user.nome,
                empresa: user.empresa,
                cnpj: user.cnpj
            };

            setFormData({
                usuario: findUser.usuario,
                nome: findUser.nome,
                empresa: findUser.empresa,
                cnpj: findUser.cnpj
            })

        }

        getUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    };

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
                            name='usuario'
                            value={formData.usuario}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="NOME" className='txViewInfo'>NOME</label>
                        <InputAddUser
                            name='nome'
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="EMPRESA" className='txViewInfo'>EMPRESA</label>
                        <InputAddUser
                            name='empresa'
                            value={formData.empresa}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="CNPJ" className='txViewInfo'>CNPJ</label>
                        <InputAddUser
                            name='cnpj'
                            value={formData.cnpj}
                            onChange={handleChange}
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