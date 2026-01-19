import { Link } from 'react-router-dom';
import icAddUser from '../../assets/icAddUser.svg';
import icDeleteUser from '../../assets/icDeleteUser.svg';

function ButtonListUser({ classNameButtonDelete, classNameTxDelete, handleOpen }) {

    return (
        <div className='buttonUserContainer'>
            <Link to="/usersList/addNewUser" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>

                <button className="buttonActiveUser">
                    <img src={icAddUser} alt="Adicionar" className="iconAddUser" />
                </button>
                <span className="txActiveUser">CADASTRAR NOVO USUÁRIO</span>
            </Link>

            
            <Link onClick={handleOpen} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>

                <button className={classNameButtonDelete}>
                    <img src={icDeleteUser} alt="Deletar usuário" />
                </button>
                <span className={classNameTxDelete}>EXCLUIR USUÁRIO</span>

            </Link>

        </div>
    )
}

export default ButtonListUser;