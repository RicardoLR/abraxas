import React from "react";
import { Modal, Button } from 'react-bootstrap'

const ModalConfirmation = ({show, onConfirm, onClose})=>{
    return (
			<Modal show={show} onHide={onClose} backdrop="static" keyboard={false} >
				<Modal.Header closeButton>
					<Modal.Title>{'Confirmación'}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{'¿Esta seguro que desea eliminar el elemento?'}</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="default" onClick={onClose}>{'No'}</Button>
					<Button bsStyle="primary" onClick={onConfirm}>{'Si'}</Button>
				</Modal.Footer>
			</Modal>
    )
}

export default ModalConfirmation
