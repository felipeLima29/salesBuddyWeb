class UserDTO {
    constructor(body){
        this.id = body.id;
        this.usuario = body.usuario;
        this.nome = body.nome;
        this.empresa = body.empresa;
        this.cnpj = body.cnpj;
    }

    static format(user){
        return {
            id: user.id,
            usuario: user.usuario,
            nome: user.nome,
            empresa: user.empresa,
            cnpj: user.cnpj
        }
    }
}

export default UserDTO;