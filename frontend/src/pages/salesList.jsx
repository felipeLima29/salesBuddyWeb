import { data, Link } from "react-router-dom";
import icReceipt from "../assets/icReceipt.svg";
import { useEffect, useState } from "react";
import PaymentReceiptModal from "../components/paymentReceiptModal";
import axios from "axios";
import { formatCpf } from "../utils/formatters";
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
            const response = await axios.get('http://localhost:3000/listAllSales',
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            );
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
                    <thead>
                        <tr>
                            <td className="txViewHeader textCenter">ID.VENDA</td>
                            <td className="txViewHeader textLeft">NOME</td>
                            <td className="txViewHeader textLeft">CPF</td>
                            <td className="txViewHeader textLeft">E-MAIL</td>
                            <td className="txViewHeader textCenter">QTD.ITENS</td>
                            <td className="txViewHeader textCenter colSpacing">VALOR</td>
                            <td className="txViewHeader textCenter colSpacing">TROCO</td>
                            <td className="txViewHeader textCenter">COMPROVANTE</td>

                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale.idVenda}>
                                <td className="txViewIdName textCenter">{sale.id}</td>
                                <td className="txViewIdName textLeft">{sale.name}</td>
                                <td className="txViewUsersSales textLeft">{formatCpf(sale.cpf)}</td>
                                <td className="txViewUsersSales textLeft">{sale.email}</td>
                                <td className="txViewUsersSales textCenter">{"0" + sale.qtdItems}</td>
                                <td className="txViewUsersSales textCenter colSpacing">{"R$ " + sale.valueSale}</td>
                                <td className="txViewUsersSales textCenter colSpacing">{"R$" + sale.changeDue}</td>
                                <td>
                                    <div style={{ display: "flex", justifyContent: "center",
                                        alignItems: "center",
                                        paddingBottom: "13px" }}>
                                        <img src={icReceipt} alt="Comprovante" onClick={() => { handleSelectReceipt(sale) }} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
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