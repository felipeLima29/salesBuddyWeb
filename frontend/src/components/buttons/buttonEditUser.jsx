import { Link } from "react-router-dom";
import icRefresh from '../../assets/icRefresh.svg';
import icSave from '../../assets/icSave.svg/'

function ButtonEditUser({onSave, classNameTx, classNameButton}) {
    return (
        <div className="buttonUserContainer">
            
            <div onClick={onSave}
                 style={{ display: 'flex', alignItems: 'center', gap: '5px'}}
            >
                <button className="buttonSaveUser">
                    <img src={icSave} alt="Salvar" />
                </button>
                <span className="txSaveUser">SALVAR ALTERAÇÕES</span>
            </div>

            <Link style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>
                <button className={classNameButton}>
                    <img src={icRefresh} alt="Refresh"/>
                </button>
                <span className={classNameTx}>RESETAR SENHA</span>
            </Link>

        </div>
    )
}

export default ButtonEditUser;