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
			repeatPasswordError: false,
			privacyError: false,
			emailError: false,
			passwordError: false,
			error: false,
			existingError: false,
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
				{ this.state.emailError ? <span className='error'>Gelieve een geldig emailadres in te vullen.</span> : null }
				<input type='password' id='registerPassword' name='password' autoComplete='new-password' value={this.state.password} onChange={this.handleInputChange}></input> <label htmlFor='registerPassword'>Wachtwoord</label> <br />
				{ this.state.passwordError ? <span className='error'>Gelieve een wachtwoord in te vullen dat tenminste 8 tekens lang is.</span> : null }
				<input type='password' id='registerPasswordRepeat' name='passwordRepeat' autoComplete='new-password' value={this.state.passwordRepeat} onChange={this.handleInputChange}></input> <label htmlFor='registerPasswordRepeat'>Wachtwoord herhalen</label> <br />
				{ this.state.repeatPasswordError ? <span className='error'>Gelieve twee keer hetzelfde wachtwoord in te vullen</span> : null }
				<input type='checkbox' id='registerPrivacy' name='privacy' value={this.state.privacy} onChange={this.handleInputChange}></input> <label htmlFor='registerPrivacy'>Ik bevestig dat ik de <Link to='/privacy'>Privacyverklaring</Link> gelezen heb</label> <br />
				{ this.state.privacyError ? <span className='error'>Je moet de privacyverklaring accepteren om een account te kunnen maken.</span> : null }
				{ this.state.error ? <span className='error'>Er is iets misgegaan bij de registratie, probeer alsjeblieft opnieuw.</span> : null }
				{ this.state.existingError ? <span className='error'>Dit emailadres is al in gebruik.</span> : null }
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
		this.setState({error: false});
		this.setState({existingError: false});

		if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)){ // check if email is valid
			this.setState({emailError: false});
			if(this.state.password !== '' && this.state.password.length >= 8) { // check if password is valid
				this.setState({passwordError: false});
				if(this.state.password === this.state.passwordRepeat) { // check if the same password was entered twice
					this.setState({repeatPasswordError: false});
					if(this.state.privacy) { // check if the privacy checkbox is checked
						this.setState({privacyError: false});
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
							window.location = '/download'
						}).catch(function(err) {
							console.log(err);
							if(err.response?.status === 409) {
								this.setState({existingError: true});
							} else {
								this.setState({error: true});
							}
						}.bind(this));
					} else {
						this.setState({privacyError: true});
					}
				} else {
					this.setState({repeatPasswordError: true});
				}
			} else {
				this.setState({passwordError: true});
			}
		} else {
			this.setState({emailError: true});
		}
	}
}

export default Register;