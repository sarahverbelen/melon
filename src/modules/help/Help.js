import './Help.css';

import email from '../../img/email.svg';
import facebook from '../../img/facebook.svg';
import instagram from '../../img/instagram.svg';
import twitter from '../../img/twitter.svg';
import reddit from '../../img/reddit.svg';

import awel from '../../img/awel.png';
import mediawijs from '../../img/mediawijs.png';
import veiliginternetten from '../../img/veiliginternetten.png';
import jac from '../../img/jac.png';
import caw from '../../img/caw.png';
import teleonthaal from '../../img/teleonthaal.png';
import jongerenhulponline from '../../img/jongerenhulponline.png';
import lumi from '../../img/lumi.png';

function Help() {
	return (
		<section id='help'>
			<h2>Hulp nodig?</h2>
			<div class='innerHelp'>
				<div class='contact'>
					<h3>Contacteer ons</h3>
					<ul class='contactList'>
						<li><img src={email} alt='email'/><a href='mailto:hello@melonproject.be'>hello@melonproject.be</a></li>
						<li><img src={facebook} alt='facebook'/><a href='https://www.facebook.com' target='_blank' rel="noreferrer">melonproject</a></li>
						<li><img src={instagram} alt='email'/><a href='https://www.instagram.com' target='_blank' rel="noreferrer">@melonproject</a></li>
						<li><img src={twitter} alt='email'/><a href='https://www.twitter.com' target='_blank' rel="noreferrer">@melonproject</a></li>
						<li><img src={reddit} alt='email'/><a href='https://www.reddit.com' target='_blank' rel="noreferrer">r/melonproject</a></li>
					</ul>
				</div>

				<div class='resources'>
					<h3>Ook hier kan je terecht:</h3>
					<div class='gallery'>
						<a href='https://www.awel.be/' target='_blank' rel="noreferrer"><img src={awel} alt='awel'/></a>
						<a href='https://mediawijs.be/' target='_blank' rel="noreferrer"><img src={mediawijs} alt='mediawijs'/></a>
						<a href='https://veiliginternetten.nl/' target='_blank' rel="noreferrer"><img src={veiliginternetten} alt='veiliginternetten.nl'/></a>
						<a href='https://www.caw.be/jac/' target='_blank' rel="noreferrer"><img src={jac} alt='jac'/></a>
						<a href='https://www.caw.be/' target='_blank' rel="noreferrer"><img src={caw} alt='caw'/></a>
						<a href='https://www.tele-onthaal.be/' target='_blank' rel="noreferrer"><img src={teleonthaal} alt='teleonthaal'/></a>
						<a href='https://jongerenhulponline.nl/' target='_blank' rel="noreferrer"><img src={jongerenhulponline} alt='jongerenhulponline'/></a>
						<a href='https://lumi.be/' target='_blank' rel="noreferrer"><img src={lumi} alt='lumi'/></a>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Help;