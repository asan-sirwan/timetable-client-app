import { useLocation, useNavigate } from 'react-router-dom'
import FormField from '../../../components/FormField'
import { useEffect, useState } from 'react'

function NewOrEditLecturer() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { updating, lecturer } = state
    ? state
    : { updating: false, lecturer: null }
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [degree, setDegree] = useState('BSc')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      ...(updating && { id: lecturer.id }),
      name,
      email,
      password,
      birthDate,
      degree,
    }

		console.log(data);

    const res = await fetch('http://localhost:5286/lecturers', {
      method: updating ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.status === 200 || res.status === 201) {
			navigate('/lecturer')
		} else {
      alert(res.body)
    }
  }

  useEffect(() => {
    if (updating) {
      setName(lecturer.name)
      setEmail(lecturer.email)
      setBirthDate(new Date(lecturer.birthDate))
      setDegree(lecturer.degree)
    }
  }, [])

  return (
    <div className='new-lecturer'>
      <form onSubmit={handleSubmit}>
        <header>
          <h1 className='page-title'>{updating ? 'Edit Lecturer' : 'Add a New Lecturer'}</h1>
          <div className='buttons'>
            <button
              className='secondary-button'
              onClick={() => navigate(updating ? `/lecturer/${lecturer.id}` : '/lecturer')}
            >
              Cancel
            </button>
            <button type='submit'>Save</button>
          </div>
        </header>
        <div className='form-container'>
          <FormField
            label='Name'
            id='lecturer-name'
            type='text'
            required={true}
            value={name}
            setValue={setName}
          />
          <FormField
            label='Email'
            id='lecturer-email'
            type='email'
            required={true}
            value={email}
            setValue={setEmail}
          />
          <FormField
            label='Password'
            id='lecturer-password'
            type='password'
            required={true}
            value={password}
            setValue={setPassword}
          />
          <FormField
            label='Birth Date'
            id='lecturer-birth-date'
            type='date'
            required={true}
            value={birthDate}
            setValue={setBirthDate}
          />
          <FormField
            label='Degree'
            id='lecturer-degree'
            type='select'
            required={true}
            selectName='degree'
            selectDataList={['Prof', 'PhD', 'MSc', 'BSc', 'Diploma']}
            value={degree}
            setValue={setDegree}
          />
        </div>
      </form>
    </div>
  )
}

export default NewOrEditLecturer
