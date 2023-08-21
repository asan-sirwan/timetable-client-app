import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewAssignment() {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(0)
  const [selectedCourse, setSelectedCourse] = useState(0)

  useEffect(() => {
    fetch('http://localhost:5286/students')
      .then((res) => res.json())
      .then((data) => {
        setStudents(data)
        setSelectedStudent(data[0].id)
      })
    fetch('http://localhost:5286/courses')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data)
        setSelectedCourse(data[0].id)
      })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
		const data = {
			studentId: selectedStudent,
			courseId: selectedCourse
		}

		const res = await fetch('http://localhost:5286/assign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.status === 200 || res.status === 201) {
			navigate('/assign')
		} else {
      alert(res.body)
    }
  }

  return (
    <div className='new-assignment'>
      <form onSubmit={handleSubmit}>
        <header>
          <h1 className='page-title'>Assign a Course to Student</h1>
          <div className='buttons'>
            <button
              className='secondary-button'
              onClick={() => navigate('/assign')}
            >
              Cancel
            </button>
            <button type='submit'>Assign</button>
          </div>
        </header>
        <div className='form-container'>
          <div className='form-field'>
            <label htmlFor='assign-student'>
              Student<span> *</span>
            </label>
            <select
              name='student'
              id='assign-student'
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              {students.length > 0 &&
                students.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name} - {item.email}
                  </option>
                ))}
            </select>
          </div>
          <div className='form-field'>
            <label htmlFor='assign-course'>
              Course<span> *</span>
            </label>
            <select
              name='course'
              id='assign-course'
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.title} - {item.lecturer.name} -{' '}
                  {moment(item.courseDateTime).format('yyyy-MM-DD, hh:mm A')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewAssignment
