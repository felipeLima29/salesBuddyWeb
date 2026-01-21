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

                    <div className="receiptModalTop">
                        <div className="receiptModalItemsFields">
                            <label className="labelReceiptModal" htmlFor="NOME">Nome</label> <br />
                            <span className="spanReceiptModal">José Maria das Neves</span>
                        </div>
                        <div className="receiptModalItemsFields">
                            <label className="labelReceiptModal" htmlFor="CPF">CPF</label> <br />
                            <span className="spanReceiptModal">000.000.000-00</span>
                        </div>
                    </div>

                    <label className="labelReceiptModal" htmlFor="EMAIL">E-mail</label> <br />
                    <span className="spanReceiptModal">josemariasdasneves@gmail.com</span>

                </div>
                <hr />

                <div className="receiptModalDescription">
                    <label className="labelReceiptModal" htmlFor="ITM">Itm</label>
                    <label className="labelReceiptModal" htmlFor="DESCRICAO">Descrição</label>
                </div>
                <hr />

                <div className="receiptModalValues">
                    <div className="divValues">
                        <label className="spanReceiptModal" htmlFor="VALUERECEIVED">Valor recebido</label>
                        <span className="valueReceiptModal">R$ 57,00</span>
                    </div>
                    <div className="divValues">
                        <label className="spanReceiptModal" htmlFor="VALUESALE">Valor venda</label>
                        <span className="valueReceiptModal">R$ 56,30</span>
                    </div>
                    <div className="divValues">
                        <label className="spanReceiptModal" htmlFor="CHANGEDUE">Troco devido</label>
                        <span className="valueReceiptModal">R$ 00.70</span>
                    </div>
                    
                </div>
            </div>
            <div className="receiptModalButtons">
                <button className="btnReceiptModalBlue">SALVAR</button>
                <button className="btnReceiptModalBlue">IMPRIMIR</button>
                <button className="btnReceiptModalRed" onClick={handleClose}>FECHAR</button>
            </div>

        </div>
    );

    return ReactDOM.createPortal(modalReceipt, document.body);
}

export default PaymentReceiptModal;