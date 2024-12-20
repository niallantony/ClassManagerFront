import { useState, useEffect } from "react"
import { useParams } from "react-router"
const backendUrl = import.meta.env.VITE_BACKEND_URL

export function SubjectPage({ }) {
    const [subject, setSubject] = useState({})
    const params = useParams()
    useEffect(() => {
        fetch(`${backendUrl}/subjects/subject/${params.subject_id}`, {
            method: "GET",
            credentials: 'include',
        })
            .then(res => res.json())
            .then(res => {
                setSubject(res.subject)
            })
    }, [])
    console.log(subject.exams)

    return (<div>
        <h1>{subject.name}</h1>
        <p>{subject.textbook}</p>

    </div>)
}
