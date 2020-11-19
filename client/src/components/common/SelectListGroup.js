import React from 'react';
import classnames from 'classnames';

export default function SelectListGroup({name, placeholder, value, error, info, onChange, options}) {
  const selectOptions = options.map(({label, value}) => (
    <option key={label} value={value}>
      {label}
    </option>
  ))
  return (
    <div className="form-group">
      <select 
        className={classnames("form-control form-control-lg", {
          'is-invalid' : error
        })} 
        placeholder={placeholder}
        name={name}
        value={value} 
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
                
  )
}