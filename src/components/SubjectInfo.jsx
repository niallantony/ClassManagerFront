const backendUrl = import.meta.env.VITE_BACKEND_URL
import { useEffect, useState } from "react"
import { ButtonContainer } from "./ButtonContainer"
import { Button } from "./Button"
import { Modal } from "./Modal"

export function SubjectInfo ({id, deleteSubject, editSubject}) {
    const [subject, setSubject] = useState({})
    const [confirm, setConfirm] = useState(false)
    
    useEffect(() => {
        fetch(`${backendUrl}/subjects/subject/${id}`, {
            method:"GET",
            credentials:'include'
        })
        .then(res => res.json())
        .then(res => {
            setSubject(res.subject);
        })

    },[id])

    const handleEdit = () => {
        editSubject(subject)
    }

    const confirmDeletion = () => {
        setConfirm(true)
    }

    const handleDelete = () => {
        deleteSubject(subject)
    }

    const closeModal = () => {
        setConfirm(false)
    }

    return (<div>
        <h1>{subject.name}</h1>
        <p>{subject.textbook}</p>
        {confirm && (
        <Modal>
            Confirm Deletion?
            <ButtonContainer>
                <Button text="Delete" type="submit" onClick={handleDelete} />
                <Button text="Cancel" type="button" onClick={closeModal} />
            </ButtonContainer>
        </Modal>)}
        <ButtonContainer>
            <Button text="Delete" type="button" onClick={confirmDeletion}/>
            <Button text="Edit" type="button" onClick={handleEdit}/>
        </ButtonContainer>
    </div>)
}