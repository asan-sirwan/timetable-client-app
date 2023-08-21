import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
} from 'react-router-dom'
import App from '../App.jsx'
import Assign from '../pages/Assign/Assign.jsx'
import Course from '../pages/Course/Course.jsx'
import CourseDetail from '../pages/Course/CourseDetail/CourseDetail.jsx'
import NewOrEditCourse from '../pages/Course/NewOrEditCourse/NewOrEditCourse.jsx'
import Error from '../pages/Error/Error.jsx'
import Lecturer from '../pages/Lecturer/Lecturer.jsx'
import LecturerDetail from '../pages/Lecturer/LecturerDetail/LecturerDetail.jsx'
import NewOrEditLecturer from '../pages/Lecturer/NewOrEditLecturer/NewOrEditLecturer.jsx'
import NewOrEditStudent from '../pages/Student/NewOrEditStudent/NewOrEditStudent.jsx'
import Student from '../pages/Student/Student.jsx'
import StudentDetail from '../pages/Student/StudentDetail/StudentDetail.jsx'
import NewAssignment from '../pages/Assign/NewAssignment/NewAssignment.jsx'
import AssignmentDetail from '../pages/Assign/AssignmentDetail/AssignmentDetail.jsx'

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path='/' element={<App />}>
      <Route index element={<Navigate to='/assign' />} />
      <Route path='/assign' element={<Assign />} />
      <Route path='/assign/new' element={<NewAssignment />} />
      <Route path='/assign/detail' element={<AssignmentDetail />} />
      <Route path='/student' element={<Student />} />
      <Route path='/student/new' element={<NewOrEditStudent />} />
      <Route path='/student/edit' element={<NewOrEditStudent />} />
      <Route path='/student/:id' element={<StudentDetail />} />
      <Route path='/lecturer' element={<Lecturer />} />
      <Route path='/lecturer/new' element={<NewOrEditLecturer />} />
      <Route path='/lecturer/edit' element={<NewOrEditLecturer />} />
      <Route path='/lecturer/:id' element={<LecturerDetail />} />
      <Route path='/course' element={<Course />} />
      <Route path='/course/new' element={<NewOrEditCourse />} />
      <Route path='/course/edit' element={<NewOrEditCourse />} />
      <Route path='/course/:id' element={<CourseDetail />} />
    </Route>,
    <Route path='*' element={<Error />} />,
  ])
)

export default router
