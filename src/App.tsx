
import { Outlet } from 'react-router-dom'
import Nav from './components/topNav/Nav'

export default function App() {

  return (
    <>
      <div>
        <Nav />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  )
}

