import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import icEditUser from '../assets/icEditUser.svg';
import ButtonListUser from "../components/buttons/buttonsListUser.jsx";
import ConfirmModalDelete from '../components/confirmModal.jsx';
import { formatCNPJ } from "../utils/formatters.js";
import { useUser } from "../hooks/useUser.jsx";

function UserList() {

    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState([]);
    const { list } = useUser();

    const handleOpen = () => {
        if (selectedUserId.length > 0) {
            setIsModalOpen(true);
        } else {
            toast.warn('Selecione um usuário para deletar.')
        }
    }
    const handleClose = () => {
        setIsModalOpen(false);
    }

    const handleCheckboxChange = (id) => {
        setSelectedUserId((prevIds) => {
            if (prevIds.includes(id)) {
                return prevIds.filter(prevId => prevId !== id);
            } else {
                return [...prevIds, id];
            }
        });
    };

    const getNamesSelecteds = () => {
        return users
            .filter(user => selectedUserId.includes(user.id))
            .map(user => user.usuario)
    };

    const listUsers = async () => {
        try {
            const response = await list();

            if (response) {
                setUsers(response);
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
                        <thead>
                            <tr>
                                <td></td>
                                <td className="txViewTable">USUÁRIO</td>
                                <td className="txViewTable">NOME</td>
                                <td className="txViewTable">EMPRESA</td>
                                <td className="txViewTable">CNPJ</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (

                                <tr key={user.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedUserId.includes(user.id)}
                                            onClick={() => handleCheckboxChange(user.id)}
                                        />
                                    </td>
                                    <td className="txViewUser">{user.usuario}</td>
                                    <td className="txViewUsersSales">{user.nome}</td>
                                    <td className="txViewUsersSales">{user.empresa}</td>
                                    <td className="txViewUsersSales">{formatCNPJ(user.cnpj)}</td>
                                    <td>
                                        <Link to={`/usersList/editUser/${user.id}`} style={{
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
                        </tbody>
                    </table>
                    <ButtonListUser
                        classNameButtonDelete={selectedUserId.length > 0 ? 'buttonActiveUser' : 'buttonInactiveUser'}
                        classNameTxDelete={selectedUserId.length > 0 ? 'txActiveUser' : 'txInactiveUser'}
                        handleOpen={handleOpen}
                    />

                </div>

            </div>

            <ConfirmModalDelete
                usuariosToDelete={getNamesSelecteds()}
                idsToDelete={selectedUserId}
                isOpen={isModalOpen}
                handleClose={handleClose}
                onSucess={() => {
                    listUsers()
                    setSelectedUserId([])
                }}
            />
        </div>
    )
}

export default UserList;