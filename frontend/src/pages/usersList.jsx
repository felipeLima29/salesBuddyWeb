import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import icEditUser from '../assets/icEditUser.svg';
import ButtonListUser from "../components/buttons/buttonsListUser.jsx";
import ConfirmModalDelete from '../components/confirmModal.jsx';

function UserList() {

    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = () => {
        setIsModalOpen(true);
    }
    const handleClose = () => {
        setIsModalOpen(false);
    }

    const listUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/listAllUser');

            if (response.data) {
                setUsers(response.data);
            } else {
                toast.info('Sem usuários cadastrados');
            }
        } catch (error) {
            error.message;
        }
    }

    useEffect(() => {
        listUsers()
    }, []);

    return (
        <div className="bodyGeral">
            <div className={isModalOpen ? 'bodyModalOpen body' : 'body'}>

                <div className="containerList">

                    <table className="tableUsersList">
                        <tr>
                            <td></td>
                            <td className="txViewTable">USUÁRIO</td>
                            <td className="txViewTable">NOME</td>
                            <td className="txViewTable">EMPRESA</td>
                            <td className="txViewTable">CNPJ</td>
                        </tr>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td><input type="checkbox" id="checkbox" /></td>
                                <td className="txViewUser">{user.usuario}</td>
                                <td className="txViewUsersSales">{user.nome}</td>
                                <td className="txViewUsersSales">{user.empresa}</td>
                                <td className="txViewUsersSales">{user.cnpj}</td>
                                <td>
                                    <Link to='/usersList/editUser' style={{
                                        display: 'block',
                                        width: '20px',
                                        height: '20px',
                                        padding: 0,
                                        marginBottom: '15px',
                                        marginRight: '40vh'
                                    }}>
                                        <img src={icEditUser} alt="Editar usuário" className="icEditUser" />
                                    </Link>
                                </td>
                            </tr>
                        ))}

                    </table>
                    <ButtonListUser
                        classNameButtonDelete="buttonInactiveUser"
                        classNameTxDelete="txInactiveUser"
                        handleOpen={handleOpen}
                    />

                </div>

            </div>


            <ConfirmModalDelete
                isOpen={isModalOpen}
                handleClose={handleClose}
            />


        </div>

    )
}

export default UserList;