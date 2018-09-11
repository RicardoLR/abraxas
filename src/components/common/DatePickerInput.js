import DatePicker from 'react-bootstrap-date-picker'
import React from "react";

const DatePickerInput = ({name, disabled, error, label, id, defaultValue, maxDate, required, readOnly, value, onChange, subLabel, dateFormat}) => {

	let wrapperClass = "form-group ";

	if (error && required && !value) {
		wrapperClass += " has-error";
	}

	return (
		<div className={wrapperClass}>
			<label className="control-label" htmlFor={id}>
				{label}
				{subLabel && <span className="small text-muted" >{subLabel}</span>}
			</label>
			<DatePicker
				id={id}
				name={name}
				disabled={disabled}
				defaultValue={defaultValue}
				readOnly={readOnly}
				dateFormat={dateFormat ? dateFormat : "DD-MM-YYYY"}
				value={value}
				maxDate={maxDate}
				className="form-control"
				placeholder="DD-MM-YYYY"
				onChange={(v) => {onChange({target:{ name, value: v}}) }}
				monthLabels={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
				dayLabels={['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']} />
			{error && required && !value && <p>{'Este campo es requerido'}</p>}
		</div>
	)
};

export default DatePickerInput;
