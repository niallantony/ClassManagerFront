import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
const backendUrl = import.meta.env.VITE_BACKEND_URL
import { Header1 } from '../components/Header'
import { Table, TableRow } from "../components/Table"
import { SlideOut } from "../components/SlideOut"
import { WeekInfo } from "../components/WeekInfo"
import { EditExam, NewExam } from "../routes/Exams"
import { ExamPageSide } from "../components/ExamInfo"
import { Card, Expandable, InfoList, ListLabel } from "../components/Card"
import { InfoLayout } from "../components/Layout"

export function SubjectPage({ }) {
  const [subject, setSubject] = useState({})
  const params = useParams()
  const [hidden, setHidden] = useState(true)
  const [slideContent, setSlideContent] = useState(<></>)
  useEffect(() => {
    fetchSubject()
  }, [])

  const handleClick = (week) => {
    setHidden(false)
    setSlideContent(<WeekInfo week={week} viewExam={(exam_id) => handleViewExam(exam_id)} newExam={(week) => handleExam(week, subject.subject_id)} subject={subject.subject_id} />)
  }

  const fetchSubject = () => {
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
      })
      .catch(e => {
        console.log(e)
      })
  }

  const handleViewExam = (exam_id) => {
    setSlideContent(<ExamPageSide exam_id={exam_id} editExam={() => handleEditExam(exam_id)} onDelete={closeSlide} />)
  }

  const handleEditExam = (exam_id) => {
    setSlideContent(<EditExam exam={exam_id} examSubmit={closeSlide} />)
  }

  const handleExam = (week, subject) => {
    setSlideContent(<NewExam currentSubject={subject} currentWeek={week} submit={closeSlide} />)
  }

  const closeSlide = () => {
    setHidden(true)
    setSlideContent(<></>)
    fetchSubject()
  }

  console.log(subject.textbook)
  return (<InfoLayout>
    <Card>
      <Header1 under={true}>
        {subject.name}
      </Header1>
      <InfoList>
        <ListLabel>Subject:</ListLabel><li> {subject.textbook}</li>
        <ListLabel>Duration:</ListLabel><li> {subject.subj_week && subject.subj_week.length} week course</li>
        <ListLabel>Description:</ListLabel><Expandable> {subject.description}</Expandable>
      </InfoList>
    </Card>
    <Table headers={[{ name: "Week", width: "5%" }, { name: "Desc", width: "60%" }, { name: "Exam" }]}>
      {subject.subj_week && subject.subj_week.map((week) => {
        return (<TableRow
          key={week.week}
          headers={["week", "description", "exam.name"]}
          data={week}
          handleClick={() => handleClick(week.week)}
        />)
      })}
    </Table>
    <SlideOut closeSlide={closeSlide} hidden={hidden}>
      {slideContent}
    </SlideOut>
  </InfoLayout>)
}
