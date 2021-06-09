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
						<li><a href='https://lumi.be/' target='_blank' rel="noreferrer"><span><u>Lumi.be</u>: voor al je vragen over gender en seksuele voorkeur</span> <img src={lumi} alt='lumi'/></a></li>
						<li><a href='https://www.awel.be/' target='_blank' rel="noreferrer"><span><u>Awel.be</u>: luistert naar alle kinderen en jongeren met een probleem of vraag</span> <img src={awel} alt='awel'/></a></li>
						<li><a href='https://www.caw.be/' target='_blank' rel="noreferrer"><span><u>Caw.be</u>: biedt hulp bij al je welzijnsvragen (volwassenen)</span> <img src={caw} alt='caw'/></a></li>
						<li><a href='https://www.caw.be/jac/' target='_blank' rel="noreferrer"><span><u>Jac.be</u>: biedt hulp bij al je welzijnsvragen (jongeren)</span> <img src={jac} alt='jac'/></a></li>
						<li><a href='https://mediawijs.be/' target='_blank' rel="noreferrer"><span><u>Mediawijs.be</u>: over bewust gebruik van digitale media</span> <img src={mediawijs} alt='mediawijs'/></a></li>
						<li><a href='https://veiliginternetten.nl/' target='_blank' rel="noreferrer"><span><u>Veiliginternetten.nl</u>: veiligheid op het internet</span> <img src={veiliginternetten} alt='veiliginternetten.nl'/></a></li>
						<li><a href='https://jongerenhulponline.nl/' target='_blank' rel="noreferrer"><span><u>Jongerenhulponline.nl</u>: vind direct anoniem hulp</span> <img src={jongerenhulponline} alt='jongerenhulponline'/></a></li>
						<li><a href='https://www.tele-onthaal.be/' target='_blank' rel="noreferrer"><span><u>Tele-onthaal.be</u>: praat over wat jou bezighoudt</span> <img src={teleonthaal} alt='teleonthaal'/></a></li>
					</ul>
					<br/>
		</section>
	)
}

export default DashboardHelp;