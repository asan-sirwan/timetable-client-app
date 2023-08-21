import { Outlet } from 'react-router-dom'
import SideBar from './layout/SideBar'

function App() {
  return (
    <div className='app'>
      <SideBar />
      <main className='content'>
        <Outlet />
      </main>
    </div>
  )
}

export default App
