import './Landing.css';

import illustration from '../../img/landing-illustration.png';
import Button from '../button/Button';

function Landing() {
	return (
		<section className="Landing" data-testid='landing'>
			<img src={illustration} alt='' data-testid='landingImage' />
			<div className='innerLanding' data-testid='innerLanding'>
				<p>Ontdek wat sociale media met je doet en haal het meeste uit je digitale leven</p>
				<Button label='Installeer de plugin' url='https://google.com' position='center'></Button>
			</div>
			<div className='navigationButtons' data-testid='navigationButtons'>
				<a href='#about'>Over Melon</a>
				<a href='#why'>Waarom de plugin installeren?</a>
				<a href='#tips'>Gezond omgaan met sociale media</a>
				<a href='#help'>Hulp nodig?</a>
			</div>
		</section>
	)
}

export default Landing;