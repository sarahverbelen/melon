import Button from '../button/Button';

import './Login.css';

function Login() {
	return (
		<div id="login">
			<h2>Login</h2>
			<form>
			<input type='email' id='loginEmail' name='loginEmail'></input> <label for='loginEmail'>Email</label> <br />
			<input type='password' id='loginPassword' name='loginPassword'></input> <label for='loginPassword'>Wachtwoord</label> <br />
			<Button label="Login" url="/dashboard" position="center" newTab={false}/> {/* TODO: login */}
			</form>
		</div>
	)
}

export default Login;