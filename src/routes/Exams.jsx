import { useEffect, useState } from 'react'
import { Form, SelectInput, TextInput } from '../components/Form'
import { MainButton } from '../components/Button'
import { ButtonContainer } from '../components/ButtonContainer'
import { Header1 } from '../components/Header'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export function NewExam({ submit, currentSubject, currentWeek }) {
  const [name, setName] = useState("")
  const [marks, setMarks] = useState("")
  const [subjects, setSubjects] = useState([])
  const [subject, setSubject] = useState(currentSubject)
  const [type, setType] = useState("")
  const [week, setWeek] = useState(currentWeek)
  const [weeks, setWeeks] = useState([])
  const [percent, setPercent] = useState("0")
  const [errors, setErrors] = useState([])
  const [errorMessages, setErrorMessages] = useState([])


  useEffect(() => {
    fetch(`${backendUrl}/subjects/names`, {
      method: "GET",
      credentials: 'include',
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.subjects) {
          setSubjects(res.subjects)
        }
      })
  }, [])

  useEffect(() => {
    fetch(`${backendUrl}/subjects/subject/${subject}/weeks`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setWeeks(res.weeks)
      })
  }, [subject])


  const handleSubmit = () => {
    fetch(`${backendUrl}/subjects/subject/${subject}/new-exam`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        name: name,
        marks: marks,
        subject_id: subject,
        type: type,
        week: week,
        percent: percent,
      }),
      headers: {
        "Content-type": 'application/json; charset=UTF-8'
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          setErrors(res.errors)
        }
        else if (res.error?.code && res.error.code === 'P2002') {
          setErrorMessages({ name: "Exam already Exists" })
        }
        submit()
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
      <Header1>New Exam</Header1>
      <Form>
        <TextInput
          type='text'
          id='name'
          text="Name"
          value={name}
          onChange={setName}
          error={errorMessages.name}
        />
        <TextInput
          type='number'
          id='marks'
          text="Marks"
          value={marks}
          onChange={setMarks}
          error={errorMessages.marks}
        />
        <TextInput
          type='number'
          id='percent'
          text="Percent"
          value={percent}
          onChange={setPercent}
          error={errorMessages.percent}
        />
        <SelectInput
          id='subject'
          text="Subject"
          value={subject}
          options={subjects}
          onChange={setSubject}
          error={errorMessages.subject}
        />
        <SelectInput
          id='type'
          value={type}
          text="Type"
          options={[
            { value: "Exam", name: "Exam" },
            { value: "Assignment", name: "Assignment" },
          ]}
          onChange={setType}
          error={errorMessages.type}
        />
        <SelectInput
          id='week'
          text="Week"
          value={week}
          options={weeks}
          onChange={setWeek}
          error={errorMessages.week}
        />
        <ButtonContainer>
          <MainButton type='button' onClick={handleSubmit} >Add</MainButton>
        </ButtonContainer>
      </Form>
    </>)
}


export function EditExam({
  examSubmit,
  exam
}) {
  const [name, setName] = useState("")
  const [marks, setMarks] = useState("")
  const [percent, setPercent] = useState("")
  const [type, setType] = useState("")
  const [week, setWeek] = useState("")
  const [errors, setErrors] = useState([])
  const [errorMessages, setErrorMessages] = useState([])
  const [subject, setSubject] = useState("")
  const [weeks, setWeeks] = useState([])


  const handleSubmit = async () => {
    fetch(`${backendUrl}/subjects/exam/${exam}`, {
      method: "PUT",
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        marks: marks,
        percent: percent,
        type: type,
        week: week,
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
          examSubmit()
        } else {
          if (res.errors.length > 0) {
            setErrorMessages(res.errors)
          }
        }
      })
  }


  useEffect(() => {
    fetch(`${backendUrl}/subjects/exam/${exam}`, {
      method: "GET",
      credentials: 'include',
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.exam) {
          setName(res.exam.name)
          setMarks(res.exam.marks)
          setPercent(res.exam.percent)
          setType(res.exam.type)
          setWeek(res.exam.week)
          setSubject(res.exam.subject_id)
        }
      })
  }, [])

  useEffect(() => {
    fetch(`${backendUrl}/subjects/subject/${subject}/weeks`, {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        setWeeks(res.weeks)
      })
  }, [subject])


  useEffect(() => {
    const messages = {}
    Object.values(errors).forEach((error) => {
      messages[error.path] = error.msg
    })
    setErrorMessages(messages)
  }, [errors])

  return (
    <>
      <h2>Edit Exam</h2>
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
          id='marks'
          text="Marks"
          value={marks}
          error={errorMessages.marks}
          onChange={setMarks}
        />
        <TextInput
          type='percent'
          id='percent'
          text="Percent"
          value={percent}
          error={errorMessages.percent}
          onChange={setPercent}
        />
        <SelectInput
          id='type'
          value={type}
          text="Type"
          options={[
            { value: "Exam", name: "Exam" },
            { value: "Assignment", name: "Assignment" },
          ]}
          onChange={setType}
          error={errorMessages.type}
        />
        <SelectInput
          id='week'
          text="Week"
          value={week}
          options={weeks}
          onChange={setWeek}
          error={errorMessages.week}
        />
        <ButtonContainer>
          <MainButton type='button' onClick={handleSubmit} >Submit</MainButton>
        </ButtonContainer>
      </Form>
    </>
  )
}
