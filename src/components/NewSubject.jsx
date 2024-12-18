import { Button } from './Button.jsx';
import { ButtonContainer } from './ButtonContainer.jsx';
import { Form, TextInput } from './Form.jsx'
import { useState } from "react";

export function NewSubject({cancel, errors, subjectSubmit}) {
    const [name, setName] = useState("")
    const [textbook, setTextbook] = useState("")
    const handleSubmit = () => {
        subjectSubmit(name, textbook)
    }
    return (
        <>
            <Form >
                <TextInput
                    type='text'
                    id='name'
                    text="Name"
                    value={name}
                    onChange={setName}
                    error={errors.name}
                    />
                <TextInput
                    type='text'
                    id='textbook'
                    text="Textbook"
                    value={textbook}
                    onChange={setTextbook}
                    error={errors.textbook}
                    />
                <ButtonContainer>
                    <Button main='true' type='button' text='Add' onClick={handleSubmit}/>
                    <Button type='button' text='Cancel' onClick={cancel}/>
                </ButtonContainer>
            </Form> 
        </>
    )
}