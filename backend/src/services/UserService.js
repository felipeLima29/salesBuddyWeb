import User from "../models/User.js";

class UserService {

    async createUser(dto) {
        const verifyUser = await User.findOne({
            where: {usuario: dto.usuario}
        })

        if(verifyUser){
            throw new Error("Usuário já existe.");
        }

        const newUser = User.create(dto);
        return newUser;
    }

    async listAllUsers(){
        const listUsers = await User.findAll();
        return listUsers;
    }

}
export default new UserService();