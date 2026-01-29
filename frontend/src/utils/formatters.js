export const formatCNPJ = (value) => {
    if (!value) return "";
    const cnpj = value.replace(/\D/g, '');

    return cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5"
    );
};

export const formatCpf = (cpf) => {
    if(!cpf) return "";
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

}