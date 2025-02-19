import { useState, useEffect } from 'react'
import { SlideOut } from '../components/SlideOut'
import { AddNewButton, Table, TableRow } from "../components/Table"
import { EditLesson, NewLesson } from './NewLesson'
import { LessonPageSide } from './LessonPage'
import { SelectInput } from '../components/Form'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export function Lessons() {
  const [slideContent, setSlideContent] = useState(<></>)
  const [lessons, setLessons] = useState([])
  const [hidden, setHidden] = useState(true)
  const [active, setActive] = useState(true)

  useEffect(() => {
    const query = active ? '' : '?find=all';
    console.log(query)
    fetch(`${backendUrl}/lessons${query}`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then((res) => {
        if (res.lessons) {
          console.log(res.lessons)
          setLessons(res.lessons)
        }
      }
      )

  }, [slideContent, active])

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

  const changeView = (value) => {
    console.log(value)
    if (value === 'active') {
      setActive(true)
    } else if (value === 'all') {
      setActive(false)
    }
  }

  return (<div className='lessons-table'>
    <SelectInput
      text="Show"
      id="show"
      options={[
        { value: "active" },
        { value: "all" }
      ]}
      onChange={changeView}
    />
    < Table headers={[{ name: "Name" }, { name: "Year/Semester" }, { name: "Subject" }, { name: "Students", width: "10%" }]} >
      {lessons && lessons.map((lesson) => {
        return (
          <TableRow
            key={lesson.lesson_id}
            headers={["name", "year_semester", "subject", "students"]}
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
