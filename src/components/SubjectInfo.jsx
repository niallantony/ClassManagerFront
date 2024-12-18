const backendUrl = import.meta.env.VITE_BACKEND_URL
import { useEffect, useState } from "react"

export function SubjectInfo ({id}) {
    const [subject, setSubject] = useState({})
    const [error, setError] = useState({})
    
    useEffect(() => {
        fetch(`${backendUrl}/subjects/subject/${id}`, {
            method:"GET",
            credentials:'include'
        })
        .then(res => res.json())
        .then(res => {
            setSubject(res.subject);
            setError(res.error);
        })

    },[id])

    return (<div>
        <h1>{subject.name}</h1>
        <p>{subject.textbook}</p>
    </div>)
}