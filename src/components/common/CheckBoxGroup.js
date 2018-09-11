import React from "react"
import { Checkbox } from 'react-bootstrap'

const CheckBoxGroup = ({error, name, label, subLabel, options, onChange, readOnly, required, disabled, bsClass}) => {

	const data = []

	options.map(option => {
		data.push(
			<Checkbox 
				bsClass={option.bsClass}
				key={ option.name } 
				name={option.name} 
				checked={option.checked} 
				disabled={disabled} 
				readOnly={readOnly} 
				onChange={onChange}
				inline>
				{ option.label }
			</Checkbox>
		);
	})

	let wrapperClass = `${bsClass} form-group`
	if (error && required) {
		wrapperClass += " has-error";
	}

	return (
		<div className={wrapperClass}>
			{label && <label className="control-label" htmlFor={name}>
				{label}{subLabel && <span className="small text-muted" >{subLabel}</span>}
			</label>}

			{data}

			{error && required && <p>{'Este campo es requerido'}</p>}
		</div>
	);
};

export default CheckBoxGroup;
