import { Link } from "react-router-dom";

import Button from '../button/Button';

function Register() {
	return (
		<div id="register">
			<h2>Registreren</h2>
			<form>
			<input type='email' id='registerEmail' name='registerEmail' autoComplete='email'></input> <label htmlFor='registerEmail'>Email</label> <br />
			<input type='password' id='registerPassword' name='registerPassword' autoComplete='new-password'></input> <label htmlFor='registerPassword'>Wachtwoord</label> <br />
			<input type='password' id='registerPasswordRepeat' name='registerPasswordRepeat' autoComplete='new-password'></input> <label htmlFor='registerPasswordRepeat'>Wachtwoord herhalen</label> <br />
			<input type='checkbox' id='registerPrivacy' name='registerPrivacy'></input> <label htmlFor='registerPrivacy'>Ik bevestig dat ik de <Link to='/privacy'>Privacyverklaring</Link> gelezen heb</label> <br />
			<Button label="Registreer" url="/dashboard" position="center" newTab={false}/> {/* TODO: send data to api and login automatically */}
			</form>
		</div>
	)
}

export default Register;