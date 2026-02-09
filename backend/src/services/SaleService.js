import { Sale, SaleItem } from "../models/association.js";
import AppError from "../utils/appError.js";

class SaleService {
    async createSale(dto) {
        if (!dto) {
            throw new AppError('Informações não fornecidas.', 400);
        }
        if (dto.cpf.length != 11) {
            throw new AppError('CPF inválido.', 400);
        }
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
            throw new AppError("ID não fornecido.", 400);
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
            throw new AppError("Venda com esse ID não encontrada.", 404);
        }
        return saleComplete;
    }
}

export default new SaleService();