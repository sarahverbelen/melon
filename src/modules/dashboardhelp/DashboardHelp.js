import './DashboardHelp.css';

import awel from '../../img/awel.png';
import mediawijs from '../../img/mediawijs.png';
import veiliginternetten from '../../img/veiliginternetten.png';
import jac from '../../img/jac.png';
import caw from '../../img/caw.png';
import teleonthaal from '../../img/teleonthaal.png';
import jongerenhulponline from '../../img/jongerenhulponline.png';
import lumi from '../../img/lumi.png';

function DashboardHelp() {
	return (
		<section id='dashboardHelp' data-testid='help'>
			<h2>Hulp nodig?</h2>
					<ul className='melonList'>
						<li><a href='https://lumi.be/' target='_blank' rel="noreferrer"><u>Lumi.be</u>: voor al je vragen over gender en seksuele voorkeur <img src={lumi} alt='lumi'/></a></li>
						<li><a href='https://www.awel.be/' target='_blank' rel="noreferrer"><u>Awel.be</u>: luistert naar alle kinderen en jongeren met een probleem, vraag of verhaal <img src={awel} alt='awel'/></a></li>
						<li><a href='https://www.caw.be/' target='_blank' rel="noreferrer"><u>Caw.be</u>: biedt hulp bij al je welzijnsvragen (volwassenen) <img src={caw} alt='caw'/></a></li>
						<li><a href='https://www.caw.be/jac/' target='_blank' rel="noreferrer"><u>Jac.be</u>: biedt hulp bij al je welzijnsvragen (jongeren) <img src={jac} alt='jac'/></a></li>
						<li><a href='https://mediawijs.be/' target='_blank' rel="noreferrer"><u>Mediawijs.be</u>: over bewust gebruik van digitale media <img src={mediawijs} alt='mediawijs'/></a></li>
						<li><a href='https://veiliginternetten.nl/' target='_blank' rel="noreferrer"><u>Veiliginternetten.nl</u>: veiligheid op het internet <img src={veiliginternetten} alt='veiliginternetten.nl'/></a></li>
						<li><a href='https://jongerenhulponline.nl/' target='_blank' rel="noreferrer"><u>Jongerenhulponline.nl</u>: vind direct anoniem hulp <img src={jongerenhulponline} alt='jongerenhulponline'/></a></li>
						<li><a href='https://www.tele-onthaal.be/' target='_blank' rel="noreferrer"><u>Tele-onthaal.be</u>: praat over wat jou bezighoudt <img src={teleonthaal} alt='teleonthaal'/></a></li>
					</ul>
		</section>
	)
}

export default DashboardHelp;