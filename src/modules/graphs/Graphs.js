import Chart from 'chart.js/auto';
import React, { Component } from 'react'
import axios from 'axios';

import './Graphs.css'

import facebook from '../../img/facebook.svg';
import twitter from '../../img/twitter.svg';
import reddit from '../../img/reddit.svg';


class Graphs extends Component {
	// CREATE THE CHARTS
	doughnutChartRef = React.createRef();
	barChartRef = React.createRef();
	facebookChartRef = React.createRef();
	redditChartRef = React.createRef();
	twitterChartRef = React.createRef();

	componentDidMount() {
		const myDoughnutChartRef = this.doughnutChartRef.current.getContext("2d");
		const myBarChartRef = this.barChartRef.current.getContext("2d");
		const myFacebookChartRef = this.facebookChartRef.current.getContext("2d");
		const myRedditChartRef = this.redditChartRef.current.getContext("2d");
		const myTwitterChartRef = this.twitterChartRef.current.getContext("2d");

		axios({
			method: 'get',
			url: 'http://127.0.0.1:5000/user/608fb0824832f22bdd3542f1/record/',
		})
		.then(function(response) {
			console.log(response.data);
			createDoughnutChart(response.data, myDoughnutChartRef);
			createBarChart(response.data, myBarChartRef);
			createWebsiteChart(response.data, myFacebookChartRef, 'facebook');
			createWebsiteChart(response.data, myRedditChartRef, 'reddit');
			createWebsiteChart(response.data, myTwitterChartRef, 'twitter');
		})
		.catch(function(response) {
			console.log(response);
		});
	}

	// RENDER
	render(){
		return(
		<section id='graphs'>
			<h2>Grafieken</h2>
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
}

// DOUGHNUT CHART (ALGEMENE VERDELING)
function createDoughnutChart(sentimentData, myDoughnutChartRef) {
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

    new Chart(
        myDoughnutChartRef,
        config
    );
}

// BAR CHART (AANTAL BERICHTEN PER DAG)
function createBarChart(sentimentData, myBarChartRef) {
	const labels = [1, 2, 3, 4, 5, 6, 7]; // TODO: figure out a way to make these dates
	const data = {
	  labels: labels,
	  datasets: [{
		label: 'Positief',
		data: [65, 59, 80, 81, 56, 55, 40], // TODO: fill with real data
		backgroundColor: [
			'rgb(89, 161, 96)'
		],
		borderWidth: 0
	  },
	  {
		label: 'Neutraal',
		data: [2, 10, 30, 5, 80, 15, 3], // TODO: fill with real data
		backgroundColor: [
			'rgb(103, 103, 103)'
		],
		borderWidth: 0
	  },
	  {
		label: 'Negatief',
		data: [25, 45, 0, 72, 30, 25, 39], // TODO: fill with real data
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

	  new Chart(
        myBarChartRef,
        config
    );
}

// HORIZONTAL BAR CHARTS (EMOTIONELE VERDELING PER WEBSITE)
function createWebsiteChart(sentimentData, myFacebookChartRef, website) {
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

	  new Chart(
        myFacebookChartRef,
        config
    );
}

export default Graphs;