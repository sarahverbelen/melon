import React from 'react';
import Button from '../button/Button';
import axios from 'axios';
import { bake_cookie, read_cookie } from 'sfcookies';

import environment from '../../environments.json';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			error: false
		}

		this.handleLogin = this.handleLogin.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		if (read_cookie('loggedIn') === true) {
			window.location = '/dashboard';
		}

	}

	render() {
		return (
			<div id="login">
				<h2>Login</h2>
				<form>
				<input type='email' id='loginEmail' name='email' value={this.state.email} onChange={this.handleInputChange} autoComplete='email'></input> <label htmlFor='loginEmail'>Email</label> <br />
				<input type='password' id='loginPassword' name='password' value={this.state.password} onChange={this.handleInputChange} autoComplete='current-password'></input> <label htmlFor='loginPassword'>Wachtwoord</label> <br />
				{ this.state.error ? <span id='error'>Onjuist emailadres of wachtwoord.</span> : null }
				<Button label="Login" position="center" newTab={false} onClick={this.handleLogin}/> 
				</form>
			</div>
		)
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value
		});
	  }

	handleLogin(e) {
		e.preventDefault();
		let formData = new FormData();
		formData.append('email', this.state.email)
		formData.append('password', this.state.password)

		axios({
			method: 'post',
			url: environment['api-url'] + '/login',
			data: formData,
			headers: { "Content-Type": "multipart/form-data", "Access-Control-Allow-Origin": "*" },
		}).then(function (res) {
			console.log(res);
			bake_cookie('loggedIn', true);
			bake_cookie('auth_token', res.data);
			window.location = '/dashboard'
		}).catch(function(err) {
			// TODO: error handling, showing the user what's wrong
			console.log(err)
			this.setState({error: true})
		});
	}
}

export default Login;