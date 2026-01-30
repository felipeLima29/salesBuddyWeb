class ReprocessDTO {
    constructor(body) {
        this.id = body.id;
        this.nameUser = body.nameUser;
        this.value = body.value;
        this.isReprocessed = body.isReprocessed;
    }

    static format(reprocess) {
        return {
            id: reprocess.id,
            nameUser: reprocess.nameUser,
            value: reprocess.value,
            isReprocessed: reprocess.isReprocessed
        }
    }
}

export default ReprocessDTO;