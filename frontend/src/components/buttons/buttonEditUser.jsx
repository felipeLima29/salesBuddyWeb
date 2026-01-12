import { Link } from "react-router-dom";
import icRefresh from '../../assets/icRefresh.svg';
import icSave from '../../assets/icSave.svg/'

function ButtonEditUser() {
    return (
        <div className="buttonUserContainer">
            <Link style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>
                <button className="buttonEditUser">
                    <img src={icSave} alt="Salvar" />
                </button>
                <span className="txEditUser">SALVAR ALTERAÇÕES</span>
            </Link>

            <Link style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>
                <button className="buttonEditUser">
                    <img src={icRefresh} alt="Refresh"/>
                </button>
                <span className="txEditUser">RESETAR SENHA</span>
            </Link>
        </div>
    )
}

export default ButtonEditUser;