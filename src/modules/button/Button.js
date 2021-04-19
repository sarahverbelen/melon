import React from 'react';

import './Button.css';

class Button extends React.Component {
	render() {
		return <div class='Button' id={this.props.position}>
			<a href={this.props.url} target='_blank' rel="noreferrer">
				{this.props.label}
			</a>
		</div>
	}
}

export default Button;