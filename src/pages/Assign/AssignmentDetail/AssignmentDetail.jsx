import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DataDetail from '../../../components/DataDetail'
import moment from 'moment'
import DeleteModal from '../../../components/DeleteModal'

function AssignmentDetail() {
  const [student, setStudent] = useState()
  const [course, setCourse] = useState()
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()
  const { studentId, courseId } = state

  useEffect(() => {
    fetch(`http://localhost:5286/students/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data)
      })
    fetch(`http://localhost:5286/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data)
      })
  }, [])

	const handleDelete = async () => {
    const res = await fetch(`http://localhost:5286/assign/${studentId}/${courseId}`, {
      method: 'DELETE',
    })

    setShowAlert(false)
    if (res.status !== 201) {
      alert(res.body)
    } else {
      navigate('/assign')
    }
  }

  return (
    <div className='assignment-detail'>
      <header>
        <h1 className='page-title'>
          {student ? 'Assignment Detail' : 'Loading..'}
        </h1>
        <div className='buttons'>
          <button
            className='secondary-button'
            onClick={() => navigate('/assign')}
          >
            Back
          </button>
          <button className='delete-button' onClick={() => setShowAlert(true)}>
            Delete
          </button>
        </div>
      </header>
      {student && course && (
        <div className='details'>
          <DataDetail title='Student Name' value={student.name} />
          <DataDetail title='Student Email' value={student.email} />
          <DataDetail title='Course Title' value={course.title} />
          <DataDetail title='Course Description' value={course.description} />
          <DataDetail title='Course Lecturer' value={course.lecturer.name} />
          <DataDetail title='Lecturer Email' value={course.lecturer.email} />
          <DataDetail
            title='Course Date & Time'
            value={moment(course.courseDateTime).format('dddd, yyyy-MM-DD, hh:mm A')}
          />
        </div>
      )}
			{showAlert ? (
        <DeleteModal
          data={{name: 'assignment'}}
          handleCancel={() => setShowAlert(false)}
          handleConfirm={handleDelete}
          open={showAlert}
        />
      ) : null}
    </div>
  )
}

export default AssignmentDetail
