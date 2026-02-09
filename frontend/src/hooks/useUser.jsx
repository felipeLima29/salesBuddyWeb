import api from "../services/api";

export const useUser = () => {

    const list = async () => {
        try {
            const response = await api.get('/listAllUser');
console.log(response.data)
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Erro ao buscar usuários";
            throw new Error(message);
        }
    }

    return { list };

}