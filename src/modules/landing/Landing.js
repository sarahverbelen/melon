import './Landing.css';

import illustration from '../../img/landing-illustration.png';
import Button from '../button/Button';

function Landing() {
	return (
		<div class="Landing">
			<img src={illustration} alt=''></img>
			<div class='innerLanding'>
				<p>Ontdek wat sociale media met je doet en haal het meeste uit je digitale leven</p>
				<Button label='Installeer de plugin' url='https://google.com'></Button>
			</div>
		</div>
	)
}

export default Landing;