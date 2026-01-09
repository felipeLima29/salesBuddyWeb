import Menu from "../components/menu";
import icEditUser from '../assets/icEditUser.svg';
function UserList() {

    const mockUsers = [
        {
            id: 1,
            usuario: "ana.silva",
            nome: "Ana Beatriz Silva",
            empresa: "Tech Solutions Ltda",
            cnpj: "12.345.678/0001-90"
        },
        {
            id: 2,
            usuario: "carlos.m",
            nome: "Carlos Mendes",
            empresa: "Mendes Construções",
            cnpj: "98.765.432/0001-15"
        },
        {
            id: 3,
            usuario: "f.oliveira",
            nome: "Fernanda Oliveira",
            empresa: "Oliveira Alimentos",
            cnpj: "45.123.789/0001-22"
        },
        {
            id: 4,
            usuario: "roberto.j",
            nome: "Roberto Junior",
            empresa: "RJ Logística",
            cnpj: "33.444.555/0001-67"
        },
        {
            id: 5,
            usuario: "lucas.souza",
            nome: "Lucas Souza",
            empresa: "Souza & Filhos",
            cnpj: "11.222.333/0001-88"
        },
        {
            id: 6,
            usuario: "mariana.c",
            nome: "Mariana Costa",
            empresa: "Costa Marketing",
            cnpj: "77.888.999/0001-00"
        },
        {
            id: 7,
            usuario: "paulo.h",
            nome: "Paulo Henrique",
            empresa: "PH Consultoria",
            cnpj: "55.666.777/0001-34"
        },
        {
            id: 8,
            usuario: "julia.p",
            nome: "Júlia Pereira",
            empresa: "Pereira Design",
            cnpj: "99.000.111/0001-55"
        },
        {
            id: 9,
            usuario: "ricardo.a",
            nome: "Ricardo Almeida",
            empresa: "Almeida Tech",
            cnpj: "22.333.444/0001-11"
        },
        {
            id: 10,
            usuario: "beatriz.l",
            nome: "Beatriz Lima",
            empresa: "Lima Advocacia",
            cnpj: "66.777.888/0001-99"
        }
    ];

    return (
        <div className="body">

            <Menu />
            <div className="containerUsersList">
                <h1>Lista de Usuários</h1>
                <table className="tableUsersList">
                    <tr>
                        <td>USUÁRIO</td>
                        <td>NOME</td>
                        <td>EMPRESA</td>
                        <td>CNPJ</td>
                    </tr>
                    {mockUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.usuario}</td>
                            <td>{user.nome}</td>
                            <td>{user.empresa}</td>
                            <td>{user.cnpj}</td>
                            <img src={icEditUser} alt="" />
                        </tr>
                    ))}

                </table>
            </div>

        </div>
    )
}

export default UserList;