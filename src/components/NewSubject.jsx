import { Button, MainButton } from './Button.jsx';
import { ButtonContainer } from './ButtonContainer.jsx';
import { Form, TextInput } from './Form.jsx'
import { useEffect, useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL

export function NewSubject({cancel, subjectSubmit}){
    const [name, setName] = useState("")
    const [textbook, setTextbook] = useState("")
    const [errors, setErrors] = useState([])
    const [errorMessages, setErrorMessages] = useState([])

    const handleSubmit = async () => {
        fetch(`${backendUrl}/subjects/new`, {
            method:"POST",
            credentials: 'include',
            body:JSON.stringify({
                name:name,
                textbook:textbook,
            }),
            headers: {
                'Content-type':'application/json; charset=UTF-8'
            },

        })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            if (res.errors) {

                setErrors(res.errors)
            }
            if (res.message === "Successful") {
                subjectSubmit()
            } else {
                if (res.errors.length > 0) {
                    setErrorMessages(res.errors)
                }
                else if (res.error.code === "P2002") {
                    setErrorMessages({name:"Subject Already Exists"})
                }
            }
        })
    }

    useEffect(() => {
        const messages = {}
        Object.values(errors).forEach((error) => {
            messages[error.path] = error.msg
        })
        setErrorMessages(messages)
    },[errors])

    return (
        <>
            <h2>New Subject</h2>
            <Form >
                <TextInput
                    type='text'
                    id='name'
                    text="Name"
                    value={name}
                    onChange={setName}
                    error={errorMessages.name}
                    />
                <TextInput
                    type='text'
                    id='textbook'
                    text="Textbook"
                    value={textbook}
                    onChange={setTextbook}
                    error={errorMessages.textbook}
                    />
                <ButtonContainer>
                    <MainButton type='button' text='Add' onClick={handleSubmit}/>
                    <Button type='button' text='Cancel' onClick={cancel}/>
                </ButtonContainer>
            </Form> 
        </>
    )
}

export function EditSubject({cancel, subjectSubmit, currentId, currentName, currentTextbook}){
    const [name, setName] = useState(currentName)
    const [textbook, setTextbook] = useState(currentTextbook)
    const [errors, setErrors] = useState([])
    const [errorMessages, setErrorMessages] = useState([])

    const handleSubmit = async () => {
        fetch(`${backendUrl}/subjects/subject/${currentId}`, {
            method:"PUT",
            credentials: 'include',
            body:JSON.stringify({
                name:name,
                textbook:textbook,
            }),
            headers: {
                'Content-type':'application/json; charset=UTF-8'
            },
        })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            if (res.errors) {
                setErrors(res.errors)
            }
            if (res.message === "Successful") {
                subjectSubmit()
            } else {
                if (res.errors.length > 0) {
                    setErrorMessages(res.errors)
                }
                else if (res.error.code === "P2002") {
                    setErrorMessages({name:"Subject Already Exists"})
                }
            }
        })
    }

    useEffect(() => {
        const messages = {}
        Object.values(errors).forEach((error) => {
            messages[error.path] = error.msg
        })
        setErrorMessages(messages)
    },[errors])

    return (
        <>
            <h2>New Subject</h2>
            <Form >
                <TextInput
                    type='text'
                    id='name'
                    text="Name"
                    value={name}
                    onChange={setName}
                    error={errorMessages.name}
                    />
                <TextInput
                    type='text'
                    id='textbook'
                    text="Textbook"
                    value={textbook}
                    onChange={setTextbook}
                    error={errorMessages.textbook}
                    />
                <ButtonContainer>
                    <MainButtonButton type='button' text='Add' onClick={handleSubmit}/>
                    <Button type='button' text='Cancel' onClick={cancel}/>
                </ButtonContainer>
            </Form> 
        </>
    )
}
