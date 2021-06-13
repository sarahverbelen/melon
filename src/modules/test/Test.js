import axios from 'axios';
import React from 'react';

import environment from '../../environments.json';

class Test extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			test: ''
		}
	}

	componentDidMount() {
		axios({
			method: 'get',
			url: environment['api-url'] + '/',
		})
		.then(function(response) {
			this.setState({
				test: response.data
			})
		}.bind(this));
	}

	render() {
		return (
			<div>
				{this.state.test}
			</div>
		)
	}

}

export default Test;