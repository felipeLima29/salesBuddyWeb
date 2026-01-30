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


}

export default new ReprocessService();