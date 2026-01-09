import { Link } from 'react-router-dom';
import icLogo from '../assets/icLogo.svg';
import icUserBlue from '../assets/icUserBlue.svg';
import icSalePink from '../assets/icSalePink.svg';
import icLogoutPink from '../assets/icLogoutPink.svg';
import '@fontsource/montserrat/400.css'; // Peso Regular
import '@fontsource/montserrat/700.css'; // Peso Bold

function Menu() {

    return (
        <div className='menu'>
            <img src={icLogo} alt="Logo"/>

            <ul className='listMenu'>

                <li className='divMenu'>
                    <img src={icUserBlue} alt="Icon User" />
                    <Link to="/" className='optionsMenuChosed'><p >USUÁRIOS</p></Link>
                </li>
                <li className='divMenu'>
                    <img src={icSalePink} alt="Icon Sale" />
                    <Link to="/" className='optionsMenu'>VENDAS</Link>
                </li>
                <li className='divMenu'>
                    <img src={icLogoutPink} alt="Log out Icon" />
                    <Link to="/" className='optionsMenu'>LOG OUT</Link>
                </li>
            </ul>

        </div>
    )
}

export default Menu;