import SaleDTO from "../dtos/SaleDTO.js";
import { sendReceiptEmail } from "../services/EmailProvider.js";
import SaleService from "../services/SaleService.js";
import AppError from "../utils/appError.js";
import isNull from "../utils/verifyIsNull.js";

export async function insertSale(req, res) {
    try {
        const saleDto = new SaleDTO(req.body);
        if (isNull(saleDto.name) ||
            isNull(saleDto.cpf) ||
            isNull(saleDto.email) ||
            saleDto.description == null ||
            saleDto.qtdItems == null ||
            saleDto.valueReceived == null ||
            saleDto.valueSale == null ||
            saleDto.changeDue == null) {
            return res.status(400).json({
                error: true,
                message: "Todos os campos são obrigatórios."
            });
        }
        await SaleService.createSale(saleDto);

        return res.status(201).json({ message: "Venda inserida com sucesso." })
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                error: true,
                message: error.message
            })
        }

        return res.status(500).json({
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
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                error: true,
                message: error.message
            })
        }

        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

export async function sendReceipt(req, res) {
    try {
        const file = req.file;
        const email = req.query.email;
        if (file == null || isNull(email)) {
            return res.status(400).json({
                error: true,
                message: "Arquivo e email do cliente são obrigatórios."
            });
        }
        // Sem await pro usuário não ter que esperar o email ser enviado.
        sendReceiptEmail(file, email);
        return res.status(200).json({ message: "Email enviado com sucesso." });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

export async function listSale(req, res) {
    try {
        const saleDto = new SaleDTO(req.params);
        if (isNull(req.params.id)) {
            return res.status(400).json({
                error: true,
                message: "ID da venda é obrigatório."
            });
        }

        const getSale = await SaleService.getSaleId(saleDto);
        return res.status(200).json(getSale);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                error: true,
                message: error.message
            })
        }

        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}