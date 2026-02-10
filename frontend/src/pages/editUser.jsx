import icEditUser from '../assets/icEditUser.svg';
import ButtonEditUser from '../components/buttons/buttonsEditUser';
import { isNull } from '../utils/verifyIsNull';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ResetPasswordModal from '../components/resetPasswordModal';
import { formatCNPJ } from '../utils/formatters';
import validateEmail from '../utils/regex';
import InputUser from '../components/inputs/inputUser';
import { useUser } from '../hooks/useUser';

function EditUser() {

    const { edit, findUserId } = useUser();
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
            const user = await findUserId(id);
            console.log(user);

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
        if(formatCNPJ(formData.cnpj).length !=18){
            toast.error('CNPJ inválido.');
            return;
        }
        if(!validateEmail(formData.email)){
            toast.error('E-mail inválido.');
            console.log(validateEmail(formData.email));
            return;
        }
        try {
            const response = await edit(id, formData);
            toast.success(response);
        } catch (error) {
            toast.error(error.message);
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
                        <InputUser
                            name='usuario'
                            className='inputAddUser'
                            value={formData.usuario}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="NOME" className='txViewInfo'>NOME</label>
                        <InputUser
                            name='nome'
                            className='inputAddUser'
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="divAddUser">
                        <label htmlFor="NOME" className="txViewInfo">EMAIL</label>
                        <InputUser
                            name='email'
                            className='inputAddUser'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="EMPRESA" className='txViewInfo'>EMPRESA</label>
                        <InputUser
                            name='empresa'
                            className='inputAddUser'
                            value={formData.empresa}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="CNPJ" className='txViewInfo'>CNPJ</label>
                        <InputUser
                            maxLength="18"
                            name='cnpj'
                            className='inputAddUser'
                            value={formatCNPJ(formData.cnpj)}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <ButtonEditUser
                    onSave={updateUser}
                    onReset={handleOpen}
                    classNameTxSave='txActiveUser'
                    classNameButtonSave='buttonActiveUser'
                    classNameTxReset='txActiveUser'
                    classNameButtonreset='buttonActiveUser'
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