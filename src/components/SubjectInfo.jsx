const backendUrl = import.meta.env.VITE_BACKEND_URL
import { useEffect, useState } from "react"
import { Button, NavButton } from "./Button"
import { ButtonContainer } from "./ButtonContainer"
import { Modal } from "./Modal"

export function SubjectInfo({ id, deleteSubject, editSubject }) {
    const [subject, setSubject] = useState({})
    const [confirm, setConfirm] = useState(false)
    const url = `/dash/subjects/subject/${subject.subject_id}`

    useEffect(() => {
        fetch(`${backendUrl}/subjects/subject/${id}`, {
            method: "GET",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                setSubject(res.subject);
            })

    }, [id])

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
                    <Button type="submit" onClick={handleDelete} >Delete</Button>
                    <Button type="button" onClick={closeModal} >Cancel</Button>
                </ButtonContainer>
            </Modal>)}
        <ButtonContainer>
            <NavButton to={url}>View</NavButton>
            <Button type="button" onClick={confirmDeletion} >Delete</Button>
            <Button type="button" onClick={handleEdit} >Edit</Button>
        </ButtonContainer>
    </div>)
}
