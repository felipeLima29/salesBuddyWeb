import { Link } from "react-router-dom";
import icRefresh from '../../assets/icRefresh.svg';
import icSave from '../../assets/icSave.svg/'

function ButtonEditUser({onSave, classNameTxSave, classNameButtonSave, classNameTxReset, classNameButtonreset}) {
    return (
        <div className="buttonUserContainer">
            
            <div onClick={onSave}
                 style={{ display: 'flex', alignItems: 'center', gap: '5px'}}
            >
                <button className={classNameButtonSave}>
                    <img src={icSave} alt="Salvar" />
                </button>
                <span className={classNameTxSave}>SALVAR ALTERAÇÕES</span>
            </div>

            <Link style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>
                <button className={classNameButtonreset}>
                    <img src={icRefresh} alt="Refresh"/>
                </button>
                <span className={classNameTxReset}>RESETAR SENHA</span>
            </Link>

        </div>
    )
}

export default ButtonEditUser;