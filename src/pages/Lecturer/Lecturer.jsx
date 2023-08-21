import { useNavigate } from 'react-router-dom'
import List from '../../components/List'
import { useEffect, useState } from 'react'

function Lecturer() {
  const navigate = useNavigate()
  const [lecturers, setLecturers] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5286/lecturers')
      .then((res) => res.json())
      .then((data) => {
        setLecturers(data)
      })
  }, [])

  return (
    <div className='lecturer'>
      <header>
        <h1 className='page-title'>Lecturers</h1>
        <button onClick={() => navigate('/lecturer/new')}>Add</button>
      </header>
      <List
        itemRoute='/lecturer'
        headerTitles={['Name', 'Email', 'Birth Date', 'Degree']}
        content={lecturers}
      />
    </div>
  )
}

export default Lecturer
