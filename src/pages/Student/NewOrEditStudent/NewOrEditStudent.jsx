import { useNavigate, useLocation } from 'react-router-dom'
import FormField from '../../../components/FormField'
import { useState, useEffect } from 'react'

function NewOrEditStudent() {
  const navigate = useNavigate()
	const { state } = useLocation()
  const { updating, student } = state
    ? state
    : { updating: false, lecturer: null }
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [birthDate, setBirthDate] = useState('')
	const [address, setAddress] = useState('')

	const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      ...(updating && { id: student.id }),
      name,
      email,
      password,
      birthDate,
      address,
    }

    const res = await fetch('http://localhost:5286/students', {
      method: updating ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.status === 200 || res.status === 201) {
			navigate('/student')
		} else {
      alert(res.body)
    }
  }

	useEffect(() => {
    if (updating) {
      setName(student.name)
      setEmail(student.email)
      setBirthDate(student.birthDate)
      setAddress(student.address)
    }
  }, [])

  return (
    <div className='new-student'>
      <form onSubmit={handleSubmit}>
        <header>
          <h1 className='page-title'>{updating ? 'Edit Student' : 'Add a New Student'}</h1>
          <div className='buttons'>
            <button
              className='secondary-button'
              onClick={() => navigate(updating ? `/student/${student.id}` : '/student')}
            >
              Cancel
            </button>
            <button type='submit'>Save</button>
          </div>
        </header>
        <div className='form-container'>
          <FormField
            label='Name'
            id='student-name'
            type='text'
            required={true}
						value={name}
						setValue={setName}
          />
          <FormField
            label='Email'
            id='student-email'
            type='email'
            required={true}
						value={email}
						setValue={setEmail}
          />
          <FormField
            label='Password'
            id='student-password'
            type='password'
            required={true}
						value={password}
						setValue={setPassword}
          />
          <FormField
            label='Birth Date'
            id='student-birth-date'
            type='date'
            required={true}
						value={birthDate}
						setValue={setBirthDate}
          />
          <FormField
            label='Address'
            id='student-address'
            type='text'
            required={true}
						value={address}
						setValue={setAddress}
          />
        </div>
      </form>
    </div>
  )
}

export default NewOrEditStudent
