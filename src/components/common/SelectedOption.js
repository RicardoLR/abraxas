import React from "react"
import Select from "react-select"

const SelectedOption = ({ value, name, label, onChange, options }) => {

    let data = [];
	options.map(option => {
		let label = option.valor
		data.push({ value: option.id ? option.id : option, label, disabled: option.disabled ? true : false }) 
	})

	

    return (
		<div className="form-group">
			{label && <label className="control-label" htmlFor={name}>
				{label}
			</label>}
			 <Select
                value={value}
                onChange={onChange}
                options={data}
                />
		</div>
    )
}

export default SelectedOption