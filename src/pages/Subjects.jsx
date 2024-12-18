import { useState, useEffect } from "react"
import { NewSubject } from "../components/NewSubject"
import { SlideOut } from '../components/SlideOut'
const backendUrl = import.meta.env.VITE_BACKEND_URL
import '../components/Table.css'
import { AddNewButton, Table, TableRow } from "../components/Table"
import { SubjectInfo } from "../components/SubjectInfo"

export function Subjects() {
    const [subjects, setSubjects] = useState([])
    const [visible, setVisible] = useState(false)
    const [errors, setErrors] = useState([])
    const [errorMessages, setErrorMessages] = useState({})
    const [newSubjects, setNewSubjects] = useState([])
    const [slideContent, setSlideContent] = useState(<></>)

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
        setSlideContent(
            <NewSubject errors={errorMessages} cancel={closeNew} subjectSubmit={handleSubmit}/> 
        )
        setVisible(true)
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
                setVisible(false)
                setNewSubjects([...newSubjects, 1])
            } else {
                if (res.error.code === "P2002") {
                    setErrorMessages({name:"Subject Already Exists"})
                }
            }
        })
    }

    const closeNew = () => {
        setVisible(false)
    }
    const handleSubject = (id) => {
        setSlideContent(<SubjectInfo id={id} /> )
        setVisible(true)

    }

    return (<div className="subjects-table">
        < Table headers={["Name","Textbook"]} >
            {subjects && subjects.map((subject) => {
                return (
                    <TableRow 
                        key={subject.subject_id}
                        headers={["name", "textbook"]}
                        data={subject}
                        handleClick={() => handleSubject(subject.subject_id)}
                        />
                )
            })}
            <AddNewButton handleNew={handleNew} />
        </Table>
        <SlideOut hidden={visible ? false : true}>
            {slideContent}
        </SlideOut>
        
    </div>)
}