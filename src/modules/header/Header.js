import './Header.css';
import logo from '../../img/logo.png';

import Button from '../button/Button';

function Header() {
	return (
		<header class='Header'>
			<img src={logo} className="Header-logo" alt="logo" />
			<Button label='Installeer de plugin' url='https://google.com' position='right'></Button>
		</header>
	)
}

export default Header;