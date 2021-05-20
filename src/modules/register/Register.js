import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { bake_cookie } from 'sfcookies';

import environment from '../../environments.json';
import Button from '../button/Button';

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			passwordRepeat: '',
			privacy: false,
		}

		this.handleRegister = this.handleRegister.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	render() {
		return (
			<div id="register">
				<h2>Registreren</h2>
				<form>
				<input type='email' id='registerEmail' name='email' autoComplete='email' value={this.state.email} onChange={this.handleInputChange}></input> <label htmlFor='registerEmail'>Email</label> <br />
				<input type='password' id='registerPassword' name='password' autoComplete='new-password' value={this.state.password} onChange={this.handleInputChange}></input> <label htmlFor='registerPassword'>Wachtwoord</label> <br />
				<input type='password' id='registerPasswordRepeat' name='passwordRepeat' autoComplete='new-password' value={this.state.passwordRepeat} onChange={this.handleInputChange}></input> <label htmlFor='registerPasswordRepeat'>Wachtwoord herhalen</label> <br />
				<input type='checkbox' id='registerPrivacy' name='privacy' value={this.state.privacy} onChange={this.handleInputChange}></input> <label htmlFor='registerPrivacy'>Ik bevestig dat ik de <Link to='/privacy'>Privacyverklaring</Link> gelezen heb</label> <br />
				<Button label="Registreer" position="center" newTab={false} onClick={this.handleRegister}/> 
				</form>
			</div>
		);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value
		});
	}

	handleRegister(e) {
		console.log('register');
		e.preventDefault();
		console.log(this.state.email, this.state.password);

		if(this.state.password === this.state.passwordRepeat) { // check if the same password was entered twice
			if(this.state.privacy) { // check if the privacy checkbox is checked
				let formData = new FormData();
				formData.append('email', this.state.email)
				formData.append('password', this.state.password)
	
				axios({
					method: 'post',
					url: environment['api-url'] + '/register',
					data: formData,
					headers: { "Content-Type": "multipart/form-data" },
				}).then(function (res) {
					console.log(res);
					bake_cookie('loggedIn', true);
					bake_cookie('auth_token', res.data);
					window.location = '/dashboard'
				}).catch(function(err) {
					// TODO: error handling, showing the user what's wrong
					console.log(err)
				});
			} else {
				// TODO: show user error message
			}
		} else {
			// TODO: show user error message
		}
	}
}

export default Register;