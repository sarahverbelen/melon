import Chart from 'chart.js/auto';
import React, { Component } from 'react';
import axios from 'axios';
import { read_cookie, delete_cookie } from 'sfcookies';
import environment from '../../environments.json';

import './Graphs.css'

import facebook from '../../img/facebook.svg';
import twitter from '../../img/twitter.svg';
import reddit from '../../img/reddit.svg';

import arrowLeftRed from '../../img/arrow-left-red.png';
import arrowRightRed from '../../img/arrow-right-red.png';
import arrowRightGrey from '../../img/arrow-right-grey.png';

import loading from '../../img/loadingicon.gif';
class Graphs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: 'day',
			day: (new Date()).getDate() + '/' + ((new Date()).getMonth() + 1),
			month: (new Date()).toLocaleString('default', { month: 'long' }),
			monthNr: (new Date()).getMonth() + 1,
			year: (new Date()).getUTCFullYear(),
			stepsBack: '0',
			weekStepsBack: 0,
			arrowRight: arrowRightGrey,
			arrowWeekRight: arrowRightGrey,
			facebookNegativeKeywords: '',
			facebookPositiveKeywords: '',
			twitterNegativeKeywords: '',
			twitterPositiveKeywords: '',
			redditNegativeKeywords: '',
			redditPositiveKeywords: '',
			facebookError: '',
			twitterError: '',
			redditError: '',
			weekError: '',
			doughnutError: '',
			facebookLoading: <img src={loading} alt='loading' id='facebookLoading' class='loading'/>,
			twitterLoading: <img src={loading} alt='loading' id='twitterLoading' class='loading'/>,
			redditLoading: <img src={loading} alt='loading' id='redditLoading' class='loading'/>,
			weekLoading: <img src={loading} alt='loading' id='weekLoading' class='loading'/>,
			doughnutLoading: <img src={loading} alt='loading' id='doughnutLoading' class='loading'/>,
		}

		this.handleFilter = this.handleFilter.bind(this);
		this.getResults = this.getResults.bind(this);
		this.getWeekResults = this.getWeekResults.bind(this);
		this.mainSkip = this.mainSkip.bind(this);
		this.weekSkip = this.weekSkip.bind(this);
		this.continueFunction = this.continueFunction.bind(this);
		this.continueWeekFunction = this.continueWeekFunction.bind(this);
		this.getwebsiteKeywords = this.getwebsiteKeywords.bind(this);

		this.createDoughnutChart = this.createDoughnutChart.bind(this);
		this.createBartChart = this.createBarChart.bind(this);
		this.createWebsiteChart = this.createWebsiteChart.bind(this);
	}

	// CREATE THE CHARTS
	doughnutChartRef = React.createRef();
	barChartRef = React.createRef();
	facebookChartRef = React.createRef();
	redditChartRef = React.createRef();
	twitterChartRef = React.createRef();

	doughnutChart;
	barChart;
	facebookChart;
	redditChart;
	twitterChart;

	componentDidMount() {
		// CHECK IF USER IS LOGGED IN, otherwise redirect to login page
		if (!(read_cookie('loggedIn') === true)) {
			window.location = '/login';
		}
		// if the user is logged in, get the results
		this.getResults();
		this.getWeekResults();
	}

	getResults() {
		const myDoughnutChartRef = this.doughnutChartRef.current.getContext("2d");
		const myFacebookChartRef = this.facebookChartRef.current.getContext("2d");
		const myRedditChartRef = this.redditChartRef.current.getContext("2d");
		const myTwitterChartRef = this.twitterChartRef.current.getContext("2d");

		this.setState({
			facebookLoading: <img src={loading} alt='loading' id='facebookLoading' class='loading'/>,
			twitterLoading: <img src={loading} alt='loading' id='twitterLoading' class='loading'/>,
			redditLoading: <img src={loading} alt='loading' id='redditLoading' class='loading'/>,
			doughnutLoading: <img src={loading} alt='loading' id='doughnutLoading' class='loading'/>
		});

		// FILTERS
		let queryString = '';

		if (this.state.filter === 'day') {
			let date = this.state.day.split('/');
			queryString = `day=${date[0]}&month=${date[1]}`
		} else if (this.state.filter === 'month') {
			queryString = `month=${this.state.monthNr}&year=${this.state.year}`;
		} else if (this.state.filter === 'year') {
			queryString = `year=${this.state.year}`;
		}

		axios({
			method: 'get',
			url: environment['api-url'] + '/record/?' + queryString,
			headers: {'Authorization': read_cookie('auth_token')}
		})
		.then(function(response) {
			this.createDoughnutChart(response.data, myDoughnutChartRef);
			this.createWebsiteChart(response.data, myFacebookChartRef, 'facebook', this.facebookChart);
			this.createWebsiteChart(response.data, myRedditChartRef, 'reddit', this.redditChart);
			this.createWebsiteChart(response.data, myTwitterChartRef, 'twitter', this.twitterChart);
			this.getwebsiteKeywords(response.data.websiteCount.facebook, 'facebook');
			this.getwebsiteKeywords(response.data.websiteCount.reddit, 'reddit');
			this.getwebsiteKeywords(response.data.websiteCount.twitter, 'twitter');

			this.setState({
				facebookLoading: '',
				twitterLoading: '',
				redditLoading: '',
				doughnutLoading: ''
			});
		}.bind(this))
		.catch(function(response) {
			if(response?.response?.status === 401) { // if the request is unauthorized, this is probably because the credentials have expired
				// so we will log the user out so he can log in again and get valid credentials
				delete_cookie('loggedIn');
				delete_cookie('auth_token');
				window.location = '/login'
			}
			this.setState({
				facebookError: <div className='graphError' id='facebookError'>Er is iets misgegaan bij het ophalen van de data.</div>,
				twitterError: <div className='graphError' id='twitterError'>Er is iets misgegaan bij het ophalen van de data.</div>,
				redditError: <div className='graphError' id='redditError'>Er is iets misgegaan bij het ophalen van de data.</div>,
				doughnutError: <div className='graphError' id='doughnutError'>Er is iets misgegaan bij het ophalen van de data.</div>,
				facebookLoading: '',
				twitterLoading: '',
				redditLoading: '',
				doughnutLoading: ''
			});
		}.bind(this));
	}

	getwebsiteKeywords(data, website) {
			switch(website){
				case 'facebook': 
					if(data.positive === 0 && data.negative === 0) {
						this.setState({
							facebookError: <div className='graphError' id='facebookError'>Er is geen data gevonden voor Facebook in deze tijdspanne.</div>,
						});
						break;
					} else {
						this.setState({
							facebookError: '',
						});
						break;
					}
				case 'twitter': 
					if(data.positive === 0 && data.negative === 0) {
						this.setState({
							twitterError: <div className='graphError' id='twitterError'>Er is geen data gevonden voor Twitter in deze tijdspanne.</div>,
						});
						break;
					} else {
						this.setState({
							twitterError: '',
						});
						break;
					}
				case 'reddit': 
					if(data.positive === 0 && data.negative === 0) {
						this.setState({
							redditError: <div className='graphError' id='redditkError'>Er is geen data gevonden voor Reddit in deze tijdspanne.</div>,
						});
						break;
					} else {
						this.setState({
							redditError: '',
						});
						break;
					}
				default: break;
			}

		let positive, negative;

		let positiveSentence, negativeSentence = ''

		if(data.positive !== 0) {
			positive = this.sortKeywordArray(data.positiveKeywords);
			if (positive.length >= 3) {
				positiveSentence = `${positive[0].word}, ${positive[1].word}, ${positive[2].word}`;
			} else {
				if (positive.length === 2) {
					positiveSentence = `${positive[0].word}, ${positive[1].word}`;
				} else {
					if(positive[0] !== undefined) {
						positiveSentence = `${positive[0].word}`;
					}
				}
			}
		}

		if(data.negative !== 0) {
			negative = this.sortKeywordArray(data.negativeKeywords);
			if (negative.length >= 3) {
				negativeSentence = `${negative[0].word}, ${negative[1].word}, ${negative[2].word}`;
			} else {
				if (negative.length === 2) {
					negativeSentence = `${negative[0].word}, ${negative[1].word}`;
				} else {
					if(negative[0] !== undefined) {
						negativeSentence = `${negative[0].word}`;
					}
				}
			}
		}

		switch(website){
			case 'facebook': 
				this.setState({
					facebookNegativeKeywords: negativeSentence,
					facebookPositiveKeywords: positiveSentence,
				});
				break;
			case 'twitter': 
				this.setState({
					twitterNegativeKeywords: negativeSentence,
					twitterPositiveKeywords: positiveSentence,
				});
				break;
			case 'reddit': 
				this.setState({
					redditNegativeKeywords: negativeSentence,
					redditPositiveKeywords: positiveSentence,
				});
				break;
			default: break;
		}

		// console.log(positive);
	}

	sortKeywordArray(keywords) {
		let result = [];
		for (let word in keywords) {
			if (word !== '') {
				let object = {
					...keywords[word],
					'word': word
				}
				result.push(object);
			}
		}

		result.sort(function(a, b) {
			return b.count - a.count
		});

		return result;
	}

	getWeekResults() {
		const myBarChartRef = this.barChartRef.current.getContext("2d");

		this.setState({
			weekLoading: <img src={loading} alt='loading' id='facebookLoading' class='loading'/>
		});

		axios({
			method: 'get',
			url: environment['api-url'] + `/record/?time=week&pastweek=${this.state.weekStepsBack}`,
			headers: {'Authorization': read_cookie('auth_token')}
		})
		.then(function(response) {
			// console.log(response.data)
			this.createBarChart(response.data, myBarChartRef);
			this.setState({
				weekLoading: ''
			});
		}.bind(this))
		.catch(function(response) {
			console.log(response);
			this.setState({
				weekError: <div className='graphError' id='weekError'>Er is iets misgegaan bij het ophalen van de data.</div>,
				weekLoading: ''
			});
		}.bind(this));
	}

	handleFilter() {
		this.setState({
			filter: document.getElementById("filterSelect").value,
			day: (new Date()).getDate() + '/' + ((new Date()).getMonth() + 1),
			month: (new Date()).toLocaleString('default', { month: 'long' }),
			monthNr: (new Date()).getMonth() + 1,
			year: (new Date()).getUTCFullYear(),
			stepsBack: '0',
			arrowRight: arrowRightGrey,
		}, () => {
			// if the filter was changed set the new filter and then rerender the graphs
			this.clearCharts();
			this.getResults();
		});
	}

	clearCharts() {
			this.doughnutChart?.destroy();
			this.facebookChart?.destroy();
			this.redditChart?.destroy();
			this.twitterChart?.destroy();
	}

	clearWeekChart() {
			this.barChart?.destroy();
	}

	// RENDER
	render(){
		return(
		<section id='graphs'>
			<div id='graphTop'>
				<div id='graphsTitle'>
					<h2 className='graphTitle'>Grafieken</h2>
					<div className='tooltip' id='insightsHelp'>?
					<span className="tooltiptext">Een overzicht van de berichten die je gezien hebt. Rechts van deze titel kan je een tijdspanne selecteren om te bekijken. De negativiteit of positiviteit alsook de kernwoorden van de berichten is gebaseerd op de analyse van onze Artificiële Intelligentie.</span></div>
					<div id='filter'>
						<img src={arrowLeftRed} alt='terug' className='timeArrow' onClick={() => {this.mainSkip(-1)}}/>
						<select name="filter" id='filterSelect' onChange={this.handleFilter} value={this.state.filter}>
							<option value='day'>{this.state.day}</option>
							<option value='month'>{this.state.month}</option>
							<option value='year'>{this.state.year}</option>
						</select>
						<img src={this.state.arrowRight} alt='verder' className='timeArrow' onClick={this.continueFunction}/>
					</div>
				</div>
			</div>
			<div id='graphArea'>
				<div id='perWebsite'>
					<h3 className='graphTitle'>Emotionele verdeling / website</h3>
					<div className='tooltip' id='insightsHelp'>?
					<span className="tooltiptext">Een overzicht van de positieve en negatieve berichten, opgedeeld per website waar de berichten vandaan komen. Bovenaan de grafiek vind je steeds de kernwoorden; de groene zijn de meest voorkomende binnen positieve berichten, de rode binnen negatieve berichten.</span></div>
					<div id='websites'>
						<div id='websiteFacebook'>
							<img src={facebook} alt='facebook'/>
							{this.state.facebookError}
							{this.state.facebookLoading}
							<canvas id='facebookChart' ref={this.facebookChartRef}></canvas>
							<div className='keywords'><span className='positief'>{this.state.facebookPositiveKeywords}</span> <span className='negatief'>{this.state.facebookNegativeKeywords}</span></div>	
						</div>
						<div id='websiteReddit'>
							<img src={reddit} alt='reddit'/>
							{this.state.redditError}
							{this.state.redditLoading}
							<canvas id='redditChart' ref={this.redditChartRef}></canvas>
							<div className='keywords'><span className='positief'>{this.state.redditPositiveKeywords}</span> <span className='negatief'>{this.state.redditNegativeKeywords}</span></div>	
						</div>
						<div id='websiteTwitter'>
							<img src={twitter} alt='twitter'/>
							{this.state.twitterError}
							{this.state.twitterLoading}
							<canvas id='twitterChart' ref={this.twitterChartRef}></canvas>
							<div className='keywords'><span className='positief'>{this.state.twitterPositiveKeywords}</span> <span className='negatief'>{this.state.twitterNegativeKeywords}</span></div>	
						</div>
					</div>
				</div>
				<div id='perDay'>
					<h3 className='graphTitle'>Aantal berichten / dag</h3>
					<div className='tooltip' id='insightsHelp'>?
					<span className="tooltiptext">Een weekoverzicht van de berichten die je gezien hebt, opgedeeld per dag. Met de pijlen onder de grafiek kan je vorige weken bekijken.</span></div>
					{this.state.weekError}
					{this.state.weekLoading}
					<canvas id='barChart' ref={this.barChartRef}></canvas>
					<img src={arrowLeftRed} alt='terug' className='timeArrow' onClick={() => {this.weekSkip(-1)}}/>
					<img src={this.state.arrowWeekRight} alt='verder' className='timeArrow' onClick={this.continueWeekFunction}/>
				</div>
				<div id='total'>
					<h3 className='graphTitle'>Algemene verdeling</h3>
					<div className='tooltip' id='insightsHelp'>?
					<span className="tooltiptext">Een overzicht van de totale positieve en negatieve berichten die je gezien hebt binnen de geselecteerde tijdspanne.</span></div>
					{this.state.doughnutError}
					{this.state.doughnutLoading}
					<canvas id='dougnutChart' ref={this.doughnutChartRef}></canvas>
				</div>
			</div>
		</section>
		);
	}

	continueFunction () {
		if(this.state.arrowRight === arrowRightRed) {
			this.mainSkip(1);
		}  
	}

	continueWeekFunction () {
		if(this.state.arrowWeekRight === arrowRightRed) {
			this.weekSkip(1);
		}  
	}

	weekSkip(direction) {
		this.setState(prevState => {
			return {
				weekStepsBack: parseInt(prevState.weekStepsBack) - direction,
				arrowWeekRight: arrowRightRed
			}
		 }, () => {
				if(this.state.weekStepsBack === 0) {
					this.setState({
						arrowWeekRight: arrowRightGrey
					});
				} 
				this.clearWeekChart();
				this.getWeekResults();
		 });
	}

	mainSkip (direction) {
		this.setState(prevState => {
			return {
				stepsBack: parseInt(prevState.stepsBack) - direction,
				arrowRight: arrowRightRed
			}
		 }, () => {
			if (this.state.filter === 'day') {
				const date = new Date();
				if(this.state.stepsBack === 0) {
					this.setState({
						arrowRight: arrowRightGrey
					});
				} else {
					date.setDate(date.getDate() - this.state.stepsBack);
				}
				this.setState({
					day: date.getDate() + '/' + (date.getMonth() + 1)
				}, () => {
					this.clearCharts();
					this.getResults();
				});
			} else if (this.state.filter === 'month') {
				const date = new Date();
				if(this.state.stepsBack === 0) {
					this.setState({
						arrowRight: arrowRightGrey
					});
				} else {
					date.setMonth(date.getMonth() - this.state.stepsBack);
				}
				this.setState({
					month: date.toLocaleString('default', { month: 'long' }),
					monthNr: date.getMonth() + 1,
					year: date.getFullYear()
				}, () => {
					this.clearCharts();
					this.getResults();
				});
			} else if (this.state.filter === 'year') {
				const date = new Date();
				if(this.state.stepsBack === 0) {
					this.setState({
						arrowRight: arrowRightGrey
					});
				} else {
					date.setFullYear(date.getFullYear() - this.state.stepsBack);
				}
				this.setState({
					year: date.getFullYear()
				}, () => {
					this.clearCharts();
					this.getResults();
				});
			}
		 });
	}

	// DOUGHNUT CHART (ALGEMENE VERDELING)
	createDoughnutChart(sentimentData, myDoughnutChartRef) {
		if(sentimentData.positiveCount === 0 && sentimentData.negativeCount === 0) {
			this.setState({
				doughnutError: <div className='graphError' id='doughnutError'>Er is geen data gevonden voor deze tijdspanne.</div>,
			});
		} else {
			this.setState({
				doughnutError: '',
			});

			const data = {
				labels: [
					'Positief',
					'Negatief'
				],
				datasets: [{
					label: 'sentiment',
					data: [sentimentData.positiveCount, sentimentData.negativeCount],
					backgroundColor: [
						'rgb(89, 161, 96)', // positive
						'rgb(235, 98, 86)' // negative
					],
					hoverOffset: 2,
					borderWidth: 0
				}]
			};

			const config = {
				type: 'doughnut',
				data: data,
			}

			this.doughnutChart = new Chart(
				myDoughnutChartRef,
				config
			);
		}
	}



	// BAR CHART (AANTAL BERICHTEN PER DAG)
	createBarChart(sentimentData, myBarChartRef) {
		const perDayCount = Object.keys(sentimentData.perDayCount).reduce( // based on https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
			(obj, key) => { 
			  obj[key] = sentimentData.perDayCount[key]; 
			  return obj;
			}, 
			{}
		  );
		const labels = [];
		const dataPositive = [];
		const dataNegative = [];

		for (const day in perDayCount) {
			labels.push(day);
			dataPositive.push(perDayCount[day].positive);
			dataNegative.push(perDayCount[day].negative);
		}

		if(labels.length === 0) {
			this.setState({
				weekError: <div className='graphError' id='weekError'>Er is geen data gevonden voor deze week.</div>,
			});
		} else {
			this.setState({
				weekError: '',
			});
		}
		
			const data = {
			labels: labels,
			datasets: [{
				label: 'Positief',
				data: dataPositive,
				backgroundColor: [
					'rgb(89, 161, 96)'
				],
				borderWidth: 0
			},
			{
				label: 'Negatief',
				data: dataNegative,
				backgroundColor: [
					'rgb(235, 98, 86)'
				],
				borderWidth: 0
			}]
			};

			const config = {
				type: 'bar',
				data: data,
				options: {
				scales: {
					y: {
					beginAtZero: true,
					stacked: true,
					grid: {
						display: false
					}
					},
					x: {
						stacked: true,
						grid: {
							display: false
						}
					}
				}
				},
			};

			this.barChart = new Chart(
				myBarChartRef,
				config
			);
	}

	// HORIZONTAL BAR CHARTS (EMOTIONELE VERDELING PER WEBSITE)
	createWebsiteChart(sentimentData, myChartRef, website) {
		const data = {
		labels: [''],
		datasets: [{
			label: 'Positief',
			data: [sentimentData.websiteCount[website].positive], 
			backgroundColor: [
				'rgb(89, 161, 96)'
			],
			borderWidth: 0
		},
		{
			label: 'Negatief',
			data: [sentimentData.websiteCount[website].negative], 
			backgroundColor: [
				'rgb(235, 98, 86)'
			],
			borderWidth: 0
		}]
		};

		if(sentimentData.websiteCount[website].positive !== 0 && sentimentData.websiteCount[website].negative !== 0) {
			const config = {
				type: 'bar',
				data: data,
				options: {
					plugins: {
						legend: {
						display: false
						},
					},
					indexAxis: 'y',
					scales: {
						y: {
						beginAtZero: true,
						grid: {
							display: false
						}
						},
						x: {
							grid: {
								display: false
							}
						}
					}
				},
			};

			if(website === 'facebook') {
				this.facebookChart = new Chart(
					myChartRef,
					config
				);
			} else if(website === 'reddit') {
				this.redditChart = new Chart(
					myChartRef,
					config
				);
			} else if(website === 'twitter') {
				this.twitterChart = new Chart(
					myChartRef,
					config
				);
			}
		}
	}
}
export default Graphs;