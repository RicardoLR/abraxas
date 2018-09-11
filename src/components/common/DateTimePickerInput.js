import DateTimeField from "react-bootstrap-datetimepicker"
import React from "react"

const DateTimePickerInput = ({name, disabled, error, label, id, defaultValue, required, readOnly,maxDate, value, onChange}) => {

    let wrapperClass = "form-group ";

    if (error && required && !value) {
        wrapperClass += " has-error";
    }

    return (
        <div className={wrapperClass}>
            <label className="control-label" htmlFor={name}>
                {label}
            </label>

						<DateTimeField
							id={id}
							name={name}
							disabled={disabled}
							defaultValue={defaultValue}
							readOnly={readOnly}
							format="YYYY-MM-DD"
							inputFormat="DD-MM-YYYY"
							onChange={onChange}
							viewMode="date"
							maxDate={maxDate}
							defaultText="DD-MM-AAAA"
						/>
            {error && required && !value && <p>{'Este campo es requerido'}</p>}
        </div>
    )
};

export default DateTimePickerInput;
