import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import List from '../../components/List'

function Student() {
  const navigate = useNavigate()
	const [students, setStudents] = useState(null)

	useEffect(() => {
    fetch('http://localhost:5286/students')
      .then((res) => res.json())
      .then((data) => {
        setStudents(data)
      })
  }, [])
	
  return (
    <div className='student'>
      <header>
        <h1 className='page-title'>Students</h1>
        <button onClick={() => navigate('/student/new')}>Add</button>
      </header>
      <List
				itemRoute='/student'
				headerTitles={['Name', 'Email', 'Birth Date', 'Address']}
				content={students}
			/>
    </div>
  )
}

export default Student
