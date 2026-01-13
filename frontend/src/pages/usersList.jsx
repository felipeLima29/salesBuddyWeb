import icEditUser from '../assets/icEditUser.svg';
import ButtonListUser from "../components/buttons/buttonsListUser.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserList() {

    const [users, setUsers] = useState([]);

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
        <div className="body">

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
                            <td><input type="checkbox" className="checkbox" /></td>
                            <td className="txViewUser">{user.usuario}</td>
                            <td className="txViewUsersSales">{user.nome}</td>
                            <td className="txViewUsersSales">{user.empresa}</td>
                            <td className="txViewUsersSales">{user.cnpj}</td>
                            <td>
                                <Link to='/editUser'>
                                    <img src={icEditUser} alt="Editar usuário" className="icEditUser" />
                                </Link>
                            </td>
                        </tr>
                    ))}

                </table>
                <ButtonListUser
                    classNameButtonDelete="buttonInactiveUser"
                    classNameTxDelete="txInactiveUser"
                />
            </div>

        </div>
    )
}

export default UserList;