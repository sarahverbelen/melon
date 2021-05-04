import './Landing.css';

import illustration1 from '../../img/landing-illustration-1.png';
import illustration2 from '../../img/landing-illustration-2.png';
import illustration3 from '../../img/landing-illustration-3.png';
import arrow from '../../img/arrow.svg';

function Landing() {
	return (
		<section className="Landing" data-testid='landing'>
			<div className='innerLanding'>
			<div className='landingStep'>
			<img src={illustration1} alt='' data-testid='landingImage1' />
			<p>Soms kan sociale media je slecht of ongelukkig doen voelen...</p>
			</div>
			<img src={arrow} className='arrow' alt=''/>
			<div className='landingStep'>
			<img src={illustration2} alt='' data-testid='landingImage2' />
			<p>Leer aan de hand van grafieken waar de positieve en negatieve effecten van jouw sociale media liggen.</p>
			</div>
			<img src={arrow} className='arrow' alt=''/>
			<div className='landingStep'>
			<img src={illustration3} alt='' data-testid='landingImage3' />
			<p>Zo kan je je focussen op de positieve effecten en je gelukkiger voelen!</p>
			</div>
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