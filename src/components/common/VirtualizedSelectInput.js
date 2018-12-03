import * as Utils from 'Assets/Utils'

import React from 'react'
import VirtualizedSelect from 'react-virtualized-select'

const VirtualizedSelectInput = ({name, disabled, error, label, labelKey, valueKey, onChange, onLoadOptions, options, required, readOnly, value, autoFocus, placeholder}) => {

	let wrapperClass = "form-group ";

	if (error && required && (value === '' || value === undefined || value === null || isNaN(value))) {
		wrapperClass += " has-error";
	}

	let handleChange = (inputValue) => {
		if (name === "cp" || name === "mailCp") {
			inputValue = inputValue.replace(/[^0-9\.]/g, '')
			inputValue = inputValue.substring(0, 5)
		}
		else {
			inputValue = inputValue.substring(0, 20)
		}
		return inputValue
	}

	let searchable = true,
		clearable  = false;

	let valueOption = value ? Utils.getItem(options,{id:value}) : value

	return (
		<div className={wrapperClass}>
			<label className="control-label" htmlFor={name}>
				{label}
			</label>

			<VirtualizedSelect
				async
				labelKey={labelKey}
				valueKey={valueKey}
				backspaceRemoves={false}
				loadOptions={onLoadOptions}
				minimumInput={3}
				autofocus={autoFocus}
				clearable={clearable}
				disabled={disabled}
				noResultsText="No existe la opción"
				name={name}
				id={name}
				onChange={onChange}
				options={options}
				searchPromptText="Código Postal"
				placeholder={placeholder ? placeholder : "Seleccione una opción"}
				searchable={searchable}
				readOnly={readOnly}
				value={valueOption}
				onInputChange={handleChange}
				simpleValue />
			{error && required && (value === '' || value === undefined || value === null || isNaN(value)) && <p>{'Este campo es requerido'}</p>}
		</div>
	)
};

export default VirtualizedSelectInput
