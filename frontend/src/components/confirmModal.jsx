import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';

function ConfirmModalDelete({ isOpen, usuariosToDelete, idsToDelete, handleClose, onSucess }) {
    const [mounted, setMounted] = useState(false);

    const deleteUser = async () => {
        try {
            console.log(idsToDelete)
            const ids = idsToDelete;
            const response = await axios.delete('http://localhost:3000/deleteUsers',
                {
                    data: { ids }
                });
            handleClose();
            onSucess();
            toast.success(response.data.msg);
        } catch (error) {
            handleClose();
            toast.error(error.message);
        }
    }

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
        <div className="backgroundModalDelete" style={{ backdropFilter: 'none', webkitBackdropFilter: 'none' }}>
            <div className="modalContent" style={{ pointerEvents: 'auto' }}>
                <span className="spanModalDelete">Você está prestes a excluir os seguintes usuários:</span>

                <ul className="usersList">
                    {Array.isArray(usuariosToDelete) ? (
                        usuariosToDelete.map((nome, index) => (
                            <li key={index}>{nome}</li>
                        ))
                    ) : (
                        <li>Nenhum usuário selecionado</li>
                    )}
                </ul>

                <span className="spanModalDelete">Deseja prosseguir?</span>

                <div className="modalActions">
                    <button className="btnYes" onClick={deleteUser}>SIM</button>
                    <button className="btnNo" onClick={handleClose}>NÃO</button>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
}

export default ConfirmModalDelete;