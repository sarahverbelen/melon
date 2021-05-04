import './Insights.css';

function Insights() {
	return (
		<section id='insights'>
			<h2>Inzichten</h2>
			<ul className='melonList'>
				<li>De meeste <span className='negative'>negatieve</span> berichten komen van Facebook</li>
				<li>De meeste <span className='positive'>positieve</span> berichten komen van Twitter</li>
				<li>De meeste berichten over Covid zijn <span className='negative'>negatief</span></li>
				<li>De meeste berichten over katten zijn <span className='positive'>positief</span></li>
			</ul>
		</section>
	)
}

export default Insights;