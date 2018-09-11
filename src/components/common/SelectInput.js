import React from "react"
import Select from "react-select"

const SelectInput = ({name, disabled, error, label, onChange, options, required, readOnly, value, autoFocus, placeholder, matchPos, noSelection}) => {

	let wrapperClass = "form-group ";

	if (error && required && (value === '' || value === undefined || value === null || isNaN(value))) {
		wrapperClass += " has-error";
	}

	let handleChange = (inputValue) => {
		if (name === "cp" || name === "mailCp") {
			inputValue = inputValue.replace(/[^0-9\.]/g, '')
			inputValue = inputValue.substring(0, 5)
		} else {
			inputValue = inputValue.substring(0, 20)
		}

		return inputValue
	}

	let searchable = true,
		clearable  = false;

	let data = [];

	if (!noSelection)
		data.push({value: null, label: 'Seleccione una opción'})

	options.map(option => {

		let label = ""

		if (option.nombreDonataria)
			label = option.nombreDonataria
		else if (option.preguntaValoracion)
			label = option.preguntaValoracion
		else if (option.meta)
			label = option.meta
		else if (option.nombre)
			label = option.nombre
		else if (option.resultado)
			label = option.resultado
		else if (option.causa)
			label = option.causa
		else if (option.estadoJustificacion)
			label = option.estadoJustificacion
		else if (option.simbolo)
			label = option.simbolo
		else if (option.indicador)
			label = option.indicador
		else if (option.rango)
			label = option.rango
		else if (option.escala)
			label = option.escala
		else if (option.tipoTabla)
			label = option.tipoTabla
		else if (option.pregunta)
			label = option.pregunta
		else if (option.proyecto)
			label = option.proyecto
		else if (option.variable)
			label = option.variable
		else if (option.tipoContrato)
			label = option.tipoContrato 
		else if (option.evaluacion)
			label = option.evaluacion
		else if (option.figuraJuridica)
			label = option.figuraJuridica
		else if (option.subTema2)
			label = option.subTema2
		else if (option.tema1)
			label = option.tema1
		else if (option.ano)
			label = option.ano
		else if (option.nombreInstitucion)
			label = option.nombreInstitucion
		else if (option.tipoGasto)
			label = option.tipoGasto
		else if (option.perfil)
			label = option.perfil
		else if (option.grupo)
			label = option.grupo
		else if (option.funcion)
			label = option.funcion
		else if (option.descripcion)
			label = option.descripcion
		else if (option.estatus)
			label = option.estatus
		else if (option.cp)
			label = option.cp
		else if (option.estado)
			label = option.estado
		else if (option.municipioDelegacion)
			label = option.municipioDelegacion
		else if (option.servicio)
			label = option.servicio
		else if (option.enfoque)
			label = option.enfoque 
		else
			label = option.valor

		data.push({ value: option.id ? option.id : option, label, disabled: option.disabled ? true : false }) 
	})

	return (
		<div className={wrapperClass}>
			{label && <label className="control-label" htmlFor={name}>
				{label}
			</label>}

			<Select
				matchPos={matchPos}
				autofocus={autoFocus}
				clearable={clearable}
				disabled={disabled}
				noResultsText="No existe la opción"
				name={name}
				id={name}
				onChange={onChange}
				options={data}
				placeholder={placeholder ? placeholder : "Seleccione una opción"}
				searchable={searchable}
				simpleValue
				readOnly={readOnly}
				value={value}
				onInputChange={handleChange} />
			{error && required && (value === '' || value === ' ' || value === undefined || value === null /*|| isNaN(value) */) && <p>{'Este campo es requerido'}</p>}
		</div>
	)
};

export default SelectInput
