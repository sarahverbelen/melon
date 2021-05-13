import './Tips.css';

function Tips() {
	return (
		<section id="tips" data-testid='tips'>
			<h2>Gezond omgaan met sociale media</h2>
			<div id='tips-timeline'>
				<div id='line'></div>
				<div className='timeline-tip'>
					<div className='tip-number'>1</div>
					<p className="smallText"><b>Niet alles wat op sociale media staat is écht.</b> <br /> Foto's worden bewerkt, verhalen opgeblazen en je ziet enkel wat iemand wil dat je ziet. Wat je van het leven ziet op sociale media kan je onmogelijk vergelijken met het échte leven; wees je hiervan bewust.</p>
				</div>
				<div className='timeline-tip'>
					<div className='tip-number'>2</div>
					<p className="smallText"><b>Laat je inspireren.</b> <br /> Nee, niet alles wat op sociale media staat is realistisch. Maar het kan een goed begin zijn om je te laten inspireren, bijvoorbeeld over een nieuwe hobby of een nieuwe kledingstijl. Sociale media is enorm gevarieerd: maak daar gebruik van!</p>
				</div>
				<div className='timeline-tip'>
					<div className='tip-number'>3</div>
					<p className="smallText"><b>Staar je niet blind op likes en volgers.</b> <br /> Weinig volgers of likes hebben betekend niet dat je posts slecht zijn. Populariteit op sociale media is vaak het gevolg van geluk. Straf jezelf dus niet af als je bericht het minder goed doet dan je gehoopt had.</p>
				</div>
				<div className='timeline-tip'>
					<div className='tip-number'>4</div>
					<p className="smallText"><b>Wees kritisch.</b> <br /> Sociale media kan een ontzettend goede informatiebron zijn. Er is content van mensen uit alle lagen van de maatschappij. Maar het is belangrijk om kritisch te blijven: liegen op het internet is niet moeilijk.</p>
				</div>
			</div>
		</section>
	)
}

export default Tips;