import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import DataDetail from '../../../components/DataDetail'
import List from '../../../components/List'
import DeleteModal from '../../../components/DeleteModal'
import moment from 'moment'

function CourseDetail() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:5286/courses/${id}?detailed=true`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data)
      })
  }, [])

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5286/courses/${id}`, {
      method: 'DELETE',
    })

    setShowAlert(false)
    if (res.status !== 200) {
      alert(res.body)
    } else {
      navigate('/course')
    }
  }

  return (
    <div className='course-detail'>
      <header>
        <h1 className='page-title'>{course ? course.title : 'Loading..'}</h1>
        <div className='buttons'>
          <button
            className='secondary-button'
            onClick={() => navigate('/course')}
          >
            Back
          </button>
          <button className='delete-button' onClick={() => setShowAlert(true)}>
            Delete
          </button>
          <button
            onClick={() =>
              navigate('/course/edit', {
                state: { updating: true, course: course },
              })
            }
          >
            Edit
          </button>
        </div>
      </header>
      {course && (
        <div className='details'>
          <DataDetail title='Description' value={course.description} />
          <DataDetail
            title='Course Date & Time'
            value={moment(course.courseDateTime).format('dddd, yyyy-MM-DD, hh:mm A')}
          />
          <DataDetail
            title='Taught By'
            value={
              <Link
                className='lecturer-link'
                to={`/lecturer/${course.lecturer.id}`}
              >
                {course.lecturer.name}
              </Link>
            }
          />
          <div className='data-detail'>
            <h3>
              <span>Students:</span>
            </h3>
          </div>
          <List
            headerTitles={['Name', 'Email', 'Birth Date']}
            content={course.students.map((student) => {
              return {
                id: student.id,
                name: student.name,
                email: student.email,
                birthDate: student.birthDate,
              }
            })}
						itemRoute='/student'
          />
        </div>
      )}
      {showAlert ? (
        <DeleteModal
          data={course}
          handleCancel={() => setShowAlert(false)}
          handleConfirm={handleDelete}
          open={showAlert}
        />
      ) : null}
    </div>
  )
}

export default CourseDetail
