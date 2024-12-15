import { Outlet, Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import './Splash.css'
import { SignUp } from "../pages/SignUp"
import { Login } from "../pages/Login"
import { Button } from "./Button"
import { ButtonContainer } from "./ButtonContainer"

export function Splash() {
    const [visible, setVisible] = useState(<></>)
    const [buttonVisible, setButtonVisible] = useState(true)

    const handleSignup = () => {
        setVisible(<SignUp onCancel={handleCancel} />)
        setButtonVisible(false)
    }

    const handleLogin = () => {
        setVisible(< Login onCancel={handleCancel} />)
        setButtonVisible(false)
    }

    const handleCancel = () => {
        setVisible(<div className="fields animate-close"></div>)
        setButtonVisible(true)
    }

    return (<div className="splash">
        <h1>
            ClassRoom
        </h1>
        <div>
            <div className="form-container">
                {visible}
            </div>
            <ButtonContainer visible={buttonVisible}>
                <Button text="Log In" onClick={handleLogin} />
                <Button text="Sign Up" onClick={handleSignup} />
            </ButtonContainer>
        </div>
    </div>)
    
}