import React from 'react';
import axios from 'axios';

import './Insights.css';

class Insights extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mostNegative: '',
			mostNeutral: '',
			mostPositive: ''
		}

		this.calculateInsights = this.calculateInsights.bind(this);
	}

	componentDidMount() {
		this.calculateInsights();
	}

	render() {
		return (
			<section id='insights'>
				<h2>Inzichten</h2>
				<ul className='melonList'>
					<li>De meeste <span className='negative'>negatieve</span> berichten komen van {this.state.mostNegative}</li>
					<li>De meeste <span className='positive'>positieve</span> berichten komen van {this.state.mostPositive}</li>
					<li>De meeste <span className='neutral'>neutrale</span> berichten komen van {this.state.mostNeutral}</li>
					<li>De meeste berichten over Covid zijn <span className='negative'>negatief</span></li>
					<li>De meeste berichten over katten zijn <span className='positive'>positief</span></li>
				</ul>
			</section>
		);
	}

	calculateInsights() {
		axios({
			method: 'get',
			url: 'http://127.0.0.1:5000/user/608fb0824832f22bdd3542f1/record/?time=alltime',
		})
		.then(function(response) {
			console.log(response.data);
			let data = response.data.websiteCount;

			// set the state
			this.setState({
				mostNegative: this.calculateHighestWebsite('negative', data),
				mostPositive: this.calculateHighestWebsite('positive', data),
				mostNeutral: this.calculateHighestWebsite('neutral', data)
			})
		}.bind(this))
		.catch(function(response) {
			console.log(response);
		});
	}

	calculateHighestWebsite(sentiment, data) {
		let result = 'Facebook';

		if (data.reddit[sentiment] >= data.facebook[sentiment]) {
			if (data.reddit[sentiment] >= data.twitter[sentiment]) {
				result = 'Reddit';
			} else if (data.twitter[sentiment] >= data.reddit[sentiment]) {
				result = 'Twitter';
			}
		} else if (data.twitter[sentiment] >= data.facebook[sentiment]) {
			result = 'Twitter';
		}

		return result;
	}

}

export default Insights;