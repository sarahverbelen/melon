import './Reviews.css';

import review1image from '../../img/review-1.png';
import review2image from '../../img/review-2.png';
import review3image from '../../img/review-3.png';

function Reviews() {
	return (
		<section id='reviews' data-testid='reviews'>
			<div className='review'>
				<img src={review1image} alt='Laura' />
				<p className='smallText'>"Melon heeft me geleerd dat veel van mijn stress ontstond door de berichten die ik las. Nu ik dit weet, kan ik die berichten vermijden als ik me gestresseerd voel en dat heeft veel geholpen om me beter in mijn vel te voelen."</p>
				<p className='smallText reviewName'><b>Laura, 15</b></p>
			</div>

			<div className='review'>
				<img src={review2image} alt='Zain' />
				<p className='smallText'>"Mijn vrienden zeiden altijd dat ik Facebook moest installeren, maar ik zag er het voordeel niet van in. Een van hen liet me zijn melon dashboard zien, waarop stond hoeveel goeie berichten hij elke dag zag. Dat heeft me overtuigd om ook mee te doen."</p>
				<p className='smallText reviewName'><b>Zain, 13</b></p>
			</div>

			<div className='review'>
				<img src={review3image} alt='Laura' />
				<p className='smallText'>"Ik wou weten waarom ik me soms zo slecht voelde op sociale media, dus heb ik melon geïnstalleerd. Nu ik weet waarom sociale media me niet altijd gelukkig maakt, kan ik stappen ondernemen om alleen het positieve effect over te houden."</p>
				<p className='smallText reviewName'><b>Sophia, 17</b></p>
			</div>
		</section>
	)
}

export default Reviews;