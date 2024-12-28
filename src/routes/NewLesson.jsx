import { SelectInput } from '../components/Form.jsx';
import { MainButton } from '../components/Button.jsx';
import { ButtonContainer } from '../components/ButtonContainer.jsx';
import { Form, TextArea, TextInput } from '../components/Form.jsx'
import { useEffect, useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL

export function NewLesson({ lessonSubmit }) {
  const [name, setName] = useState("")
  const [subject, setSubject] = useState("")
  const [subjects, setSubjects] = useState([])
  const [year, setYear] = useState("")
  const [semester, setSemester] = useState("")
  const [classStart, setClassStart] = useState("09:00")
  const [classroom, setClassroom] = useState("")
  const [attendance, setAttendance] = useState("")
  const [errors, setErrors] = useState([])
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    fetch(`${backendUrl}/subjects/names`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(res => {
        setSubjects(res.subjects)
      })
      .catch(e => {
        console.log(e)
      })

  }, [])


  const handleSubmit = async () => {
    fetch(`${backendUrl}/lessons/new`, {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        subject_id: subject,
        year: year,
        semester: semester,
        class_start: classStart,
        classroom: classroom,
        attendance: attendance,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
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
          lessonSubmit()
        } else {
          if (res.errors.length > 0) {
            setErrorMessages(res.errors)
          }
          else if (res.error.code === "P2002") {
            setErrorMessages({ name: "Lesson Already Exists" })
          }
        }
      })
  }

  useEffect(() => {
    const messages = {}
    Object.values(errors).forEach((error) => {
      messages[error.path] = error.msg
    })
    setErrorMessages(messages)
  }, [errors])

  return (
    <>
      <h2>New Lesson</h2>
      <Form >
        <TextInput
          type='text'
          id='name'
          text="Name"
          value={name}
          onChange={setName}
          error={errorMessages.name}
        />
        <TextInput
          type='text'
          id='year'
          text="Year"
          value={year}
          onChange={setYear}
          error={errorMessages.year}
        />
        <TextInput
          type='number'
          id='semester'
          text="Semester"
          value={semester}
          onChange={setSemester}
          error={errorMessages.semester}
        />
        <TextInput
          type='time'
          id='class_start'
          text="Class Start"
          value={classStart}
          onChange={setClassStart}
          error={errorMessages.class_start}
        />
        <TextInput
          type='number'
          id='attendance'
          text="Attendance"
          value={attendance}
          onChange={setAttendance}
          error={errorMessages.attendance}
        />
        <TextInput
          type='text'
          id='classroom'
          text="Classroom"
          value={classroom}
          onChange={setClassroom}
          error={errorMessages.classroom}
        />
        <SelectInput
          text='Subject'
          value={subject}
          id='subject'
          options={subjects}
          onChange={setSubject}
          error={errorMessages.subject}
        />
        <ButtonContainer>
          <MainButton type='button' onClick={handleSubmit} >Add</MainButton>
        </ButtonContainer>
      </Form>
    </>
  )
}

// TODO: Include
export function EditLesson({
  lessonSubmit,
  currentdetails
}) {
  const [name, setName] = useState(currentdetails.name)
  const [classStart, setClassStart] = useState(new Date(currentdetails.class_start).toTimeString().substring(0, 5))
  const [classroom, setClassroom] = useState(currentdetails.classroom)
  const [attendance, setAttendance] = useState(currentdetails.attendance)
  const [errors, setErrors] = useState([])
  const [errorMessages, setErrorMessages] = useState([])


  const handleSubmit = async () => {
    fetch(`${backendUrl}/lessons/lesson/${currentdetails.lesson_id}`, {
      method: "PUT",
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        class_start: classStart,
        classroom: classroom,
        attendance: attendance,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
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
          lessonSubmit()
        } else {
          if (res.errors.length > 0) {
            setErrorMessages(res.errors)
          }
          else if (res.errors.code === "P2002") {
            setErrorMessages({ name: "Lesson Already Exists" })
          }
        }
      })
  }

  useEffect(() => {
    const messages = {}
    Object.values(errors).forEach((error) => {
      messages[error.path] = error.msg
    })
    setErrorMessages(messages)
  }, [errors])

  return (
    <>
      <h2>Edit Lesson</h2>
      <Form >
        <TextInput
          type='text'
          id='name'
          text="Name"
          value={name}
          onChange={setName}
          error={errorMessages.name}
        />
        <TextInput
          type='text'
          id='year'
          text="Year"
          disabled={true}
          value={currentdetails.year}
          error={errorMessages.year}
        />
        <TextInput
          type='number'
          id='semester'
          text="Semester"
          disabled={true}
          value={currentdetails.semester}
          error={errorMessages.semester}
        />
        <TextInput
          type='time'
          id='class_start'
          text="Class Start"
          value={classStart}
          onChange={setClassStart}
          error={errorMessages.class_start}
        />
        <TextInput
          type='number'
          id='attendance'
          text="Attendance"
          value={attendance}
          onChange={setAttendance}
          error={errorMessages.attendance}
        />
        <TextInput
          type='text'
          id='classroom'
          text="Classroom"
          value={classroom}
          onChange={setClassroom}
          error={errorMessages.classroom}
        />
        <SelectInput
          text='Subject'
          value={currentdetails.subjects.name}
          id='subject'
          options={[{ value: currentdetails.subjects.name }]}
          disabled={true}
          error={errorMessages.subject}
        />
        <ButtonContainer>
          <MainButton type='button' onClick={handleSubmit} >Add</MainButton>
        </ButtonContainer>
      </Form>
    </>
  )
}
