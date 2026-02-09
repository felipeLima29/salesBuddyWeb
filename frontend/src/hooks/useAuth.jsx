import api from "../services/api";

export const useAuth = () => {

    const login = async (usuario, password) => {
        setLoading(true);

        try {
            const response = await api.post('/login', {
                usuario,
                password
            });
            const responseData = response.data;
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('id', responseData.user);
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Erro ao fazer login";
            console.log(message)
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }
    return { login, loading };
}