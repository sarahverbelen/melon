import { Link } from "react-router-dom";
import axios from 'axios';
import { delete_cookie, read_cookie } from 'sfcookies';

import './Settings.css';
import environment from '../../environments.json';

// import Toggle from '../toggle/Toggle';
import React from 'react';
class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			'reddit': true,
			'facebook': true,
			'twitter': true
		}

		this.handleChange = this.handleChange.bind(this);
		this.savedata = this.savedata.bind(this);
	}

	// get the settings like they currently are saved
	componentDidMount() {
		axios({
			method: 'get',
			url: environment['api-url'] + '/me',
			headers: {'Authorization': read_cookie('auth_token')},
		})
		.then(function(response) {
			this.setState({
				'reddit': response.data.settings.reddit,
				'facebook': response.data.settings.facebook,
				'twitter': response.data.settings.twitter
			})
		}.bind(this))
		.catch(function(response) {
			console.log(response);
			
		});		
	  };

	handleChange(e) {
		switch(e.target.id) {
			case 'facebook':
				this.setState({facebook: e.target.checked}, () => {
					this.savedata();
				});
				break;
			case 'reddit':
				this.setState({reddit: e.target.checked}, () => {
					this.savedata();
				});
				break;
			case 'twitter':
				this.setState({twitter: e.target.checked}, () => {
					this.savedata();
				});
				break;
			default: break;
		}	

	}

	savedata() {
		let formData = new FormData();
		formData.append('facebook', this.state.facebook);
		formData.append('reddit', this.state.reddit);
		formData.append('twitter', this.state.twitter);

		axios({
			method: 'post',
			url: environment['api-url'] + '/settings',
			headers: {'Authorization': read_cookie('auth_token')},
			data: formData
		})
		.then(function(response) {
			// console.log(response);
		})
		.catch(function(response) {
			console.log(response);
		});
	}

	render(){
		return (
			<div id='settings'>
				<h2 id='greeting'>Welkom!</h2>
				<h2>Instellingen</h2>
				<form  className='settingsForm'>
					{/* <Toggle name='colorblind' checked={false} register={register}/>
					<p className='label'>Kleurenblindmodus</p> <br /> */}
					<p id='websiteSettingsTitle'>Websites waarop de plugin geactiveerd is:</p> <br />
					<div id='websiteSettings'>
						<div className='toggle-switch'>
							<input type="checkbox" className="toggle-switch-checkbox" name='facebook' id='facebook' checked={this.toBoolean(this.state.facebook)} onChange={this.handleChange} />
							<label className="toggle-switch-label" htmlFor='facebook'>
								<span className="toggle-switch-inner" />
								<span className="toggle-switch-switch" />
							</label>
						</div>
						<p className='label'>Facebook</p> <br />
						<div className='toggle-switch'>
							<input type="checkbox" className="toggle-switch-checkbox" name='reddit' id='reddit' checked={this.toBoolean(this.state.reddit)} onChange={this.handleChange} />
							<label className="toggle-switch-label" htmlFor='reddit'>
								<span className="toggle-switch-inner" />
								<span className="toggle-switch-switch" />
							</label>
						</div>
						<p className='label'>Reddit</p> <br />
						<div className='toggle-switch'>
							<input type="checkbox" className="toggle-switch-checkbox" name='twitter' id='twitter' checked={this.toBoolean(this.state.twitter)} onChange={this.handleChange} />
							<label className="toggle-switch-label" htmlFor='twitter'>
								<span className="toggle-switch-inner" />
								<span className="toggle-switch-switch" />
							</label>
						</div>
						<p className='label'>Twitter</p>
					</div>
				</form>
				<div id='privacy'>
				<Link to='/privacy'>Privacyverklaring</Link> <br /><br />
				<a href='/' onClick={this.handleDelete} className='link'>Account en data verwijderen</a>
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

	handleDelete(e) {
		e.preventDefault();

		if(window.confirm("Weet je zeker dat je je account en data wil verwijderen? Dit kan niet ongedaan gemaakt worden.")) {
			axios({
				method: 'get',
				url: environment['api-url'] + '/me/delete',
				headers: {'Authorization': read_cookie('auth_token')},
			})
			.then(function(response) {
				delete_cookie('loggedIn');
				delete_cookie('auth_token');
				window.location = '/'
			})
			.catch(function(response) {
				console.log(response);
			});
		}
	}

	toBoolean(string) {
		if (typeof(string) != typeof('string')) {
			return string;
		} else if (string.toLowerCase() === 'true') {
			return true;
		} else if (string.toLowerCase() === 'false') {
			return false;
		}
	}
}
export default Settings;