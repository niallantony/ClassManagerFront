import { useState, useEffect } from 'react'
import { SlideOut } from '../components/SlideOut'
import { AddNewButton, Table, TableRow } from "../components/Table"
import { EditLesson, NewLesson } from './NewLesson'
import { LessonPageSide } from './LessonPage'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export function Lessons() {
  const [slideContent, setSlideContent] = useState(<></>)
  const [lessons, setLessons] = useState([])
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    fetch(`${backendUrl}/lessons`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then((res) => {
        if (res.lessons) {
          setLessons(res.lessons)
        }
      })

  }, [slideContent])

  const handleLesson = (lesson_id) => {
    setSlideContent(<LessonPageSide editLesson={handleEdit} onDelete={handleSubmit} lesson_id={lesson_id} />)
    setHidden(false)
  }

  const handleEdit = (lesson) => {
    setSlideContent(<EditLesson lessonSubmit={handleSubmit} currentdetails={lesson} />)
    setHidden(false)
  }

  const handleSubmit = () => {
    setSlideContent(<></>)
    setHidden(true)
  }

  const handleNew = () => {
    setSlideContent(<NewLesson lessonSubmit={handleSubmit} />)
    setHidden(false)
  }

  return (<div className='lessons-table'>
    < Table headers={[{ name: "Name" }, { name: "Year/Semester" }, { name: "Subject" }, { name: "Students" }]} >
      {lessons && lessons.map((lesson) => {
        return (
          <TableRow
            key={lesson.lesson_id}
            headers={["name", "year_semester", "subject", "student_count"]}
            data={lesson}
            handleClick={() => handleLesson(lesson.lesson_id)}
          />
        )
      })}
      <AddNewButton width='4' handleNew={handleNew} />
    </Table>
    <SlideOut closeSlide={() => setHidden(true)} hidden={hidden}>
      {slideContent}
    </SlideOut>
  </div>)
}
