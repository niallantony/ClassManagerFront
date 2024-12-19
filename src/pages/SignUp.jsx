import { Form, TextInput } from "../components/Form"
import { Button } from "../components/Button"
import { useState, useEffect } from "react"
import { ButtonContainer } from "../components/ButtonContainer"
const backendUrl = import.meta.env.VITE_BACKEND_URL

export function SignUp({onCancel}){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [errorMessages, setErrorMessages] = useState({})
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const messages = {}
        Object.values(errors).forEach((error) => {
            messages[error.path] = error.msg
        })
        setErrorMessages(messages)
    },[errors])

    useEffect(() => {
        setVisible(true)
    },[])

    
    const handleSubmit = async () => {
        await fetch(`${backendUrl}/user/new`, {
            method:"POST",
            body:JSON.stringify({
                firstname:firstName,
                lastname:lastName,
                email:email,
                password:password,
                vpassword:confirmPassword
            }),
            headers: {
                'Content-type':'application/json; charset=UTF-8'
            },
        })
        .then(response => response.json())
        .then(response => {
            if(response.errors) {
                setErrors(response.errors)
            }
        })
        .catch(e => console.error(e))
    }



    return (
        <Form>
            <TextInput 
                type="text" 
                id="firstname" 
                text="First Name" 
                value={firstName} 
                onChange={setFirstName} 
                />
            <TextInput 
                type="text" 
                id="lastname" 
                text="Last Name" 
                value={lastName} 
                onChange={setLastName} 
                error={errorMessages.firstName}
                />
            <TextInput 
                type="text" 
                id="email" 
                text="Email" 
                value={email} 
                onChange={setEmail} 
                error={errorMessages.email}
                />
            <TextInput 
                type="password" 
                id="password" 
                text="Password" 
                value={password} 
                onChange={setPassword} 
                error={errorMessages.password}
                />
            <TextInput 
                type="password" 
                id="vpassword" 
                text="Confirm Password" 
                value={confirmPassword} 
                onChange={setConfirmPassword} 
                error={errorMessages.vpassword}
            />
           <ButtonContainer>
                <Button type="submit" main="true" text="Sign Up" onClick={handleSubmit} />
                <Button text="Cancel" onClick={onCancel} />
           </ButtonContainer>
        </ Form>
    )
}