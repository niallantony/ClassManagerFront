import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
const backendUrl = import.meta.env.VITE_BACKEND_URL
import { Header1, Header2 } from '../components/Header'
import { Table, TableRow } from "../components/Table"
import styled from "styled-components"
import { SlideOut } from "../components/SlideOut"
import { WeekInfo } from "../components/WeekInfo"

const SubjectDiv = styled.div`
    display: flex;
    flex-direction: column;
`

export function SubjectPage({ }) {
    const [subject, setSubject] = useState({})
    const params = useParams()
    const [hidden, setHidden] = useState(true)
    const [slideContent, setSlideContent] = useState(<></>)
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`${backendUrl}/subjects/subject/${params.subject_id}`, {
            method: "GET",
            credentials: 'include',
        })
            .then(res => {
                if (res.status === 400) {
                    throw new Error("Subject not found")
                }
                return res.json()
            })
            .then(res => {
                setSubject(res.subject)
                console.log(res)
            })
            .catch(e => {
                console.log(e)
                navigate('/dash/subjects/notfound')
            })
    }, [])

    const handleClick = (week) => {
        setHidden(false)
        setSlideContent(<WeekInfo week={week} subject={subject.subject_id} />)
    }

    const closeSlide = () => {
        setHidden(true)
        setSlideContent(<></>)
    }
    return (<SubjectDiv>
        <Header1 under={true}>
            {subject.name}
        </Header1>
        <Header2>
            {subject.textbook}
        </Header2>
        <p>{subject.subj_week && subject.subj_week.length} week course</p>
        <p>
            {subject.description}
        </p>
        <Table headers={[{ name: "Weeks" }, { name: "Desc", width: "70%" }]}>
            {subject.subj_week && subject.subj_week.map((week) => {
                return (<TableRow
                    key={week.week}
                    headers={["week", "description"]}
                    data={week}
                    handleClick={() => handleClick(week.week)}
                />)
            })}
        </Table>
        <SlideOut closeSlide={closeSlide} hidden={hidden}>
            {slideContent}
        </SlideOut>
    </SubjectDiv>)
}
