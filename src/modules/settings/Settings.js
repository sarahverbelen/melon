import { Link } from "react-router-dom";
import { delete_cookie } from 'sfcookies';

import './Settings.css';

import Toggle from '../toggle/Toggle';
import React from "react";

class Settings extends React.Component {
	render() {
		return (
			<div id='settings'>
				<h2 id='greeting'>Welkom, Jane Doe!</h2>
				<h2>Instellingen</h2>
				<Toggle name='useData' checked={true}/>
				<p className='label'>Gebruik mijn data om de applicatie beter te maken</p> <br />
				<Toggle name='colorblind' checked={false}/>
				<p className='label'>Kleurenblindmodus</p> <br />
				<p id='websiteSettingsTitle'>Websites waarop de plugin geactiveerd is:</p> <br />
				<div id='websiteSettings'>
					<Toggle name='facebook' checked={true}/>
					<p className='label'>Facebook</p> <br />
					<Toggle name='reddit' checked={true}/>
					<p className='label'>Reddit</p> <br />
					<Toggle name='twitter' checked={true}/>
					<p className='label'>Twitter</p>
				</div>
				<div id='privacy'>
				<Link to='/privacy'>Privacyverklaring</Link> <br /><br />
				<Link to='/deleteAccount'>Account en data verwijderen</Link>
				</div>
				<a href='/' onClick={this.handleLogout}  className='link'>Uitloggen</a>
			</div>
		);
	}

	handleLogout(e) {
		e.preventDefault();
		delete_cookie('loggedIn');
		delete_cookie('auth_token');
		window.location = '/'
	}
}

export default Settings;