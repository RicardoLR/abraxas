import React, {Component} from "react"

import {connect} from "react-redux"

class Loading extends Component {

	showLoading() {
		if (this.props.isLoading) {
			return <div className="loading-component"><i className="fa fa-circle-o-notch fa-spin fa-4x" /></div>
		} else {
			return null
		}
	}

	constructor(props, context) {
		super(props, context)
		this.showLoading = this.showLoading.bind(this)
	}

	render() {
		return (this.showLoading())
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.Loading.get('isLoading')
	}
}

export default connect(mapStateToProps)(Loading)
