import './Header.css';
import logo from '../../img/logo.png';

import Button from '../button/Button';

function Header() {
	return (
		<header className='Header' data-testid='header'>
			<a href='#top'><img src={logo} className="Header-logo" alt="logo" data-testid='logo' /></a>
			<a href='/dashboard' className='dashboardLink' data-testid='dashboardLink'>Dashboard</a>
			<Button label='Installeer de plugin' url='https://google.com' position='right'></Button>
		</header>
	)
}

export default Header;