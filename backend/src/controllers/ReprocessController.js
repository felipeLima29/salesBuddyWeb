import ReprocessDTO from "../dtos/ReprocessDTO.js"
import ReprocessService from "../services/ReprocessService.js";
import isNull from "../utils/verifyIsNull.js";

export async function insertReprocess(req, res) {
    try {
        const reprocessDTO = new ReprocessDTO(req.body);
        if (isNull(reprocessDTO.nameUser) || reprocessDTO.value == null) {
            return res.status(400).json({
                error: true,
                message: "Todos os campos são obrigatórios."
            });
        }

        await ReprocessService.createReprocess(reprocessDTO);
        return res.status(201).json({ message: "Reprocessamento inserido com sucesso." })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

export async function listAllReprocess(req, res) {
    try {
        const listReprocess = await ReprocessService.listAllReprocess();
        return res.status(200).json(listReprocess);
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

export async function reprocessItem(req, res) {
    try {
        const reprocessDto = new ReprocessDTO(req.body)
        await ReprocessService.reprocessItem(reprocessDto);
        return res.status(200).json({message: "Reprocessamento feito!"});
        
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }
}