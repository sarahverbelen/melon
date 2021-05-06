import React from 'react';
import axios from 'axios';

import './Insights.css';

class Insights extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mostNegative: '',
			mostNeutral: '',
			mostPositive: '',
			facebookSentiment: '',
			redditSentiment: '',
			twitterSentiment: '',
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
					<li>De meeste <span className='negatief'>negatieve</span> berichten komen van {this.state.mostNegative}</li>
					<li>De meeste <span className='positief'>positieve</span> berichten komen van {this.state.mostPositive}</li>
					<li>De meeste <span className='neutraal'>neutrale</span> berichten komen van {this.state.mostNeutral}</li>
					<li>De meeste berichten op Facebook zijn <span className={this.state.facebookSentiment}>{this.state.facebookSentiment}</span></li>
					<li>De meeste berichten op Reddit zijn <span className={this.state.redditSentiment}>{this.state.redditSentiment}</span></li>
					<li>De meeste berichten op Twitter zijn <span className={this.state.twitterSentiment}>{this.state.twitterSentiment}</span></li>
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
				mostNeutral: this.calculateHighestWebsite('neutral', data),
				facebookSentiment: this.calculateHighestSentiment('facebook', data),
				twitterSentiment: this.calculateHighestSentiment('twitter', data),
				redditSentiment: this.calculateHighestSentiment('reddit', data),
			})
		}.bind(this))
		.catch(function(response) {
			console.log(response);
		});
	}

	calculateHighestSentiment(website, data) {
		let result = 'neutraal';

		if (data[website].positive >= data[website].neutral) {
			if (data[website].positive >= data[website].negative) {
				result = 'positief';
			} else if (data[website].negative >= data[website].positive) {
				result = 'negatief';
			}
		} else if (data[website].negative >= data[website].neutral) {
			result = 'negatief';
		}

		return result;
	}

	calculateHighestWebsite(sentiment, data) {
		let result = 'Facebook';

		//first, we want to calculate the percentages
		let facebook = this.calculateWebsitePercentages(data, 'facebook');
		let reddit = this.calculateWebsitePercentages(data, 'reddit');
		let twitter = this.calculateWebsitePercentages(data, 'twitter');


		console.log(facebook, reddit, twitter)

		if (reddit[sentiment] >= facebook[sentiment]) {
			if (reddit[sentiment] >= twitter[sentiment]) {
				result = 'Reddit';
			} else if (twitter[sentiment] >= reddit[sentiment]) {
				result = 'Twitter';
			}
		} else if (twitter[sentiment] >= facebook[sentiment]) {
			result = 'Twitter';
		}

		return result;
	}

	calculateWebsitePercentages(data, website) {
		return {
			positive: this.calculatePercent(data[website], 'positive'),
			negative: this.calculatePercent(data[website], 'negative'),
			neutral: this.calculatePercent(data[website], 'neutral'),
		}
	}

	calculatePercent(data, sentiment) {
		let total = data.positive + data.negative + data.neutral;
		let percent = (data[sentiment] / total) * 100;
		return percent;
	}

}

export default Insights;