import { useState, useEffect } from "react"
import { v4 as uuid } from 'uuid'
import { NewSubject } from "../components/NewSubject"
const backendUrl = import.meta.env.VITE_BACKEND_URL
import '../components/Table.css'

export function Subjects() {
    const [subjects, setSubjects] = useState([])
    const [newVisible, setNewVisible] = useState(false)
    const [errors, setErrors] = useState([])
    const [errorMessages, setErrorMessages] = useState({})
    const [newSubjects, setNewSubjects] = useState([])

    useEffect(() => {
        fetch(`${backendUrl}/subjects`, {
            method:"GET",
            credentials:'include',
        })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            if (res.subjects) {
                setSubjects(res.subjects)
            }
        })
    },[])

    useEffect(() => {
        fetch(`${backendUrl}/subjects`, {
            method:"GET",
            credentials:'include',
        })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            if (res.subjects) {
                setSubjects(res.subjects)
            }
        })
    },[newSubjects])
    
    useEffect(() => {
        const messages = {}
        Object.values(errors).forEach((error) => {
            messages[error.path] = error.msg
        })
        setErrorMessages(messages)
    },[errors])

    const handleNew = () => {
        setNewVisible(true)
    }

    const handleSubmit = async (name, textbook) => {
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
                setNewVisible(false)
                setNewSubjects([...newSubjects, 1])
            } else {
                if (res.error.code === "P2002") {
                    setErrorMessages({name:"Subject Already Exists"})
                }
            }
        })
    }

    const closeNew = () => {
        setNewVisible(false)
        setErrorMessages({})
    }
    const handleSubject = () => {

    }

    return (<div className="subjects-table">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Textbook</th>
                </tr>
            </thead>
            <tbody>
            {subjects && subjects.map(subject => {
                return (<tr key={uuid()} onClick={handleSubject}>
                            <td>{subject.name}</td>
                            <td>{subject.textbook}</td>
                        </tr>)
            })}
            {newVisible ? <NewSubject errors={errorMessages} cancel={closeNew} subjectSubmit={handleSubmit}/> :
                (<tr className="addnew" onClick={handleNew}>
                    <td colSpan="2">Add new...</td>
                </tr>)
            }
            </tbody>
        </table>
    </div>)
}