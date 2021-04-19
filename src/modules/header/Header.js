import './Header.css';
import logo from '../../img/logo.png';

function Header() {
	return (
		<header class='Header'>
			<img src={logo} className="Header-logo" alt="logo" />
		</header>
	)
}

export default Header;