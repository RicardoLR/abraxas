import React, { Component } from 'react'
import { connect } from 'react-redux'
import {ResponsiveContainer, Radar, RadarChart, Legend, PolarGrid, PolarAngleAxis,
	BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'

import { Col, Nav, Button, NavItem, Row, Tab } from 'react-bootstrap'

import * as Utils from 'Assets/Utils'

import { closeModal, createModal } from 'Modules/Modal'
import { modifyTask } from 'Modules/Tareas'

import Labels from 'Assets/Labels';

import SelectInput from 'Components/common/SelectInput'
import TextInput from 'Components/common/TextInput'

import { getLocalStorage, setLocalStorage } from 'Modules/LocalStorage'


class Estadistica extends Component {


	constructor(props) {
		super(props)

		this.state = {
					
		}
	}

	componentWillMount() {
	}


	componentWillReceiveProps(nextProps) {

	}

	render() {

		const data = [
			{name: 'Page A', uv: 4000},
			{name: 'Page B', uv: 4000},
			{name: 'Page C', uv: 4000},
			{name: 'Page D', uv: 4000},
	  ];

		return (
			<div>
			<Row className="clearfix mb12">
			<Col xs={12} md={7} className="mb12">

				<ResponsiveContainer width="100%" height={300}>
						
						<BarChart 
							width={600} 
							height={300} 
							data={data}
							margin={{top: 5, right: 30, left: 20, bottom: 5}}
						>
							
							<CartesianGrid strokeDasharray="3 3"/>
							<XAxis dataKey="name"/>
							<YAxis/>
							<Tooltip/>
							<Legend />
							<Bar dataKey="uv" fill="#82ca9d" />
						</BarChart>

				</ResponsiveContainer>
			
			</Col>
			</Row>
			</div>
		)
	}
}

const mapStateToProps = (state) => {

	return {
				tarea: state.Tareas.get('Task').toJS()
				
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		modifyTask: (modalObj) => dispatch(modifyTask(modalObj)),
		getLocalStorage: () => dispatch(getLocalStorage()),
		setLocalStorage: (modalObj) => dispatch(setLocalStorage(modalObj)),
		closeModal: (modalObj) => dispatch(closeModal(modalObj)),
		createModal: (modalObj) => dispatch(createModal(modalObj)) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Estadistica)
