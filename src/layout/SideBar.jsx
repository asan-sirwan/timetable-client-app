import {
  faChalkboard,
  faPersonChalkboard,
  faPlusSquare,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

function SideBar() {
  return (
    <aside className='side-bar'>
      <h1>Dashboard</h1>
      <hr />
      <nav>
        <NavLink to='/assign'>
          <p>Assigned Courses</p>
          <FontAwesomeIcon icon={faPlusSquare} />
        </NavLink>
        <NavLink to='/student'>
          <p>Students</p>
          <FontAwesomeIcon icon={faUserGraduate} />
        </NavLink>
        <NavLink to='/lecturer'>
          <p>Lecturers</p>
          <FontAwesomeIcon icon={faPersonChalkboard} />
        </NavLink>
        <NavLink to='/course'>
          <p>Courses</p>
          <FontAwesomeIcon icon={faChalkboard} />
        </NavLink>
      </nav>
      <code>&lt; Made by Asan Sirwan &gt;</code>
    </aside>
  )
}

export default SideBar
