import { Form, TextInput } from "../components/Form"
import { Button } from "../components/Button"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
const backendUrl = import.meta.env.VITE_BACKEND_URL

export function SignUp(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [errorMessages, setErrorMessages] = useState({})

    useEffect(() => {
        const messages = {}
        console.log(errors)
        Object.values(errors).forEach((error) => {
            messages[error.path] = error.msg
        })
        console.log(messages)
        setErrorMessages(messages)
    },[errors])
    

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
            error={errorMessages.firstname}
            />
           <TextInput 
            type="text" 
            id="lastname" 
            text="Last Name" 
            value={lastName} 
            onChange={setLastName} 
            error={errorMessages.lastname}
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
           <Button type="submit" text="Sign Up" onClick={handleSubmit} />
           <Link to='/splash'>Cancel</Link>
        </ Form>
    )
}