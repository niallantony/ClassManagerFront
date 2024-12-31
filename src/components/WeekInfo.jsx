import { useEffect, useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL
import { MainButton, Button, NavButton, HyperLinkButton } from "./Button"
import { ButtonContainer } from "./ButtonContainer"
import { Form, TextArea } from "./Form"


export function WeekInfo({ newExam, subject, week, viewExam }) {
  const [weekData, setWeekData] = useState({})
  const [descriptionEdit, setDescriptionEdit] = useState(false)

  useEffect(() => {
    fetch(`${backendUrl}/subjects/subject/${subject}/week/${week}`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        setWeekData(res.week)
      })
  }, [descriptionEdit])

  const handleEdit = () => {
    setDescriptionEdit(true)

  }
  const handleSubmit = () => {
    setDescriptionEdit(false)
  }



  return (<div>
    <h1>Week {weekData.week}</h1>
    {descriptionEdit ? <EditWeek week={weekData.week} submit={handleSubmit} subject={subject} currentDescription={weekData.description} /> :
      (<>
        <p>{weekData.description}</p>
        <p>Exam: {weekData.exam ? (<HyperLinkButton onClick={() => viewExam(weekData.exam.exam_id)}>{weekData.exam.name}</HyperLinkButton>) :
          (<HyperLinkButton onClick={() => newExam(week)}>Add Exam</HyperLinkButton>)}</p>
        <ButtonContainer>
          <Button type="button" onClick={handleEdit} >Edit</Button>
        </ButtonContainer>
      </>)
    }

  </div>)
}

export function EditWeek({ submit, currentDescription, subject, week }) {
  const [description, setDescription] = useState(currentDescription)

  const handleSubmit = async () => {
    fetch(`${backendUrl}/subjects/subject/${subject}/week/${week}`, {
      method: "PUT",
      credentials: 'include',
      body: JSON.stringify({
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
          submit()
        } else {
          if (res.errors.length > 0) {
            setErrorMessages(res.errors)
          }
        }
      })
  }

  return (
    <>
      <Form >
        <TextArea
          id='description'
          rows='8'
          text="Description"
          value={description}
          onChange={setDescription}
        />
        <ButtonContainer>
          <MainButton type='button' onClick={handleSubmit}>Submit</MainButton>
        </ButtonContainer>
      </Form>
    </>
  )
}
