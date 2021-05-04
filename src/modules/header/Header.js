import { Link } from "react-router-dom";

import './Header.css';

import logo from '../../img/logo.png';
import profile from '../../img/profile.svg';

import Button from '../button/Button';

function Header(props) {
	const dashboard = props.dashboard;
	if(dashboard) { // return the dashboard header
		return (
			<header className='Header' data-testid='header'>
				<Link to='/'><img src={logo} className="Header-logo" alt="logo" data-testid='logo' /></Link>
				<img src={profile} alt='profile' id='profile'/>
				<a href='#help' className='dashboardLink' data-testid='dashboardLink'>Hulp nodig?</a>
				<a href='#insights' className='dashboardLink' data-testid='dashboardLink'>Inzichten</a>
				<a href='#graphs' className='dashboardLink' data-testid='dashboardLink'>Grafieken</a>
			</header>
		)
	} else { // return the homepage header
		return (
			<header className='Header' data-testid='header'>
				<a href='#top'><img src={logo} className="Header-logo" alt="logo" data-testid='logo' /></a>
				<Link to='/dashboard' className='dashboardLink' data-testid='dashboardLink'>Dashboard</Link>
				<Button label='Installeer de plugin' url='https://google.com' position='right'></Button>
			</header>
		)
	}
}

export default Header;