import React from 'react';

import './Button.css';

class Button extends React.Component {
	render() {
		return <div className='Button' id={this.props.position} data-testid='button'>
			<a href={this.props.url} target='_blank' rel="noreferrer">
				{this.props.label}
			</a>
		</div>
	}
}

export default Button;