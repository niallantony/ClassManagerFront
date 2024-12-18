import { useState } from "react"
import './Splash.css'
import { SignUp } from "../pages/SignUp"
import { Login } from "../pages/Login"
import { Button } from "./Button"
import { Slider } from "./Slider"
import { ButtonContainer } from "./ButtonContainer"

export function Splash() {
    const [visible, setVisible] = useState(1)

    return (<div className="splash">
        <h1>
            ClassRoom
        </h1>
        <Slider height="520" width='420' visible={visible}> 
            <SignUp onCancel={() => setVisible(1)} />
            <ButtonContainer>
                <Button text="Log In" onClick={() => setVisible(0)} />
                <Button text="Sign Up" onClick={() => setVisible(2)} />
            </ButtonContainer>
            <Login onCancel={() => setVisible(1)} />
        </Slider>
    </div>)
    
}