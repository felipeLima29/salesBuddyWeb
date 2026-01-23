class UserDTO {
    constructor(body){
        this.id = body.id;
        this.usuario = body.usuario;
        this.nome = body.nome;
        this.email = body.email;
        this.empresa = body.empresa;
        this.cnpj = body.cnpj;
        this.password = body.password;
    }

    static format(user){
        return {
            id: user.id,
            usuario: user.usuario,
            nome: user.nome,
            email: user.email,
            empresa: user.empresa,
            cnpj: user.cnpj,
            password: user.password
        }
    }
}

export default UserDTO;