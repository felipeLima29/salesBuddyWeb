import api from "../services/api";

export const useUser = () => {

    const create = async (usuario, nome, email, empresa, cnpj) => {
        try {
            const response = await api.post('/insertUser',
                {usuario, nome, email, empresa, cnpj}
            );
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Erro ao criar usuário.";
            throw new Error(message);
        }
    }

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
            const message = error.response?.data?.message || "Erro ao deletar usuário(s).";
            throw new Error(message);
        }
    }

    const edit = async (id, data) => {
        try {
            const response = await api.put(`/updateUser/${id}`, data);
            return response.data.message;
        } catch (error) {
            const message = error.response?.data?.message || "Erro ao atualizar usuário.";
            throw new Error(message);
        }
    }

    const findUserId = async (id) => {
        try {
            console.log(id)
            const response = await api.get(`/getUserId/${id}`);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Erro ao buscar usuário.";
            throw new Error(message);
        }
    }

    const forgotPassword = async (usuario) => {
        try {
            const response = await api.put('/forgotPassword',
                { usuario }
            );
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Erro ao atualizar senha.";
            throw new Error(message);
        }
    }

    const resetPassword = async (usuario, actualPassword, newPassword) => {
        try {
            const response = await api.put('/changePassword',
                {usuario, actualPassword, newPassword}
            )
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Erro ao atualizar senha.";
            throw new Error(message);
        }
    }
    return { create, list, deletes, edit, findUserId, forgotPassword, resetPassword };

}