import icEditUser from '../assets/icEditUser.svg';
import InputAddUser from '../components/inputs/inputAddUser';
import ButtonEditUser from '../components/buttons/buttonsEditUser';
import { isNull } from '../utils/verifyIsNull';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ResetPasswordModal from '../components/resetPasswordModal';

function EditUser() {

    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        usuario: '',
        nome: '',
        email: '',
        empresa: '',
        cnpj: ''
    });

    const handleOpen = () => {
        setIsModalOpen(true);
    }
    const handleClose = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {

        const getUser = async () => {
            const response = await axios.get(`http://localhost:3000/getUserId/${id}`,
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            );
            const user = response.data;

            const findUser = {
                usuario: user.usuario,
                nome: user.nome,
                email: user.email,
                empresa: user.empresa,
                cnpj: user.cnpj
            };

            setFormData({
                usuario: findUser.usuario,
                nome: findUser.nome,
                email: findUser.email,
                empresa: findUser.empresa,
                cnpj: findUser.cnpj
            })
        }
        getUser();
    }, [id]);

    const updateUser = async () => {

        if (
            isNull(formData.usuario) ||
            isNull(formData.nome) ||
            isNull(formData.email) ||
            isNull(formData.empresa) ||
            isNull(formData.cnpj)
        ) {
            toast.error('Preenchar todos os campos.');
            return;
        }
        try {
            const response = await axios.put(`http://localhost:3000/updateUser/${id}`, formData,
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            );
            toast.success('Usuário atualizado com sucesso!');
            console.log(response.data);
        } catch (error) {
            toast.error(error.response.data.message);
            error.body;
        }

    }

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
                    <div className="divAddUser">
                        <label htmlFor="NOME" className="txViewInfo">EMAIL</label>
                        <InputAddUser
                            name='email'
                            value={formData.email}
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
                    onSave={updateUser}
                    onReset={handleOpen}
                    classNameTxSave='txActiveUser'
                    classNameButtonSave='buttonActiveUser'
                    classNameTxReset='txInactiveUser'
                    classNameButtonreset='buttonInactiveUser'
                />
            </div>

            <ResetPasswordModal
                handleClose={handleClose}
                isOpen={isModalOpen}
                usuario={formData.usuario}
            />
        </div>
    )
}
export default EditUser;