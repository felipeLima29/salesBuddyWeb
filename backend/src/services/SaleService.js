import Sale from "../models/Sales.js";
import SaleItem from "../models/SalesItems.js";

class SaleService {
    async createSale(dto) {
        const newSale = await Sale.create({
            name: dto.name,
            cpf: dto.cpf,
            email: dto.email,
            description: dto.description,
            qtdItems: dto.qtdItems,
            valueReceived: dto.valueReceived,
            valueSale: dto.valueSale,
            changeDue: dto.changeDue
        });

        if (dto.description && dto.description.length > 0) {
            const itemsArray = dto.description.split('#');
            await Promise.all(itemsArray.map(async (itemName) => {
                await SaleItem.create({
                    productName: itemName.trim(),
                    saleId: newSale.id
                })
            }))
        }
        return newSale;
    }

    async listAllSales() {
        const listSales = Sale.findAll();
        return listSales;
    }

    async getSaleId(dto) {
        if (!dto.id) {
            throw new Error("ID não fornecido.");
        }

        const saleComplete = await Sale.findOne({
            where: { id: dto.id },
            include: [{
                model: SaleItem,
                attributes: ['productName']
            }],
            logging: console.log
        });
        if (!saleComplete) {
            throw new Error("Venda com esse ID não encontrada.");
        }
        return saleComplete;
    }
}

export default new SaleService();