import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import List from '../../components/List'
import AssignmentList from './Components/AssignmentList'

function Assign() {
  const navigate = useNavigate()
  const [students, setStudents] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5286/students/with-courses?detailed=true')
      .then((res) => res.json())
      .then((data) => {
        setStudents(data)
      })
  }, [])

  return (
    <div className='assign'>
      <header>
        <h1 className='page-title'>Assigned Courses</h1>
        <button onClick={() => navigate('/assign/new')}>New</button>
      </header>
      {/* <List
        itemRoute='/assign'
        headerTitles={['Student Name', 'Course', 'Taught By', 'On']}
        content={
          students &&
          students.flatMap((student) => {
            return student.courses.map((course) => ({
							id: student.id,
							courseId: course.id,
              studentName: student.name,
              courseTitle: course.title,
              lecturer: course.lecturer.name,
              courseDateTime: course.courseDateTime,
            }))
          })
        }
      /> */}
      <AssignmentList
        headerTitles={['Student Name', 'Course', 'Taught By', 'On']}
        content={
          students &&
          students.flatMap((student) => {
            return student.courses.map((course) => ({
              id: student.id,
              courseId: course.id,
              studentName: student.name,
              courseTitle: course.title,
              lecturer: course.lecturer.name,
              courseDateTime: course.courseDateTime,
            }))
          })
        }
      />
    </div>
  )
}

export default Assign
