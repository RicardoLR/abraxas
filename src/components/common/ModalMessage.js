import { Button, Modal } from 'react-bootstrap'

import React from "react";
import { closeModal } from 'Modules/Modal'
import { connect } from "react-redux";

class ModalMessage extends React.Component {

	mapButtons(btn, i) {
		return (<Button key={i} bsStyle={btn.type} autoFocus={btn.autofocus} onClick={btn.onClick}>{btn.txt}</Button>)
	}

	constructor(props) {
		super(props)
	}

	render() {

		let footer = this.props.content.footer || [{ txt: 'Aceptar', type: 'primary', onClick: this.props.onClose, autofocus: true }]
		if (this.props.content.noFooter)
			footer = []

		return (
			<Modal
				show={this.props.show}
				onHide={this.props.content.close || this.props.onClose}
				backdrop="static" keyboard={false}
				dialogClassName={this.props.content.className} >
				<Modal.Header closeButton={this.props.content.closeButton}>
					<Modal.Title>{this.props.content.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{this.props.content.body}</Modal.Body>
				{footer.length > 0 && <Modal.Footer>{footer.map(this.mapButtons)}</Modal.Footer>}
			</Modal>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		show: state.Modal.get('show'),
		content: state.Modal.get('content').toJS()
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onClose: () => { dispatch(closeModal()) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalMessage)
