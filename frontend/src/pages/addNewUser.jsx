import icPersonBlue from '../assets/icPersonBlue.svg';
import ButtonEditUser from '../components/buttons/buttonEditUser';
import InputAddUser from '../components/inputs/inputAddUser';

function addNewUser() {

    return (
        <div className="body">
            <div className="container">
                <div className='headerImg'>
                    <img src={icPersonBlue} alt="Pessoa Icon" />
                    <h3>CADASTRAR NOVO USUÁRIO</h3>
                </div>

                <div className='formAddUser'>
                    <div className='divAddUser'>
                        <label htmlFor="USUÁRIOS" className='txViewInfo'>USUÁRIO</label>
                        <InputAddUser />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="NOME" className='txViewInfo'>NOME</label>
                        <InputAddUser />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="EMPRESA" className='txViewInfo'>EMPRESA</label>
                        <InputAddUser />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="CNPJ" className='txViewInfo'>CNPJ</label>
                        <InputAddUser />
                    </div>
                </div>
                <ButtonEditUser />

            </div>


        </div>
    )

}

export default addNewUser;