import Chart from 'chart.js/auto';
import React, { Component } from 'react'
import axios from 'axios';

import './Graphs.css'

import facebook from '../../img/facebook.svg';
import twitter from '../../img/twitter.svg';
import reddit from '../../img/reddit.svg';

import arrowLeftRed from '../../img/arrow-left-red.png';
import arrowRightRed from '../../img/arrow-right-red.png';
import arrowRightGrey from '../../img/arrow-right-grey.png';

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
			arrowRight: arrowRightGrey,
			arrowWeekRight: arrowRightGrey
		}

		this.handleFilter = this.handleFilter.bind(this);
		this.getResults = this.getResults.bind(this);
		this.getWeekResults = this.getWeekResults.bind(this);
		this.mainSkip = this.mainSkip.bind(this);
		this.continueFunction = this.continueFunction.bind(this);

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
		this.getResults();
		this.getWeekResults();
	}

	getResults() {
		const myDoughnutChartRef = this.doughnutChartRef.current.getContext("2d");
		const myFacebookChartRef = this.facebookChartRef.current.getContext("2d");
		const myRedditChartRef = this.redditChartRef.current.getContext("2d");
		const myTwitterChartRef = this.twitterChartRef.current.getContext("2d");

		// FILTERS
		let queryString = '';
		let today = new Date();

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
			url: 'http://127.0.0.1:5000/user/608fb0824832f22bdd3542f1/record/?' + queryString,
		})
		.then(function(response) {
			this.createDoughnutChart(response.data, myDoughnutChartRef);
			this.createWebsiteChart(response.data, myFacebookChartRef, 'facebook', this.facebookChart);
			this.createWebsiteChart(response.data, myRedditChartRef, 'reddit', this.redditChart);
			this.createWebsiteChart(response.data, myTwitterChartRef, 'twitter', this.twitterChart);
		}.bind(this))
		.catch(function(response) {
			console.log(response);
		});
	}

	getWeekResults() {
		const myBarChartRef = this.barChartRef.current.getContext("2d");

		axios({
			method: 'get',
			url: 'http://127.0.0.1:5000/user/608fb0824832f22bdd3542f1/record/?time=week'
		})
		.then(function(response) {
			this.createBarChart(response.data, myBarChartRef);
		}.bind(this))
		.catch(function(response) {
			console.log(response);
		});
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
		this.doughnutChart.destroy();
		this.facebookChart.destroy();
		this.redditChart.destroy();
		this.twitterChart.destroy();
	}

	// RENDER
	render(){
		return(
		<section id='graphs'>
			<div id='graphTop'>
				<h2>Grafieken</h2>
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
			<div id='graphArea'>
				<div id='perWebsite'>
					<h3>Emotionele verdeling / website</h3>
					<div id='websites'>
						<div id='websiteFacebook'>
							<img src={facebook} alt='facebook'/>
							<canvas id='facebookChart' ref={this.facebookChartRef}></canvas>
						</div>
						<div id='websiteReddit'>
							<img src={reddit} alt='reddit'/>
							<canvas id='redditChart' ref={this.redditChartRef}></canvas>
						</div>
						<div id='websiteTwitter'>
							<img src={twitter} alt='twitter'/>
							<canvas id='twitterChart' ref={this.twitterChartRef}></canvas>
						</div>
					</div>
				</div>
				<div id='perDay'>
					<h3>Aantal berichten / dag</h3>
					<canvas id='barChart' ref={this.barChartRef}></canvas>
					<img src={arrowLeftRed} alt='terug' className='timeArrow' onClick={() => {this.weekSkip(-1)}}/>
					<img src={this.state.weekArrowRight} alt='verder' className='timeArrow' onClick={this.continueWeekFunction}/>
				</div>
				<div id='total'>
					<h3>Algemene verdeling</h3>
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
		const data = {
			labels: [
				'Positief',
				'Neutraal',
				'Negatief'
			],
			datasets: [{
				label: 'sentiment',
				data: [sentimentData.positiveCount, sentimentData.neutralCount, sentimentData.negativeCount],
				backgroundColor: [
					'rgb(89, 161, 96)', // positive
					'rgb(103, 103, 103)', // neutral
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

	// BAR CHART (AANTAL BERICHTEN PER DAG)
	createBarChart(sentimentData, myBarChartRef) {
		const perDayCount = Object.keys(sentimentData.perDayCount).sort().reduce( // https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
			(obj, key) => { 
			  obj[key] = sentimentData.perDayCount[key]; 
			  return obj;
			}, 
			{}
		  );
		const labels = [];
		const dataPositive = [];
		const dataNegative = [];
		const dataNeutral = [];

		for (const day in perDayCount) {
			labels.push(day);
			dataPositive.push(perDayCount[day].positive);
			dataNegative.push(perDayCount[day].negative);
			dataNeutral.push(perDayCount[day].neutral);
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
			label: 'Neutraal',
			data: dataNeutral,
			backgroundColor: [
				'rgb(103, 103, 103)'
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
			label: 'Neutraal',
			data: [sentimentData.websiteCount[website].neutral], 
			backgroundColor: [
				'rgb(103, 103, 103)'
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

		const config = {
			type: 'bar',
			data: data,
			options: {
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
export default Graphs;