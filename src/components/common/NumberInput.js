import React, { Component } from "react"

import { connect } from "react-redux"

class NumberInput extends Component {

	numChange(e) {

		e.preventDefault()

		let selTemp = e.target.selectionStart
		let ival = e.target.value.replace(/[^0-9\.]/g, '')

		if ((ival.match(/\./g) || []).length < 2) {

			e.target.value = ival
			e.target.selectionStart = selTemp
			e.target.selectionEnd = selTemp

			this.setState({ value: e.target.value })
			if (this.props.onChange) {

				this.props.onChange(e)
			}
		}
	}

	constructor(props) {
		super(props)
		this.state = { value: '' }
		this.numChange = this.numChange.bind(this)
	}

	render() {
		let wrapperClass = "form-group "
		if (this.props.error) {
			if (this.props.required && (this.props.value === '' || this.props.value === undefined)) {
				wrapperClass += " has-error"
			}
		}
		return (
			<div className={wrapperClass}>
				<label className="control-label" htmlFor={this.props.name}>
					{this.props.label}
				</label>
				<input
					type="text"
					min={this.props.min}
					max={this.props.max}
					maxLength={this.props.maxLength}
					name={this.props.name}
					className="form-control"
					placeholder={this.props.placeholder}
					value={this.props.value}
					onChange={this.numChange}
					autoComplete="off"
					disabled={this.props.disabled} />
				{(this.props.error && this.props.required && !this.props.value) && <p> {'Este campo es requerido'} </p>}
			</div>

		)
	}
}
//{this.props.required && <i className={'requerido'}>&bull</i>}

const mapStateToProps = (state, ownProps) => {
	return {
		error: ownProps.error,
		label: ownProps.label,
		maxLength: ownProps.maxLength,
		max: ownProps.max,
		min: ownProps.min,
		name: ownProps.name,
		onChange: ownProps.onChange,
		placeholder: ownProps.placeholder,
		required: ownProps.required,
		step: ownProps.step,
		value: ownProps.value,
		disabled: ownProps.disabled
	}
}

export default connect(mapStateToProps)(NumberInput)
