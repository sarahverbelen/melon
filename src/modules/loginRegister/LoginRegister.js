import Login from '../login/Login';
import Register from '../register/Register';

import './LoginRegister.css';

function LoginRegister() {
	return(
		<div id='loginRegister'>
        <Login />
        <Register />
        </div>
	)
}

export default LoginRegister;