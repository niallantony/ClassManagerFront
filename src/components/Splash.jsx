import { Outlet, Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function Splash() {
    return (<div>
        <h1>
            ClassRoom Manager
        </h1>
        <Link to='signup'>Sign Up</Link>
        <Link to='login'>Log in</Link>
        <Outlet />
    </div>)
    
}