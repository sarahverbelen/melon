import Chart from 'chart.js/auto';
import React, { Component } from 'react'

import './Graphs.css'

class Graphs extends Component {
	doughnutChartRef = React.createRef();
	barChartRef = React.createContext();

	componentDidMount() {
		const myDoughnutChartRef = this.doughnutChartRef.current.getContext("2d");
		const myBarChartRef = this.barChartRef.current.getContext("2d");
		createDoughnutChart([], myDoughnutChartRef);
		createBarChart([], myBarChartRef);
	}

	render(){
		return(
		<section id='graphs'>
			<h2>Grafieken</h2>
			<div id='graphArea'>
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

function createDoughnutChart(sentimentData, myDoughnutChartRef) {
    const data = {
        labels: [
            'Positief',
            'Neutraal',
            'Negatief'
        ],
        datasets: [{
            label: 'sentiment',
            // data: [sentimentData.positiveCount, sentimentData.neutralCount, sentimentData.negativeCount],
			data: [20,30,50],
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
        data: data
    }

    new Chart(
        myDoughnutChartRef,
        config
    );
}

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
			  stacked: true
			},
			x: {
				stacked: true
			}
		  }
		},
	  };

	  new Chart(
        myBarChartRef,
        config
    );
}

export default Graphs;