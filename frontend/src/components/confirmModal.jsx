import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function ConfirmModalDelete({ isOpen, usuariosToDelete, handleClose }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // EFEITO COLATERAL PARA BORRAR O SITE
    useEffect(() => {
        if (isOpen) {
            // Pega a div onde seu React está rodando (geralmente id="root" ou id="__next")
            const appRoot = document.getElementById('root') || document.getElementById('__next');
            if (appRoot) {
                appRoot.style.filter = 'blur(5px)';
                appRoot.style.pointerEvents = 'none';
            }
        } else {
            // Remove o blur quando fecha
            const appRoot = document.getElementById('root') || document.getElementById('__next');
            if (appRoot) {
                appRoot.style.filter = 'none';
                appRoot.style.pointerEvents = 'auto';
            }
        }

        // Limpeza ao desmontar
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
        // ATENÇÃO: Tire o backdrop-filter daqui, senão soma blur com blur
        <div className="backgroundModalDelete" style={{ backdropFilter: 'none', webkitBackdropFilter: 'none' }}>
            <div className="modalContent" style={{ pointerEvents: 'auto' }}>
                <span className="spanModalDelete">Você está prestes a excluir os seguintes usuários:</span>
                <p className='modalDeleteUsers'>{usuariosToDelete} felipe <br></br> ola</p>
                <span className="spanModalDelete">Deseja prosseguir?</span>
                
                <div className="modalActions">
                    <button className="btnYes">SIM</button>
                    <button className="btnNo" onClick={handleClose}>NÃO</button>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
}

export default ConfirmModalDelete;