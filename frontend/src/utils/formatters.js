export const formatCNPJ = (value) => {
    if (!value) return "";

    // 1. Remove tudo que não é número (limpeza)
    const cnpj = value.replace(/\D/g, '');

    // 2. Aplica a máscara (Regex mágica)
    // Ex: 12345678000199 -> 12.345.678/0001-99
    return cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5"
    );
};