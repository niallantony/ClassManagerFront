import { useState, useEffect } from 'react'
import '../App.css'
import { Form, TextInput} from '../components/Form'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { ButtonContainer } from '../components/ButtonContainer'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export function Login({onCancel}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setVisible(true)
    },[])

    const submit = async ( event ) => {
        await fetch(`${backendUrl}/user/login`, {
            method:"POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            credentials:'include',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then((response) => {
            if (response.statusText === "OK") {
                console.log(response)
                navigate('/dash')
            } else {
                response.json()
            }
        })
        .then(response => console.log(response))
        .catch(e => console.log(e))
        
    }

    return (
        <Form method="POST">
            <div className={visible ? 'login animate-open' : 'login animate-close'}>
                <TextInput id="email" text="Email:" onChange={setEmail} value={email} />
                <TextInput id="password" text="Password:" type="password" onChange={setPassword} value={password}/>
            </div>
            <ButtonContainer>
                <Button text="Submit" type="submit" onClick={submit} />
                <Button text="Cancel" onClick={onCancel} />
            </ButtonContainer>
        </Form>
    )
}