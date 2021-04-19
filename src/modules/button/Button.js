import React from 'react';

import './Button.css';

class Button extends React.Component {
	render() {
		return <a class='Button' href={this.props.url} target='_blank'>
			{this.props.label}
		</a>
	}
}

export default Button;