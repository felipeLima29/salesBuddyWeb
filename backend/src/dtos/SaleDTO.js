class SaleDTO {
    constructor(body) {
        this.id = body.id;
        this.name = body.name;
        this.cpf = body.cpf;
        this.email = body.email;
        this.description = body.description;
        this.valueReceived = body.valueReceived;
        this.valueSale = body.valueSale;
        this.changeDue = body.changeDue;
    }

    static format(sale) {
        return {
            id: sale.id,
            name: sale.name,
            cpf: sale.cpf,
            email: sale.email,
            description: sale.description,
            valueReceived: sale.valueReceived,
            valueSale: sale.valueSale,
            changeDue: sale.changeDue
        }
    }
}

export default SaleDTO;