import { where } from "sequelize";
import Reprocess from "../models/Reprocessing.js";

class ReprocessService {
    async createReprocess(dto) {
        const newReprocess = await Reprocess.create({
            nameUser: dto.nameUser,
            value: dto.value,
            isReprocessed: false
        })

        return newReprocess;
    }

    async listAllReprocess() {
        const listAllReprocess = await Reprocess.findAll();
        return listAllReprocess;
    }

    async reprocessItem(dto){

        const verifyId = await Reprocess.findOne({
            where: {id: dto.id}
        });
        console.log(dto)

        if(!verifyId) throw new AppError("Reprocessamento não encontrado.", 404);
        const { id, isReprocessed } = dto;
        console.log(id, isReprocessed);

        return await Reprocess.update( 
            {isReprocessed: isReprocessed},
            {where: { id: id }} 
        );
    }

}

export default new ReprocessService();