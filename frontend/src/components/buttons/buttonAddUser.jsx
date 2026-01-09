import { Link } from 'react-router-dom';
import icAddUser from '../../assets/icAddUser.svg';
import icDeleteUser from '../../assets/icDeleteUser.svg';

function ButtonAddUser() {
    return (
        <div className='buttonUserContainer'>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>

                <button className="buttonAddUser">
                    <img src={icAddUser} alt="Adicionar" className="iconAddUser" />
                </button>
                <span>CADASTRAR NOVO USUÁRIO</span>
            </Link>

            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>

                <button className='buttonDeleteUser'>
                    <img src={icDeleteUser} alt="Deletar usuário"/>
                </button>
                <span>EXCLUIR USUÁRIO</span>

            </Link>

        </div>
    )
}

export default ButtonAddUser;