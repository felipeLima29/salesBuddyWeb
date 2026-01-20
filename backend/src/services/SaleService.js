import Sale from "../models/Sales.js";

class SaleService {
    async createSale(dto) {
        const createSale = Sale.create(dto);
        return createSale;
    }

    async listAllSales(){
        const listSales = Sale.findAll();
        return listSales;
    }
}

export default new SaleService();