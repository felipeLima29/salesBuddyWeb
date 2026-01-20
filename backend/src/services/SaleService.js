import Sale from "../models/Sales.js";

class SaleService {
    async createSale(dto) {
        const createSale = Sale.create(dto);
        return createSale;
    }
}

export default new SaleService();