import { TableTextInput, TextInput } from './Form.jsx'
import { useState } from "react";

export function NewSubject({cancel, errors, subjectSubmit}) {
    const [name, setName] = useState("")
    const [textbook, setTextbook] = useState("")
    const handleSubmit = () => {
        subjectSubmit(name, textbook)
    }
    return (
        <>
        <tr>
            <td colSpan='2' className='form-row'>
                <div className='table-form'>
                    <TableTextInput id="name" error={errors.name} name={name} onChange={setName}/>
                    <TableTextInput id="textbook" name={errors.textbook} onChange={setTextbook}/>
                </div>
            </td>
        </tr>
        <tr>
            <td className='table-button' onClick={handleSubmit}> Submit </td>
            <td  className='table-button' onClick={cancel}> Cancel </td>
        </tr>
        </>
    )
}