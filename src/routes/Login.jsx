import { useState } from 'react'
import '../App.css'
import { ErrorDiv, Form, TextInput } from '../components/Form'
import { Button, MainButton } from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { ButtonContainer } from '../components/ButtonContainer'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export function Login({ onCancel }) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const submit = async () => {
    await fetch(`${backendUrl}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        if (response.statusText === "OK") {
          navigate('/dash')
        } else {
          console.log(response)
          return response.json()
        }
      })
      .then(res => {
        setError(res.error)
      })
      .catch(e => console.log(e))

  }

  return (
    <Form method="POST">
      <TextInput id="email" text="Email:" onChange={setEmail} value={email} />
      <TextInput id="password" text="Password:" type="password" onChange={setPassword} value={password} />
      {error && (<ErrorDiv absolute={true}>{error}</ErrorDiv>)}
      <ButtonContainer>
        <MainButton main="true" type="submit" onClick={submit}>Log In</MainButton>
        <Button onClick={onCancel} >Cancel </Button>
      </ButtonContainer>
    </Form >
  )
}
