import api from "../services/api.js";

export const useSale = () => {

    const list = async () => {
        try {
            const response = await api.get('/listAllSales');
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Erro ao buscar vendas.";
            throw new Error(message);
        }
    }
    return { list };

}