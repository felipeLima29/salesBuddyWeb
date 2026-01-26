import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import InputUser from "./inputs/inputUser";

function ResetPasswordModal({ isOpen, handleClose, id }) {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            const appRoot = document.getElementById('root') || document.getElementById('__next');
            if (appRoot) {
                appRoot.style.filter = 'blur(5px)';
                appRoot.style.pointerEvents = 'none';
            }
        } else {
            const appRoot = document.getElementById('root') || document.getElementById('__next');
            if (appRoot) {
                appRoot.style.filter = 'none';
                appRoot.style.pointerEvents = 'auto';
            }
        }

        return () => {
            const appRoot = document.getElementById('root') || document.getElementById('__next');
            if (appRoot) {
                appRoot.style.filter = 'none';
                appRoot.style.pointerEvents = 'auto';
            }
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;


    const modalContent = (
        <div className="backgroundModalDelete"
            style={{
                backdropFilter: 'none',
                webkitBackdropFilter: 'none'
            }}>
            <div className="modalContent" style={{ pointerEvents: 'auto' }}>
                <span className="spanResetPassword">Insira sua senha atual</span>
                <InputUser 
                    placeholder="Senha atual"
                />

                <span className="spanResetPassword">Insira sua nova senha</span>
                <InputUser 
                    placeholder="Nova senha"
                />
                
                <div className="modalActions">
                    <button className="btnYes">ALTERAR</button>
                    <button className="btnNo" onClick={handleClose}>CANCELAR</button>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body)
}

export default ResetPasswordModal;