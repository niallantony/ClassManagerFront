import { NavLink } from 'react-router-dom'
import { Button } from './Button'
import './Navbar.css'

export function Navbar({handleLogout}) {
    return(<nav>
        <h1>ClassRoom</h1>
        <NavLink className="nav-link" to="subjects">Subjects</NavLink>
        <NavLink className="nav-link" to="lessons">Lessons</NavLink>
        <NavLink className="nav-link" to="students">Students</NavLink>
        <Button text="Log Out" onClick={handleLogout} />
    </nav>)
}