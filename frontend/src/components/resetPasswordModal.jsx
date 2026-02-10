import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import InputUser from "./inputs/inputUser";
import { isNull } from "../utils/verifyIsNull";
import { toast } from "react-toastify";
import { useUser } from "../hooks/useUser";

function ResetPasswordModal({ isOpen, handleClose, usuario }) {

    const [mounted, setMounted] = useState(false);
    const [actualPassword, setActualPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const { resetPassword } = useUser();

    const handleChangePassword = async () => {
        if (isNull(actualPassword) || isNull(newPassword)) {
            toast.error('Preencha todos os campos.');
            return;
        }

        try {
            const response = await resetPassword(usuario, actualPassword, newPassword);
            toast.success(response.message);
            handleClose();
        } catch (error) {
            toast.error(error.message);
        }

    }

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            const appContent = document.getElementById('appContent') || document.getElementById('__next');
            if (appContent) {
                appContent.style.filter = 'blur(5px)';
                appContent.style.pointerEvents = 'none';
            }
        } else {
            const appContent = document.getElementById('appContent') || document.getElementById('__next');
            if (appContent) {
                appContent.style.filter = 'none';
                appContent.style.pointerEvents = 'auto';
            }
        }

        return () => {
            const appContent = document.getElementById('appContent') || document.getElementById('__next');
            if (appContent) {
                appContent.style.filter = 'none';
                appContent.style.pointerEvents = 'auto';
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
                    className='inputLogin'
                    type="password"
                    onChange={(e) => setActualPassword(e.target.value)}
                    placeholder="Senha atual"
                />

                <span className="spanResetPassword">Insira sua nova senha</span>
                <InputUser
                    className='inputLogin'
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nova senha"
                />

                <div className="modalActions">
                    <button className="btnYes" onClick={handleChangePassword}>ALTERAR</button>
                    <button className="btnNo" onClick={handleClose}>CANCELAR</button>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body)
}

export default ResetPasswordModal;