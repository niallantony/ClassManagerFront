import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import styled from "styled-components"
const backendUrl = import.meta.env.VITE_BACKEND_URL

const StyledContent = styled.div`
    padding:2rem;
`

export function Layout() {
    const [user, setUser] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${backendUrl}/dash`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(res => {
                if (res.user) {
                    setUser(res.user)
                }
            })
            .catch((e) => console.log(e))
    }, [])

    const handleLogout = async () => {
        fetch(`${backendUrl}/user/logout`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (res.status === 200) {
                    navigate('/')
                }
            })
            .catch((e) => console.log(e))
    }

    return (<>
        <div className="layout">
            <Navbar user={user} handleLogout={handleLogout} />
            <StyledContent className="content">
                <Outlet />
            </StyledContent>
        </div>
    </>)
}
