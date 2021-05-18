import React from "react";

import './Toggle.css';

class Toggle extends React.Component {
	render() {
		return (
			<div className='toggle-switch'>
				<input type="checkbox" className="toggle-switch-checkbox" name={this.props.name} id={this.props.name} defaultChecked={this.props.checked} onChange={this.props.handleChange} {...this.props.register(this.props.name)}/>
				<label className="toggle-switch-label" htmlFor={this.props.name}>
					<span className="toggle-switch-inner" />
					<span className="toggle-switch-switch" />
				</label>
			</div>
		)
	}
}

export default Toggle;