import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Nav, Button, NavItem, Row, Tab } from 'react-bootstrap'
import { isEqual } from 'underscore'

import * as Utils from 'Assets/Utils'

import { closeModal, createModal } from 'Modules/Modal'
import { modifyTask } from 'Modules/Tareas'

import Labels from 'Assets/Labels';

import SelectInput from 'Components/common/SelectInput'
import TextInput from 'Components/common/TextInput'

import { getLocalStorage, setLocalStorage } from 'Modules/LocalStorage'


class NewTasks extends Component {

    handleSelect (obj, element) {

        this.setState({form: {...this.state.form, [element]: obj.value} }, ()=>{
            let form = this.state.form
            if( (form.selectHourId === 3 && form.countHourId || form.selectHourId === 4 && form.tiempoTareaId) )
                this.setState({ validateCustom: false })

            if( !form.nombreTarea || !form.detalleTarea || !form.selectHourId )
                this.setState({ validate: false })
            else
                this.setState({ validate: true, validateCustom:true })
                
        })
        

	}

	handleText (event) {
        event.preventDefault()
        
        this.setState({form:{...this.state.form, [event.target.name]: event.target.value} }, ()=>{
            let form = this.state.form            
            console.log(form)
            if( (form.selectHourId === 3 && form.countHourId || form.selectHourId === 4 && form.tiempoTareaId) )
                this.setState({ validateCustom: false })
            

            if( !form.nombreTarea || !form.detalleTarea || !form.selectHourId )
                this.setState({ validate: false })
            else
                this.setState({ validate: true, validateCustom:true })
        })

    }


    getTime(id){
        switch(id) {
            case 1:
                return "30:00"
                break;
            case 2:
                return "60:00"
                break;
        
            default:
                return 0
        }
    }
    
    onSave(){
        let form = this.state.form

        if( !form.nombreTarea || !form.nombreTarea ){
            this.setState({validate: false})
        }else if( (form.selectHourId === 3 && !form.countHourId) || (form.selectHourId === 4 && !form.tiempoTareaId) ){
            this.setState({validateCustom: false})
        }else{

            if( form.selectHourId === 4 && form.tiempoTareaId  ){
                if( !form.tiempoTareaId.includes(":") )
                    this.props.createModal(Utils.warningMessage("Formato correcto, ej maximo: 119:59"))
                else{
                    let horaMinutos = form.tiempoTareaId.split(":");
                    if( parseInt(horaMinutos[0]) >= 120 && parseInt(horaMinutos[1]) >= 60 )
                        this.props.createModal(Utils.warningMessage("Error debe ser menor a 2 horas, ej: 119:59")) 
                    else            
                        this.saveTask(form)
                }
    
            }else
                this.saveTask(form)

        }


        
    }


    saveTask(form){

        let tiempo = form.selectHourId === 3 ? String(parseInt(form.countHourId)*60)+":00" : form.selectHourId === 4 ? form.tiempoTareaId : this.getTime(form.selectHourId)

        this.props.modifyTask({
            id: form.id ? form.id : Utils.getUUID(),
            nombreTarea: this.state.form.nombreTarea,
            detalleTarea: this.state.form.detalleTarea,
            date: new Date(),
            banderaRango: form.selectHourId === 2 ? 1 : 0,
            selectHour: tiempo, 
            tiempoRestante: tiempo,

            countHourId: form.countHourId,
            selectHourId: form.selectHourId,
            tiempoTareaId: form.tiempoTareaId,

            estado: 0   //  0 = creada, 1 proceso, 2 pausada, 3 terminada       
        }).then( data => {

            this.props.getLocalStorage().then( res =>{

                let tareasBD = { tareas: [] }
                if( res && res.tareas ){
                    tareasBD = Object.assign({}, res);
                }
                tareasBD.tareas.push(data)

                this.props.setLocalStorage(tareasBD).then( r=>{
                    this.props.cerrarpopup(r)

                })
            })
        })

    }


	constructor(props) {
        super(props)

		this.state = {
            validateCustom: false,
            validate: false,
			form: {
                tarea:{},
                arrayTiempos: [],
                status:1
            }
        }
        
		this.handleSelect = this.handleSelect.bind(this)
		this.handleText = this.handleText.bind(this)
		this.onSave = this.onSave.bind(this)
	}

