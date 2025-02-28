import { useEffect, useState } from "react"
import { Header1, Header2 } from "../components/Header"
import { Card, CardWall, EditNoteCard, InfoList, ListLabel, NoteCard } from "../components/Card"
import { ButtonContainer } from "../components/ButtonContainer"
import { Button, MainButton, NavButton } from "../components/Button"
import { InfoLayout } from "../components/Layout"
import { useParams } from "react-router-dom"
import { SlideOut } from "../components/SlideOut"
import { Form, TextArea, TextAreaNoLabel } from "../components/Form"
import { use } from "react"
const backendUrl = import.meta.env.VITE_BACKEND_URL

export function StudentSlide({ id }) {
  const [student, setStudent] = useState(null)

  useEffect(() => {
    fetch(`${backendUrl}/students/student/${id}`, {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        setStudent(res.student)
      })
  }, [])

  return (
    <>
      {student &&
        <>
          <Header1 under={true}>{student.name}</Header1>
          <InfoList>
            <ListLabel>Student ID:</ListLabel><li>{student.student_id}</li>
          </InfoList>
          <ButtonContainer>
            <NavButton to={`/dash/students/${student.student_id}`} >View</NavButton>
          </ButtonContainer>
        </>
      }
    </>
  )
}

export function StudentPage() {

  const [student, setStudent] = useState(null)
  const [slideContent, setSlideContent] = useState(<></>)
  const [hidden, setHidden] = useState(true)
  const params = useParams()
  const [notes, setNotes] = useState([])
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    fetchStudent()
  }, [])

  const fetchStudent = () => {
    fetch(`${backendUrl}/students/student/${params.student_id}`, {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((res) => {
        setStudent(res.student)
        setNotes(res.student.stud_notes)
      })
  }


  const showNoteSlide = () => {
    setSlideContent(<NoteSlide student={student} closeSlide={closeSlide} />)
    setHidden(false)
  }

  const closeSlide = () => {
    fetchStudent()
    setSlideContent(<></>)
    setHidden(true)
  }

  const handleDelete = (id) => {
    fetch(`${backendUrl}/students/note/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        fetchStudent()
      })

  }

  const handleEdit = (id) => {
    setEditing(id)

  }

  const handleEditSubmit = () => {
    setEditing(null)
    fetchStudent()
  }

  return (
    <InfoLayout>
      <Card>
        {student &&
          (<>
            <Header1>{student.name}</Header1>
            <InfoList>
              <ListLabel>Student ID:</ListLabel><li>{student.student_id}</li>
            </InfoList>
            <Button onClick={showNoteSlide}>Add Note</Button>
          </>)
        }
      </Card>
      <CardWall>
        {notes && notes.map((note) => {
          if (note.note_id === editing) {
            return (
              <EditNote
                key={note.note_id}
                note={note}
                onSubmit={handleEditSubmit}
              />
            )
          }
          return (
            <NoteCard
              key={note.note_id}
              date={note.added}
              text={note.description}
              onDelete={() => { handleDelete(note.note_id) }}
              onEdit={() => { handleEdit(note.note_id) }}
            />
          )
        })}
      </CardWall>
      <SlideOut closeSlide={closeSlide} hidden={hidden}>
        {slideContent}
      </SlideOut>
    </InfoLayout>
  )

}

const EditNote = ({ note, onSubmit }) => {
  const [value, setValue] = useState(note.description)
  const [errors, setErrors] = useState([])

  const handleSubmit = () => {
    fetch(`${backendUrl}/students/note/${note.note_id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        description: value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.errors) {
          onError(res.errors)
        } else if (res.message === "Successful") {
          onSubmit()
        }
      })
  }

  return (
    <EditNoteCard
      onSubmit={handleSubmit}
      date={note.added}
      value={value}
    >
      <TextAreaNoLabel
        value={value}
        onChange={setValue}
        id="description"
        rows="10"
        text="Student Note"
        error={errors.msg}
      />
    </EditNoteCard>
  )

}

const NoteSlide = ({ student, closeSlide }) => {
  const [noteContents, setNoteContents] = useState("")
  const [errors, setErrors] = useState([])

  const handleSubmitNote = () => {
    fetch(`${backendUrl}/students/student/${student.student_id}/note`, {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({
        description: noteContents,
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
          closeSlide()
        }
      })
  }

  return (
    <>
      <Header2>Add Note:</Header2>
      <Form>
        <TextArea
          value={noteContents}
          onChange={setNoteContents}
          id="description"
          rows="10"
          text="Student Note"
          error={errors.msg}
        />
        <ButtonContainer>
          <MainButton onClick={handleSubmitNote}>Submit</MainButton>
        </ButtonContainer>
      </Form>
    </>
  )
}
