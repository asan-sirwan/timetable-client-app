import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FormField from '../../../components/FormField'

function NewOrEditCourse() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { updating, course } = state ? state : { updating: false, course: null }
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [courseDateTime, setCourseDateTime] = useState(new Date())
  const [selectedLecturer, setSelectedLecturer] = useState(0)
  const [lecturers, setLecturers] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      ...(updating && { id: course.id }),
      title,
      description,
      courseDateTime,
      lecturerId: selectedLecturer,
    }

    const res = await fetch('http://localhost:5286/courses', {
      method: updating ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.status === 200 || res.status === 201) {
      navigate('/course')
    } else {
      console.log(data)
      console.log(res)
      alert(res.body)
    }
  }

  useEffect(() => {
    fetch('http://localhost:5286/lecturers')
      .then((res) => res.json())
      .then((data) => {
        setLecturers(data)
        setSelectedLecturer(data[0].id)
      })
      .finally(() => {
        if (updating) {
          setTitle(course.title)
          setDescription(course.description)
          setCourseDateTime(course.courseDateTime)
          setSelectedLecturer(course.lecturer.id)
        }
      })
  }, [])

  return (
    <div className='new-course'>
      <form onSubmit={handleSubmit}>
        <header>
          <h1 className='page-title'>
            {updating ? 'Edit Course' : 'Add a New Course'}
          </h1>
          <div className='buttons'>
            <button
              className='secondary-button'
              onClick={() =>
                navigate(updating ? `/course/${course.id}` : '/course')
              }
            >
              Cancel
            </button>
            <button type='submit'>Save</button>
          </div>
        </header>
        <div className='form-container'>
          <FormField
            label='Title'
            id='course-title'
            type='text'
            required={true}
            value={title}
            setValue={setTitle}
          />
          <FormField
            label='Description'
            id='course-description'
            type='textarea'
            required={true}
            value={description}
            setValue={setDescription}
          />
          <FormField
            label='Course Date & Time'
            id='course-date-time'
            type='datetime-local'
            required={true}
            value={courseDateTime}
            setValue={setCourseDateTime}
          />
          <div className='form-field'>
            <label htmlFor='course-lecturer'>
              Lecturer<span> *</span>
            </label>
            <select
              name='lecturer'
              id='course-lecturer'
              value={selectedLecturer}
              onChange={(e) => setSelectedLecturer(e.target.value)}
            >
              {lecturers.length > 0 &&
                lecturers.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewOrEditCourse
