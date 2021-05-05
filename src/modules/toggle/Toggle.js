import React from "react";

import './Toggle.css';

class Toggle extends React.Component {
	render() {
		return (
			<div className='toggle-switch'>
				<input type="checkbox" class="toggle-switch-checkbox" name={this.props.name} id={this.props.name} defaultChecked={this.props.checked}/>
				<label class="toggle-switch-label" htmlFor={this.props.name}>
					<span class="toggle-switch-inner" />
					<span class="toggle-switch-switch" />
				</label>
			</div>
		)
	}
}

export default Toggle;