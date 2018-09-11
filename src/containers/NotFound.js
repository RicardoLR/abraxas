import React, {Component} from 'react'
import {Button} from 'react-bootstrap'

class NotFound extends Component {

	goBack() {
		this.props.history.goBack()
	}

	constructor(props) {
		super(props)
		this.goBack = this.goBack.bind(this)
	}

	render() {
		return(
			<div className="not-found-page">
				<div className="centered-middle">
					<i className="fa fa-window-close-o fa-5x" />
					<h3>Contenido no encontrado</h3> 
					<Button bsStyle="primary" onClick={this.goBack}>Regresar</Button>
				</div>
			</div>
		)
	}
}

export default NotFound