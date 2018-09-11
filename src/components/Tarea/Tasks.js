import { Button, Col, Row, Collapse } from 'react-bootstrap'
import React from 'react'

import SelectInput from 'Components/common/SelectInput'
import TableData from 'Components/common/TableData'
import Labels from 'Assets/Labels';

import * as Utils from 'Assets/Utils'

const Tasks = (props) => {


	const lista = props.tareas.map((todo, index) =>
		<li key={index}>
			{todo.tiempoRestante}
		</li>
	);

	const tareas = props.tareas.map(( f, index) =>{
		f.estadoVisual = f.estado == 0 ? "Nueva" : f.estado == 1 ? "En curso" : f.estado == 2 ? "Pausada" : "Concluida"
		return f
	});


	return (
   
		<div>
         	<Col xs={2} className="text-right">
				<Button bsStyle="primary" className="inline" onClick={props.handleClicNewTask} >{Labels.Tasks.newTask}</Button>
			</Col>    	    

			<Col xs={12} >
				<TableData
					page={1}
					pageStartIndex={1}
					columns={props.columns.tareas}
					search
					onClickComponent={(evt, type, row) => props.onClickComponent(evt, type, row)}
					customStyle="block-link"
					remove
					onClickRemove={props.handleRemove}
					edit
					onClickEdit={props.onClickEdit}
					onClickStartPause={props.onClickStartPause}
					onClickRestart={props.onClickRestart}
					stateTask
					data={tareas} />
			</Col>


        </div>
	)
}
export default Tasks

