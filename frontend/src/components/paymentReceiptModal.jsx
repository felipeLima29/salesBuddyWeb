import { useEffect } from "react";
import ReactDOM from 'react-dom';

function PaymentReceiptModal({ isOpen, handleClose }) {

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

    if (!isOpen) return null;

    const modalReceipt = (
        <div className="backgroundModalReceipt">
            <div className="receiptModaldiv">
                <div className="receiptModalDetails">
                    <label htmlFor="NOME">Nome</label> <br />
                    <span>José Maria das Neves</span>
                    <label htmlFor="CPF">CPF</label> <br />
                    <span>000.000.000-00</span>
                    <label htmlFor="EMAIL">E-mail</label> <br />
                    <span>josemariasdasneves@gmail.com</span>
                </div>
                <hr />

                <div className="receiptModalDescription">
                    <label htmlFor="ITM">Itm</label>
                    <label htmlFor="DESCRICAO">Descrição</label>
                </div>
                <hr />
                <div className="receiptModalButtons">
                    <button>SALVAR</button>
                    <button>IMPRIMIR</button>
                    <button onClick={handleClose}>FECHAR</button>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalReceipt, document.body);
}

export default PaymentReceiptModal;