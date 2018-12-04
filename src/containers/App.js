import React, { Component } from 'react'

import { connect } from 'react-redux'
import { getLocalStorage, setLocalStorage } from 'Modules/LocalStorage'
import { isEqual } from 'underscore'
import * as Utils from 'Assets/Utils'
import { closeModal, createModal } from 'Modules/Modal'
import Grafica from 'Components/common/Grafica'
import NewTasks from 'Containers/modals/NewTasks'
import { modifyTask } from 'Modules/Tareas'

import Tasks from 'Components/Tarea/Tasks'

class App extends Component {


	constructor(props) {

		super(props)

		this.timers = []

		this.state = {
			validate: false,
			idEditando: '',
			columns:{
				tareas: [
					{ name: "Completa", nameOption: 'Completa', type: 'checkbox', className:"table-column-check", columnClassName:"table-column-check"},
					{ name: "nombreTarea", id: 'nombreTarea', type: 'simple',  className:"table-column-type", columnClassName:"table-column-type" },
					{ name: "detalleTarea", id: 'detalleTarea', type: 'simple' },
					{ name: "Fecha", id: 'date', type: 'date', sort: true, className:"table-column-check", columnClassName:"table-column-check" },
					{ name: "Tiempo restante MM:SS", id: 'tiempoRestante', type: 'simple',  sort: true, className:"table-column-type", columnClassName:"table-column-type"  },
					{ name: "estado", id: 'estadoVisual', type: 'simple',  sort: true, className:"table-column-check", columnClassName:"table-column-check" }
				]
			},
			form: {
				tareas: [],
				tarea: {},
				arrayTiempos:[
					{id: 1, valor: 'Corta: 30 min'},
					{id: 2, valor: 'Media: 30 min a 1 hr'},
					{id: 3, valor: 'Larga: más de 1 hr'},
					{id: 4, valor: 'Personalizar tiempo'}
				]
			}
		}

		this.handleClicNewTask = this.handleClicNewTask.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
		this.handleText = this.handleText.bind(this)
		this.cerrarpopup = this.cerrarpopup.bind(this)
		this.handleRemove = this.handleRemove.bind(this)
		this.onClickEdit = this.onClickEdit.bind(this)
		this.onClickStartPause = this.onClickStartPause.bind(this)
		this.iniciarCronometro = this.iniciarCronometro.bind(this)
		this.onClickRestart = this.onClickRestart.bind(this)
		this.onClickComponent = this.onClickComponent.bind(this)

	}

	

	onClickComponent(evt, type, row) {

		let item = Utils.getItem(this.timers, {id: row.id})
		if(item){
			window.clearInterval( item.timer );
			this.timers = Utils.removeItem(this.timers, item)	
		}
		let form = this.state.form
		form.tareas.map( item =>{
			if(item.bloqueadaTerminar)
				this.props.createModal(Utils.warningMessage("Ya termino esta tarea, solo puede Eliminarla")) 
				
			if(item.id===row.id && (item.estado ===1 || item.estado ===2) ){ 
				item.estado = 3
				item.bloqueadaTerminar = true 
			}

		})
		this.props.setLocalStorage({ tareas : form.tareas })
		this.setState({ form:{ ...form} })
	}

	iniciarCronometro(id, starStop){

		let item = Utils.getItem( this.timers, {id}) 
		let itemTask = Utils.getItem( this.state.form.tareas, {id}) 

		if(!item && starStop === 0 && itemTask.estado !== 3 ){
			let timer = window.setInterval( ()=>{
				let form = this.state.form
				form.tareas.map( t =>{
					if(t.id===id){
						t.estado=1

						let minSeg = t.tiempoRestante.split(":");

						if( t.banderaRango === 1 ){

							if( minSeg[0] === "30" && (minSeg[1] === "00" || minSeg[1] === "0") ){
								t.tiempoRestante = "00:00" 
								t.estado=3
								this.stopTimer(id)
							}
						}
						if( (minSeg[0] === "00" || minSeg[0] === "0") && (minSeg[1] === "00" || minSeg[1] === "0") ){
							t.tiempoRestante = "00:00"
							t.estado=3
							this.stopTimer(id)
						}else{

							if( minSeg[1] === "00" || (minSeg[1] === "00" || minSeg[1] === "0") )
								t.tiempoRestante = ( parseInt(minSeg[0])-1 )+':'+ "59"
							else 
								t.tiempoRestante = minSeg[0]+':'+ ( parseInt(minSeg[1])-1 )
						}
					}

				})
				this.setState({ form:{ ...form} })
			}, 1000 )
	
			this.timers.push( {id, timer} )
		}  else{
			this.stopTimer(id)
		}

	}

	stopTimer(id) {
		let form = this.state.form
		form.tareas.map( item =>{
			if(item.id===id && item.estado!=3) item.estado=2
		})
		this.setState({ form:{...form} })
		this.props.setLocalStorage({ tareas : form.tareas })

		let item = Utils.getItem(this.timers, {id})
		if(item){
			window.clearInterval( item.timer );
			this.timers = Utils.removeItem(this.timers, item)	
		}
	}