	componentWillMount() {

        if(this.props.form.arrayTiempos)
            this.setState({
                form: {
                    ...this.state.form,
                    arrayTiempos: this.props.form.arrayTiempos
                }
            })

        if(this.props.data){
            this.setState({ 
                form: { 
                    ...this.props.form, 
                    ...this.props.data,
                }
            })
        }
    }


	componentWillReceiveProps(nextProps) {

		// if( !isEqual(this.state.form.tarea, nextProps.tarea) ){
        //     console.log("componentWillReceiveProps 22 entro")

        //     this.setState({
        //         form: {
        //             ...this.state.form,
        //             ...nextProps.tarea
        //         }, 
        //         selectHourId: nextProps.tarea.selectHourId || null,
        //         countHourId: nextProps.tarea.countHourId || null
        //     })
        // } 
	}

	render() {

        const selectCustomHour = this.state.form.selectHourId === 4 || this.props.form.selectHourId === '4'
        const selectHours = this.state.form.selectHourId === 3 || this.props.form.selectHourId === '3'
        const ver = selectCustomHour ? {display: 'block'} : {display: 'none'}

        return (
            <div>

                <Row className="mb12">
                    <Col xs={12}>
                        <fieldset>
                            <legend style={{display: 'block',float: 'left'}}>{Labels.Tasks.newTask}</legend>
                        </fieldset>
                    </Col>
                </Row>
                <Row className="mb12">
                <fieldset className="mb12">
                
                    <Col sm={12} md={3}>
                        <TextInput
                            name={'nombreTarea'}
                            value={this.state.form.nombreTarea}
                            label={Labels.Tasks.nameTask}
                            placeholder={Labels.Tasks.nameTask}
                            required
                            disabled={this.state.form.id ? true : false}
                            maxLength={20}
                            error={this.state.validate}
                            onChange={this.handleText} />
                    </Col>
                    <Col sm={12} md={3}>
                        <TextInput
                            name={'detalleTarea'}
                            value={this.state.form.detalleTarea}
                            label={Labels.Tasks.detailTask}
                            placeholder={Labels.Tasks.detailTask}
                            required
                            maxLength={150}
                            error={this.state.validate}
                            onChange={this.handleText} />
                    </Col>
                    <Col sm={12} md={3}>
                        <SelectInput
                            name={'selectHourId'}
                            value={this.state.selectHourId}
                            label={"Seleccionar rango"}
                            error={this.state.validate}
                            options={this.state.form.arrayTiempos}
                            onChange={(v)=>{this.handleSelect(v,'selectHourId')}} />
                    </Col>

                    <Col sm={12} md={3} style={ selectHours ? {display: 'block'} : {display: 'none'} }>
                        <SelectInput
                            name={'countHourId'}
                            value={this.state.countHourId}
                            label={Labels.Tasks.countHour}
                            error={this.state.validateCustom}
                            options={
                                [
                                    {id:1, valor:1, minutes: "60:00"},
                                    {id:2, valor:2, minutes: "120:00"},
                                    {id:3, valor:3, minutes: "180:00"},
                                    {id:4, valor:4, minutes: "240:00"},
                                    {id:5, valor:5, minutes: "300:00"}
                                ]
                            }
                            required
                            onChange={(v)=>{this.handleSelect(v,'countHourId')}} />
                    </Col>

                    <Col sm={12} md={3} style={ ver  } >
                        <TextInput
                            name={'tiempoTareaId'}
                            value={this.state.form.tiempoTareaId}
                            label={Labels.Tasks.editHour}
                            placeholder={'minutos:segundos'}
                            required
                            hour
                            error={this.state.validateCustom}
                            onChange={this.handleText} />
                    </Col>


                    <Col xs={12}>
                        <Button 							
                            disabled={ this.state.validateCustom || this.state.validate ? false : true}
                            bsStyle="primary" className="pull-right" onClick={this.onSave} >{Labels.save}</Button>
					</Col>
    
                </fieldset>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewTasks)
