import SaleDTO from "../dtos/SaleDTO.js";
import SaleService from "../services/SaleService.js";

export async function insertSale(req, res) {
    try {
        const saleDto = new SaleDTO(req.body);
        await SaleService.createSale(saleDto);

        return res.status(201).json({ message: "Venda inserida com sucesso."})
    } catch (error) {
        return res.status(409).json({
            error: true,
            message: error.message
        })
    }
}

export async function listAllSales(req, res) {
    try {
        const listSales = await SaleService.listAllSales();
        return res.status(200).json(listSales);
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}