	handleRemove(id){
		this.stopTimer(id)
		let form = this.state.form
		let item = Utils.getItem(form.tareas, {id})	
		form.tareas = Utils.removeItem(form.tareas, item)	
		this.setState({ form:{...form} })
		this.props.setLocalStorage({ tareas : form.tareas })
	}

	onClickEdit(id){

		let form = this.state.form
		let item = Utils.getItem(form.tareas, {id})

		if( item.estado !== 3 ){
			form.tareas = Utils.removeItem(form.tareas, item)
			
			this.setState({ idEditando:id, form:{...form, tarea:{} } })

			this.props.setLocalStorage( form.tareas ).then( res =>{
				
				let modalObj = {
					body: 
						<NewTasks 
							data={item}
							form={this.state.form}
							cerrarpopup={this.cerrarpopup}
						/>,
					className: 'custom-modal',
					closeButton: true,
					noFooter: true
				}
				this.props.createModal(modalObj)	
			})
		}
		
	}

	handleSelect (obj, element) {
		this.setState({form: {...this.state.form, [element]: obj.value}})
	}

	handleText (event) {
		event.preventDefault()
		this.setState({form:{...this.state.form, [event.target.name]: event.target.value} })
	}


	handleClicNewTask() {
		let modalObj = {
			body: 
				<NewTasks 
					form={this.state.form}
					cerrarpopup={this.cerrarpopup}
				/>,
			className: 'custom-modal',
			closeButton: true,
			noFooter: true
		}
		this.props.createModal(modalObj)
	}

	cerrarpopup(t){
		this.props.closeModal()
		this.setState({ form:{ ...this.state.form,  tareas: t.tareas} })
	}

	onClickStartPause(id){

		let form = this.state.form
		let item = Utils.getItem(form.tareas, {id})

		// Estados  0 = creada, 1 proceso, 2 pausada, 3 terminada 
		if( item.estado===0 || item.estado===2 )
			this.iniciarCronometro(id, 0)
		else 
			this.iniciarCronometro(id, 1)
	}

    onClickRestart(id){
		let item = Utils.getItem(this.timers, {id})
		if(item){
			window.clearInterval( item.timer );
			this.timers = Utils.removeItem(this.timers, item)	
		}

		let form = this.state.form
		form.tareas.map( item =>{

			if(item.id===id && (item.estado ===1 || item.estado ===2) ){ 
				item.tiempoRestante = item.selectHour
				item.estado = 0
			}
		})
		this.setState({ form:{ ...form} })
	}

	componentWillMount(){

		console.log("process.env.APP", process.env.APP)
		console.log("process.env.baseURL", process.env.baseURL)

		this.props.getLocalStorage().then( res =>{

			if( res && res.tareas ){
				let form = this.state.form
				form.tareas = res.tareas
				this.setState({ ...form	})
			}else{
				this.props.setLocalStorage({ tareas :  [] })
			}
		})

	}

	componentWillReceiveProps(nextProps) {


		// if( !isEqual(this.state.form.tarea, nextProps.tarea) ){

		// 	let form = this.state.form

		// 	let item = Utils.getItem(form.tareas, {id: nextProps.tarea.id})
		// 	// if( this.state.idEditando == nextProps.tarea.id ){
		// 	// 	form.tareas = Utils.removeItem(form.tareas, item)
		// 	// }
		// 	if( !item ) {
		// 		form.tareas.push( nextProps.tarea )
		// 	}

		// 	//this.props.setLocalStorage(form.tareas).then( t =>{
		// 		this.setState({ form:{ ...form} })
		// 	//})
		// } 
		
	}

	render() {
		return (
			<div>
				{"MASTER"}
				<Tasks 
					form={this.state.form}
					tareas={this.state.form.tareas}
					validate={this.state.validate}

					onClickComponent={this.onClickComponent}
					onClickStartPause={this.onClickStartPause}
					handleClicNewTask={this.handleClicNewTask}
					handleSelect={this.handleSelect}
					handleText={this.handleText} 
					columns={this.state.columns}
					handleRemove={this.handleRemove}
					onClickEdit={this.onClickEdit}
					iniciarCronometro={this.iniciarCronometro}
					onClickRestart={this.onClickRestart}
				 />

				 <Grafica data={this.state.form.tareas} color={'blue'}  />

				{"MASTER"}

			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return ({
		tarea: state.Tareas.get('Task').toJS()
	})
}

const mapDispatchToProps = (dispatch) => {
	return {
		modifyTask: (obj) => dispatch(modifyTask(obj)),
		setLocalStorage: (modalObj) => dispatch(setLocalStorage(modalObj)),
		getLocalStorage: () => dispatch(getLocalStorage()),
		closeModal: (modalObj) => dispatch(closeModal(modalObj)),
		createModal: (modalObj) => dispatch(createModal(modalObj)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
