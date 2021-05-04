import Chart from 'chart.js/auto';
import React, { Component } from 'react'

import './Graphs.css'

class Graphs extends Component {
	doughnutChartRef = React.createRef();

	componentDidMount() {
		const myDoughnutChartRef = this.doughnutChartRef.current.getContext("2d");
		createDoughnutChart([], myDoughnutChartRef);
	}

	render(){
		return(
		<section id='graphs'>
			<h2>Grafieken</h2>
			<div id='total'>
				<h3>Algemene verdeling</h3>
				<canvas id='dougnutChart' ref={this.doughnutChartRef}></canvas>
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

    let chart = new Chart(
        myDoughnutChartRef,
        config
    );
}

export default Graphs;