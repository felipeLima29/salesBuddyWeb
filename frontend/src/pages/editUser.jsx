import icEditUser from '../assets/icEditUser.svg';

function EditUser() {


    return (
        <div className="body">
            <div className="container">
                <div className="headerImg">
                    <img src={icEditUser} alt="Editar Usuário" />
                    <h3>EDITAR USUÁRIO</h3>
                </div>
            </div>
        </div>
    )
}
export default EditUser;