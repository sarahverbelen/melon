import './Download.css';
import zip from "../../plugin/Melon-plugin-clean.zip";

function Download() {
    return ( 
	<section id='download' >
		<h2>Installeer de plugin</h2>
		<ol>
			<li>1. Download de plugin: 
				<div className='Button' id='downloadButton' data-testid='button'>
					<a href={zip} download>
						Download de plugin
					</a>
				</div>
			</li>
			<li>2. Pak de zip uit en plaats de map 'Melon-plugin-clean' op een plaats die je zal onthouden</li>
			<li>3. Ga naar de Chrome Extension Management pagina in je browser door naar 'chrome://extensions/' te navigeren</li>
			<li>4. Activeer de ontwikkelaarmodus rechtsboven</li>
			<li>5. Klik linksboven op 'uitgepakte extensie laden' en selecteer de 'Melon-plugin-clean' map.</li>
			<li>6. Nu kan je de extensie in je browser bar zien door rechtsboven op het puzzelstukje te klikken. Eventueel kan je het ook vastpinnen zodat je er makkelijker aan kan.</li>
			<li>7. Log in op de extensie met het account dat je hier gemaakt hebt. Nog geen account? <a href='/login'>Registreer nu</a>!</li>
			<li>8. Bekijk je grafieken op je <a href='/dashboard'>dashboard</a>!</li>
		</ol>
    </section>
    )
}

export default Download;