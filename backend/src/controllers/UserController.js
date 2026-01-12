import UserDTO from "../dtos/UserDTO.js";
import UserService from "../services/UserService.js";

export async function insertUser(req, res) {

    try{
        const userDto = new UserDTO(req.body);
        const newUser = UserService.createUser(userDto);
        return res.status(201).json(UserDTO.format(newUser));
    }catch(error){
        return res.status(400).json({
            error: true,
            message: error.message
        })
    }

}