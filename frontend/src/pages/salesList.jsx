import icReceipt from "../assets/icReceipt.svg";
function SalesList() {

    const mockSales = [
        { idVenda: 1001, nome: "Ana Beatriz Silva", cpf: "123.456.789-00", email: "ana.beatriz@gmail.com", qtdItens: 3, valor: 150.90, troco: 0.00 },
        { idVenda: 1002, nome: "Carlos Mendes", cpf: "234.567.890-11", email: "carlos.m@hotmail.com", qtdItens: 1, valor: 49.90, troco: 50.10 },
        { idVenda: 1003, nome: "Fernanda Oliveira", cpf: "345.678.901-22", email: "fer.oliveira@yahoo.com", qtdItens: 5, valor: 450.00, troco: 50.00 },
        { idVenda: 1004, nome: "Roberto Junior", cpf: "456.789.012-33", email: "beto.jr@outlook.com", qtdItens: 2, valor: 120.50, troco: 9.50 },
        { idVenda: 1005, nome: "Lucas Souza", cpf: "567.890.123-44", email: "lucas.souza@gmail.com", qtdItens: 10, valor: 980.00, troco: 20.00 },
        { idVenda: 1006, nome: "Mariana Costa", cpf: "678.901.234-55", email: "mari.costa@uol.com.br", qtdItens: 4, valor: 210.00, troco: 0.00 },
        { idVenda: 1007, nome: "Paulo Henrique", cpf: "789.012.345-66", email: "paulo.ph@empresa.com", qtdItens: 1, valor: 15.00, troco: 5.00 },
        { idVenda: 1008, nome: "Júlia Pereira", cpf: "890.123.456-77", email: "ju.pereira@gmail.com", qtdItens: 6, valor: 320.40, troco: 0.00 },
        { idVenda: 1009, nome: "Ricardo Almeida", cpf: "901.234.567-88", email: "ricardo.a@tech.com", qtdItens: 2, valor: 89.90, troco: 10.10 },
        { idVenda: 1010, nome: "Beatriz Lima", cpf: "012.345.678-99", email: "bia.lima@advocacia.com", qtdItens: 3, valor: 250.00, troco: 0.00 },
        { idVenda: 1011, nome: "Bruno Dias", cpf: "111.222.333-00", email: "bruno.dias@transporte.com", qtdItens: 12, valor: 1200.00, troco: 100.00 },
        { idVenda: 1012, nome: "Camila Rocha", cpf: "222.333.444-11", email: "camila.r@design.com", qtdItens: 1, valor: 65.00, troco: 35.00 },
        { idVenda: 1013, nome: "Diego Ferreira", cpf: "333.444.555-22", email: "diego.f@imports.com", qtdItens: 2, valor: 180.00, troco: 20.00 },
        { idVenda: 1014, nome: "Eliana Martins", cpf: "444.555.666-33", email: "eliana.m@eventos.com", qtdItens: 8, valor: 600.50, troco: 0.00 },
        { idVenda: 1015, nome: "Gabriel Santos", cpf: "555.666.777-44", email: "gabriel.s@autopecas.com", qtdItens: 1, valor: 45.00, troco: 5.00 },
        { idVenda: 1016, nome: "Heloísa Nunes", cpf: "666.777.888-55", email: "helo.nunes@cosmeticos.com", qtdItens: 3, valor: 125.90, troco: 4.10 },
        { idVenda: 1017, nome: "Igor Teixeira", cpf: "777.888.999-66", email: "igor.t@engenharia.com", qtdItens: 5, valor: 350.00, troco: 0.00 },
        { idVenda: 1018, nome: "Jéssica Barbosa", cpf: "888.999.000-77", email: "jessica.b@modas.com", qtdItens: 2, valor: 99.90, troco: 0.10 },
        { idVenda: 1019, nome: "Kleber Vieira", cpf: "999.000.111-88", email: "kleber.v@seguranca.com", qtdItens: 4, valor: 200.00, troco: 50.00 },
        { idVenda: 1020, nome: "Larissa Gomes", cpf: "101.202.303-99", email: "lari.gomes@doceria.com", qtdItens: 7, valor: 145.50, troco: 4.50 },
        { idVenda: 1021, nome: "Matheus Lopes", cpf: "202.303.404-00", email: "matheus.l@imoveis.com", qtdItens: 1, valor: 5000.00, troco: 0.00 },
        { idVenda: 1022, nome: "Natália Ribeiro", cpf: "303.404.505-11", email: "naty.ribeiro@turismo.com", qtdItens: 3, valor: 299.90, troco: 0.10 },
        { idVenda: 1023, nome: "Otávio Moreira", cpf: "404.505.606-22", email: "otavio.m@seguros.com", qtdItens: 2, valor: 150.00, troco: 50.00 }
    ];

    return (
        <div className="body">
            <div className="containerList">
                <table className="tableUsersList">
                    <tr>
                        <td className="txViewHeader">ID.VENDA</td>
                        <td className="txViewHeader">NOME</td>
                        <td className="txViewHeader">CPF</td>
                        <td className="txViewHeader">E-MAIL</td>
                        <td className="txViewHeader textCenter">QTD.ITENS</td>
                        <td className="txViewHeader textCenter">VALOR</td>
                        <td className="txViewHeader textCenter">TROCO</td>
                        <td className="txViewHeader textCenter">COMPROVANTE</td>

                    </tr>
                    {mockSales.map((sale) => (
                        <tr key={sale.idVenda}>
                            <td className="txViewIdName">{sale.idVenda}</td>
                            <td className="txViewIdName">{sale.nome}</td>
                            <td className="txViewUsersSales">{sale.cpf}</td>
                            <td className="txViewUsersSales">{sale.email}</td>
                            <td className="txViewUsersSales textCenter">{sale.qtdItens}</td>
                            <td className="txViewUsersSales textCenter">{sale.valor}</td>
                            <td className="txViewUsersSales textCenter">{sale.troco}</td>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <td>
                                    <img src={icReceipt} alt="Comprovante"/>
                                </td>
                            </div>

                        </tr>
                    ))}

                </table>
            </div>

        </div>
    )
}

export default SalesList;