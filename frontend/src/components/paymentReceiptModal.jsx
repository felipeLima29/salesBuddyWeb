import { useEffect } from "react";
import ReactDOM from 'react-dom';

function PaymentReceiptModal({ isOpen, handleClose, data }) {

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
                            <span className="spanReceiptModal">{data.name}</span>
                        </div>
                        <div className="receiptModalItemsFields">
                            <label className="labelReceiptModal" htmlFor="CPF">CPF</label> <br />
                            <span className="spanReceiptModal">{data.cpf}</span>
                        </div>
                    </div>
                    <label className="labelReceiptModal" htmlFor="EMAIL">E-mail</label> <br />
                    <span className="spanReceiptModal">{data.email}</span>
                </div>
                <hr />
                <div className="receiptModalDescription">
                    <div className="receiptModalItems">
                        <label className="labelReceiptModal" htmlFor="ITM">Itm</label>
                        <span className="spanReceiptModal">{data.qtdItems}</span>
                    </div>
                    <div className="receiptModalItems">
                        <label className="labelReceiptModal" htmlFor="DESCRICAO">Descrição</label>
                        <span className="spanReceiptModal">{data.description}</span>
                    </div>
                </div>
                <hr />

                <div className="receiptModalValues">
                    <div className="divValues">
                        <label className="spanReceiptModal" htmlFor="VALUERECEIVED">Valor recebido</label>
                        <span className="valueReceiptModal">R$ {data.valueReceived}</span>
                    </div>
                    <div className="divValues">
                        <label className="spanReceiptModal" htmlFor="VALUESALE">Valor venda</label>
                        <span className="valueReceiptModal">R$ {data.valueSale}</span>
                    </div>
                    <div className="divValues">
                        <label className="spanReceiptModal" htmlFor="CHANGEDUE">Troco devido</label>
                        <span className="valueReceiptModal">R$ {data.changeDue}</span>
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