import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
// import ReactDatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'

function FormField({
  label,
  type,
  id,
  required,
  selectName,
  selectDataList,
  value,
  setValue,
}) {
  let input = (
    <input
      type={type}
      id={id}
      required={required}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )

  if (type === 'password') {
    const [isVisible, setIsVisible] = useState(false)

    input = (
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type={isVisible ? 'text' : 'password'}
          id={id}
          style={{ width: '100%' }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className='password-visibility'
          onClick={(event) => {
            event.preventDefault()
            setIsVisible(!isVisible)
          }}
        >
          <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} />
        </button>
      </div>
    )
  } else if (type === 'select') {
    input = (
      <select
        name={selectName}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {selectDataList.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    )
    // } else if (type === 'date') {
    // } else if (type === 'datetime') {
    // 	input = (
    //     <ReactDatePicker
    //       className='datepicker'
    //       id={id}
    //       selected={value}
    //       onChange={(date) => setValue(date)}
    // 			showTimeInput
    //       dateFormat='yyyy-MM-dd, hh:mm aa'
    //     />
    //   )
  } else if (type === 'textarea') {
    input = (
      <textarea
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength='255'
      ></textarea>
    )
  }

  return (
    <div className='form-field'>
      <label htmlFor={id}>
        {label}
        {required ? <span> *</span> : null}
      </label>
      {input}
    </div>
  )
}

export default FormField
