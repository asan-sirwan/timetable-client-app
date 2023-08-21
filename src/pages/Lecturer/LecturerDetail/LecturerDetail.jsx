import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DataDetail from '../../../components/DataDetail'
import DeleteModal from '../../../components/DeleteModal'
import List from '../../../components/List'

function LecturerDetail() {
  const { id } = useParams()
  const [lecturer, setLecturer] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:5286/lecturers/${id}?detailed=true`)
      .then((res) => res.json())
      .then((data) => {
        setLecturer(data)
      })
  }, [])

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5286/lecturers/${id}`, {
      method: 'DELETE',
    })

    setShowAlert(false)
    if (res.status !== 200) {
      alert(res.body)
    } else {
      navigate('/lecturer')
    }
  }

  return (
    <div className='lecturer-detail'>
      <header>
        <h1 className='page-title'>{lecturer ? lecturer.name : 'Loading..'}</h1>
        <div className='buttons'>
          <button
            className='secondary-button'
            onClick={() => navigate('/lecturer')}
          >
            Back
          </button>
          <button className='delete-button' onClick={() => setShowAlert(true)}>
            Delete
          </button>
          <button onClick={() => navigate('/lecturer/edit', { state: {updating: true, lecturer} })}>Edit</button>
        </div>
      </header>
      {lecturer && (
        <div className='details'>
          <DataDetail title='Email' value={lecturer.email} />
          <DataDetail title='Birth Date' value={lecturer.birthDate} />
          <DataDetail title='Degree' value={lecturer.degree} />
          <div className='data-detail'>
            <h3>
              <span>Courses:</span>
            </h3>
          </div>
          <List
            headerTitles={['Title', 'Course Date & Time']}
            content={lecturer.courses.map((course) => {
              return {
								id: course.id,
                title: course.title,
                courseDateTime: course.courseDateTime,
              }
            })}
						itemRoute='/course'
          />
        </div>
      )}
      {showAlert ? (
        <DeleteModal
          data={lecturer}
          handleCancel={() => setShowAlert(false)}
          handleConfirm={handleDelete}
					open={showAlert}
        />
      ) : null}
    </div>
  )
}

export default LecturerDetail
