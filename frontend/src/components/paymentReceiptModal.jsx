import { useEffect, useMemo, useRef } from "react";
import ReactDOM from 'react-dom';
import html2canvas from "html2canvas";

function PaymentReceiptModal({ isOpen, handleClose, data }) {

    const receiptRef = useRef(null);

    const itemsList = useMemo(() => {
        if (!data || !data.description) return [];
        return data.description.split('# ').filter(Boolean);
    }, [data]);

    const handleSaveReceipt = async () => {
        const element = receiptRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, {
            backgroundColor: "#ffffff",
            scale: 2
        });

        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `comprovante-${data.name || 'venda'}.png`;
        link.click();
    };

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
            <div className="receiptModaldiv" ref={receiptRef}>
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
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {itemsList.map((_, index) => (
                                <span key={index} className="spanReceiptModal">
                                    {index + 1}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="receiptModalItems">
                        <label className="labelReceiptModal" htmlFor="DESCRICAO">Descrição</label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {itemsList.map((name, index) => (
                                <span key={index} className="spanReceiptModal">{name}</span>
                            ))}
                        </div>
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
                <button className="btnReceiptModalBlue" onClick={handleSaveReceipt}>SALVAR</button>
                <button className="btnReceiptModalBlue">IMPRIMIR</button>
                <button className="btnReceiptModalRed" onClick={handleClose}>FECHAR</button>
            </div>

        </div>
    );

    return ReactDOM.createPortal(modalReceipt, document.body);
}

export default PaymentReceiptModal;