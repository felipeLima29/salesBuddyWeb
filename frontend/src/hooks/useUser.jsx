import api from "../services/api";

export const useUser = () => {

    const list = async () => {
        try {
            const response = await api.get('/listAllUser');
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Erro ao buscar usuários.";
            throw new Error(message);
        }
    }

    const deletes = async (ids) => {
        try {
            const response = await api.delete('/deleteUsers',
                { data: { ids: ids } });
                return response.data.message;
        } catch (error) {
            const message = error.response?.data?.messafe || "Erro ao deletar usuário(s)";
            throw new Error(message);
        }
    }

    return { list, deletes };

}