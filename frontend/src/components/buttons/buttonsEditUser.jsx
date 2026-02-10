import { Link } from "react-router-dom";
import icRefresh from '../../assets/icRefresh.svg';
import icSave from '../../assets/icSave.svg/'

function ButtonEditUser({
    onSave,
    onReset,
    classNameTxSave,
    classNameButtonSave,
    classNameTxReset,
    classNameButtonreset,
    loading
}) {
    return (
        <div className="buttonUserContainer">

            <div
                onClick={!loading ? onSave : undefined}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    pointerEvents: loading ? 'none' : 'auto'
                }}
            >
                <button disabled={loading} className={classNameButtonSave}>
                    <img src={icSave} alt="Salvar" />
                </button>
                <span className={classNameTxSave}>
                    {loading ? 'CADASTRANDO...' : 'SALVAR ALTERAÇÕES'}
                </span>
            </div>

            <div onClick={onReset}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                }}>
                <button className={classNameButtonreset}>
                    <img src={icRefresh} alt="Refresh" />
                </button>
                <span className={classNameTxReset}>RESETAR SENHA</span>
            </div>

        </div>
    )
}

export default ButtonEditUser;