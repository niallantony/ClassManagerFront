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
  const [classStart, setClassStart] = useState("")
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

export function EditLesson({ lessonSubmit, currentId, currentName, currentTextbook, currentDescription }) {
  const [name, setName] = useState(currentName)
  const [textbook, setTextbook] = useState(currentTextbook)
  const [description, setDescription] = useState(currentDescription)
  const [errors, setErrors] = useState([])
  const [errorMessages, setErrorMessages] = useState([])

  const handleSubmit = async () => {
    fetch(`${backendUrl}/lessons/lesson/${currentId}`, {
      method: "PUT",
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        textbook: textbook,
        description: description,
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
          id='textbook'
          text="Textbook"
          value={textbook}
          onChange={setTextbook}
          error={errorMessages.textbook}
        />
        <TextArea
          id='description'
          rows='4'
          text="Description"
          value={description}
          onChange={setDescription}
          error={errorMessages.description}
        />
        <ButtonContainer>
          <MainButton type='button' onClick={handleSubmit}>Submit</MainButton>
        </ButtonContainer>
      </Form>
    </>
  )
}
