import { useState, useEffect } from "react"
import { EditSubject, NewSubject } from "../components/NewSubject"
import { SlideOut } from '../components/SlideOut'
const backendUrl = import.meta.env.VITE_BACKEND_URL
import '../components/Table.css'
import { AddNewButton, Table, TableRow } from "../components/Table"
import { SubjectInfo } from "../components/SubjectInfo"

export function Subjects() {
    const [subjects, setSubjects] = useState([])
    const [visible, setVisible] = useState(false)
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
    },[visible])
    


    const handleNew = () => {
        setSlideContent(
            <NewSubject cancel={closeNew} subjectSubmit={handleSubmit}/> 
        )
        setVisible(true)
    }

    const handleSubmit = () => {
        setVisible(false)
        setSlideContent(<></>)
    }


    const closeNew = () => {
        setVisible(false)
    }
    const handleSubject = (id) => {
        setSlideContent(<SubjectInfo id={id} deleteSubject={deleteSubject} editSubject={editSubject} /> )
        setVisible(true)
    }
    
    const editSubject = (subject) => {
        setSlideContent(< EditSubject 
            currentId={subject.subject_id}
            currentName={subject.name}
            currentTextbook={subject.textbook}
            subjectSubmit={handleSubmit}
            cancel={closeNew}
            />)
    }

    const deleteSubject = async (subject) => {
        fetch(`${backendUrl}/subjects/subject/${subject.subject_id}`, {
            method:"DELETE",
            credentials:"include",
        })
        .then(res => res.json())
        .then(res => {
            if (res.message === "Successful") {
                handleSubmit()
            }
        })
            
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