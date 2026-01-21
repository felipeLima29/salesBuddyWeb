import { Link } from "react-router-dom";
import icReceipt from "../assets/icReceipt.svg";
import { useEffect, useState } from "react";
import PaymentReceiptModal from "../components/paymentReceiptModal";
import axios from "axios";
function SalesList() {

    const [receiptIsOpen, setReceiptIsOpen] = useState(false);
    const [sales, setSales] = useState([]);
    const [selectedSale, setSelectedSale] = useState(null);

    const handleOpen = () => {
        setReceiptIsOpen(true);
    }
    const handleClose = () => {
        setReceiptIsOpen(false);
    }

    const handleSelectReceipt = (sale) => {
        setSelectedSale(sale);
        handleOpen();
    };

    const listSales = async () => {
        try {
            const response = await axios.get('http://localhost:3000/listAllSales');
            setSales(response.data);
        } catch (error) {
            error.message;
        }
    }

    useEffect(() => {
        listSales();
    }, []);

    return (
        <div className="body">
            <div className="containerList">
                <table className="tableSalesList">
                    <tr>
                        <td className="txViewHeader textCenter">ID.VENDA</td>
                        <td className="txViewHeader">NOME</td>
                        <td className="txViewHeader">CPF</td>
                        <td className="txViewHeader">E-MAIL</td>
                        <td className="txViewHeader textCenter">QTD.ITENS</td>
                        <td className="txViewHeader textCenter">VALOR</td>
                        <td className="txViewHeader textCenter">TROCO</td>
                        <td className="txViewHeader textCenter">COMPROVANTE</td>

                    </tr>
                    {sales.map((sale) => (
                        <tr key={sale.idVenda}>
                            <td className="txViewIdName textCenter">{sale.id}</td>
                            <td className="txViewIdName">{sale.name}</td>
                            <td className="txViewUsersSales">{sale.cpf}</td>
                            <td className="txViewUsersSales">{sale.email}</td>
                            <td className="txViewUsersSales textCenter">{sale.qtdItems}</td>
                            <td className="txViewUsersSales textCenter">{sale.valueSale}</td>
                            <td className="txViewUsersSales textCenter">{sale.changeDue}</td>
                            <td>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: "13px"}}>
                                    <img src={icReceipt} alt="Comprovante" onClick={() => { handleSelectReceipt(sale)}}/>
                                </div>
                            </td>
                        </tr>
                    ))}

                </table>
            </div>

            <PaymentReceiptModal
                isOpen={receiptIsOpen}
                handleClose={handleClose}
                data={selectedSale}
            />
        </div>
    )
}

export default SalesList;