import React from 'react';

import './Button.css';

class Button extends React.Component {
	render() {
		/* TODO: solve bug where you have to double click when onClick is given? */
		return <div className='Button' id={this.props.position} data-testid='button'>
			<a href={this.props.url} target={this.props.newTab ? '_blank' : '_self' } rel="noreferrer" onClick={this.props.onClick}>
				{this.props.label}
			</a>
		</div>
	}
}

export default Button;