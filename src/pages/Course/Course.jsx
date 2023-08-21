import { useEffect, useState } from 'react'
import List from '../../components/List'
import { useNavigate } from 'react-router-dom'

function Course() {
	const navigate = useNavigate()
  const [courses, setCourses] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5286/courses')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data)
      })
  }, [])

  return (
    <div className='course'>
      <header>
        <h1 className='page-title'>Courses</h1>
        <button onClick={() => navigate('/course/new')}>Add</button>
      </header>
      <List
        headerTitles={['Title', 'Taught By', 'Course Date & Time']}
        content={courses && courses.map((course) => {
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
  )
}

export default Course
