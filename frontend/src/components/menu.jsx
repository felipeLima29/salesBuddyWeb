import { NavLink } from 'react-router-dom';
import icLogo from '../assets/icLogo.svg';
import icUserBlue from '../assets/icUserBlue.svg';
import icUserPink from '../assets/icUserPink.svg';
import icSaleBlue from '../assets/icSaleBlue.svg';
import icSalePink from '../assets/icSalePink.svg';
import icLogoutPink from '../assets/icLogoutPink.svg';

function Menu() {

    return (
        <div className='menu'>
            
            <ul className='listMenu'>

                <img src={icLogo} alt="Logo" className='logoMenu'/>
                <li>
                    <NavLink to="/usersList" className='divMenu'>

                        {({isActive}) => (
                            <>
                                <img src={isActive ? icUserBlue : icUserPink} alt="Usuários" className='imgMenu' />
                                <p className={isActive ? 'optionsMenuChosed' : 'optionsMenu'}>USUÁRIOS</p>
                            </>
                        )}
                            
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/salesList" className='divMenu'>
                        {({isActive}) => (
                            <>
                                <img src={isActive ? icSaleBlue : icSalePink} alt="Vendas" className='imgMenu' />
                                <p className={isActive ? 'optionsMenuChosed' : 'optionsMenu'}>VENDAS</p>
                            </>
                        )}
                    </NavLink>
                </li>
                <li className='divMenu'>
                    <img src={icLogoutPink} alt="Log out Icon" className='imgMenu' />
                    <NavLink to="/" className='optionsMenu' onClick={() => {
                        localStorage.setItem('token', null);
                        localStorage.setItem('id', null);
                    }}>LOG OUT</NavLink>
                </li>
            </ul>

        </div>
    )
}

export default Menu;