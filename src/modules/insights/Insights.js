import React from 'react';
import axios from 'axios';
import { read_cookie } from 'sfcookies';
import environment from '../../environments.json';

import './Insights.css';

class Insights extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mostNegative: '',
			mostPositive: '',
			facebookSentiment: '',
			redditSentiment: '',
			twitterSentiment: '',
			mostUsedWord: '',
			mostNegativeWord: '',
			mostPositiveWord: ''
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
					<li>De meeste berichten op Facebook zijn <span className={this.state.facebookSentiment}>{this.state.facebookSentiment}</span></li>
					<li>De meeste berichten op Reddit zijn <span className={this.state.redditSentiment}>{this.state.redditSentiment}</span></li>
					<li>De meeste berichten op Twitter zijn <span className={this.state.twitterSentiment}>{this.state.twitterSentiment}</span></li>
					<li>Het meest voorkomende sleutelwoord is "{this.state.mostUsedWord}"</li>
					<li>Het meest <span className='negatief'>negatieve</span> sleutelwoord is "{this.state.mostNegativeWord}"</li>
					<li>Het meest <span className='positief'>positieve</span> sleutelwoord is "{this.state.mostPositiveWord}"</li>
				</ul>
			</section>
		);
	}

	calculateInsights() {
		axios({
			method: 'get',
			url: environment['api-url'] + '/record/?time=alltime',
			headers: {'Authorization': read_cookie('auth_token')}
		})
		.then(function(response) {
			console.log(response.data);
			let data = response.data.websiteCount;

			let keywordData = response.data.keywordCount;
			let keywordArray = [];

			for (let word in keywordData) {
				if (word !== '') {
					let object = {
						...keywordData[word],
						'word': word
					}
					keywordArray.push(object);
				}
			}

			let mostUsed = keywordArray.reduce(function(prev, current) {
				return (prev.count > current.count) ? prev : current
			});

			let mostNegativeWord = keywordArray.reduce(function(prev, current) {
				if (current.count > 1) {
					return ((prev.negativeCount / prev.count) > (current.negativeCount / current.count)) ? prev : current
				} else {
					return prev;
				}
			});

			let mostPositiveWord = keywordArray.reduce(function(prev, current) {
				if (current.count > 1) {
					return ((prev.positiveCount / prev.count) > (current.positiveCount / current.count)) ? prev : current
				} else {
					return prev;
				}
			});

			// set the state
			this.setState({
				mostNegative: this.calculateHighestWebsite('negative', data),
				mostPositive: this.calculateHighestWebsite('positive', data),
				facebookSentiment: this.calculateHighestSentiment('facebook', data),
				twitterSentiment: this.calculateHighestSentiment('twitter', data),
				redditSentiment: this.calculateHighestSentiment('reddit', data),
				mostUsedWord: mostUsed.word,
				mostNegativeWord: mostNegativeWord.word,
				mostPositiveWord: mostPositiveWord.word
			})
		}.bind(this))
		.catch(function(response) {
			console.log(response);
		});
	}

	calculateHighestSentiment(website, data) {
		let result = '';
		if (data[website].positive >= data[website].negative) {
			result = 'positief';
		} else {
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
		}
	}

	calculatePercent(data, sentiment) {
		let total = data.positive + data.negative;
		let percent = (data[sentiment] / total) * 100;
		return percent;
	}

}

export default Insights;