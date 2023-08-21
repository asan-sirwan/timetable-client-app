import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DataDetail from '../../../components/DataDetail'
import List from '../../../components/List'
import DeleteModal from '../../../components/DeleteModal'

function StudentDetail() {
  const { id } = useParams()
  const [student, setStudent] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:5286/students/${id}?detailed=true`)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data)
      })
  }, [])

	const handleDelete = async () => {
    const res = await fetch(`http://localhost:5286/students/${id}`, {
      method: 'DELETE',
    })

    setShowAlert(false)
    if (res.status !== 200) {
      alert(res.body)
    } else {
      navigate('/student')
    }
  }

  return (
    <div className='student-detail'>
      <header>
        <h1 className='page-title'>{student ? student.name : 'Loading..'}</h1>
        <div className='buttons'>
          <button
            className='secondary-button'
            onClick={() => navigate('/student')}
          >
            Back
          </button>
          <button className='delete-button' onClick={() => setShowAlert(true)}>
            Delete
          </button>
          <button
            onClick={() =>
              navigate('/student/edit', {
                state: { updating: true, student },
              })
            }
          >
            Edit
          </button>
        </div>
      </header>
			{student && (
				<div className="details">
					<DataDetail title='Email' value={student.email} />
          <DataDetail title='Birth Date' value={student.birthDate} />
          <DataDetail title='Address' value={student.address} />
					<div className='data-detail'>
            <h3>
              <span>Courses:</span>
            </h3>
          </div>
					<List
            headerTitles={['Title', 'Taught By', 'Course Date & Time']}
            content={student.courses.map((course) => {
              return {
								id: course.id,
                title: course.title,
								lecturer: course.lecturer.name,
                courseDateTime: course.courseDateTime,
              }
            })}
						itemRoute='/course'
          />
				</div>
			)}
			{showAlert ? (
        <DeleteModal
          data={student}
          handleCancel={() => setShowAlert(false)}
          handleConfirm={handleDelete}
					open={showAlert}
        />
      ) : null}
    </div>
  )
}

export default StudentDetail
