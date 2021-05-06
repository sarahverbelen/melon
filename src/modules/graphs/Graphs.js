import Chart from 'chart.js/auto';
import React, { Component } from 'react'
import axios from 'axios';

import './Graphs.css'

import facebook from '../../img/facebook.svg';
import twitter from '../../img/twitter.svg';
import reddit from '../../img/reddit.svg';


class Graphs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: 'today'
		}

		this.handleFilter = this.handleFilter.bind(this);
		this.getResults = this.getResults.bind(this);
		this.getWeekResults = this.getWeekResults.bind(this);

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

		if (this.state.filter === 'today') {
			queryString = '';
		} else if (this.state.filter === 'month') {
			queryString = 'month=' + (today.getMonth() + 1);
		} else if (this.state.filter === 'year') {
			queryString = 'year=' + today.getFullYear();
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
		this.setState({filter: document.getElementById("filter").value}, () => {
			// if the filter was changed, we need to set the new filter and then rerender the graphs
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
				<select name="filter" id="filter" onChange={this.handleFilter} value={this.state.filter}>
					<option value='today'>Vandaag</option>
					<option value='month'>Deze maand</option>
					<option value='year'>Dit jaar</option>
				</select>
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
				</div>
				<div id='total'>
					<h3>Algemene verdeling</h3>
					<canvas id='dougnutChart' ref={this.doughnutChartRef}></canvas>
				</div>
			</div>
		</section>
		);
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