const backendUrl = import.meta.env.VITE_BACKEND_URL
import { useEffect, useState } from "react";
import { AddRow, Explorer, ExplorerSelect, ExplorerSelectChoice, ExplorerView, RowButton, RowInfo, StyledAddRow, ViewInput } from "../components/Explorer";

export function StudentExplorer() {
  const [lessons, setLessons] = useState([])
  const [selected, setSelected] = useState(0)
  const [showAdd, setShowAdd] = useState(false)
  const [students, setStudents] = useState([])

  useEffect(() => {
    fetchLessons()
  }, [])

  useEffect(() => {
    if (lessons.length > 0) {
      setSelected(lessons[0].lesson_id)
    }

  }, [lessons])

  useEffect(() => {
    fetchStudents()
  }, [selected])

  const fetchLessons = () => {
    fetch(`${backendUrl}/lessons`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(res => {
        setLessons(res.lessons)
      })

  }

  const fetchStudents = () => {
    fetch(`${backendUrl}/students/${selected}`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(res => {
        setStudents(res.students)
      })
  }

  const handleSubmit = () => {
    fetchStudents()
  }

  const handleChange = (id) => {
    setShowAdd(false)
    setSelected(id)
  }

  const closeAdd = () => {
    setShowAdd(false)
  }
  const displayError = (e) => {
    console.log(e)
  }

  return (
    <Explorer>
      <ExplorerSelect>
        {lessons.map(lesson => {
          return (
            <ExplorerSelectChoice
              active={lesson.lesson_id === selected}
              id={lesson.lesson_id}
              onClick={handleChange}
              key={lesson.lesson_id}
            >
              {lesson.name}
            </ExplorerSelectChoice>
          )
        })}
      </ExplorerSelect>
      <ExplorerView>
        {students.map(student => {
          return (
            <RowInfo key={student.student_id}>
              <p>{student.student_id}</p>
              <p>{student.name}</p>
            </RowInfo>)
        })}
        <StyledAddRow>
          {showAdd ?
            (<AddStudent onSubmit={handleSubmit} onClose={closeAdd} onError={displayError} lesson_id={selected} />) :
            (<RowButton onClick={() => setShowAdd(true)}>+</RowButton>)
          }
        </StyledAddRow>
      </ExplorerView>
    </Explorer>
  )
}

function AddStudent({ onError, onClose, onSubmit, lesson_id }) {
  const [name, setName] = useState("")
  const [studentId, setStudentId] = useState("")

  const handleSubmit = () => {
    fetch(`${backendUrl}/students/new`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        name: name,
        student_id: studentId,
        lesson_id: lesson_id,
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
          setName("")
          setStudentId("")
        }
      })
  }

  return (
    <AddRow onCancel={onClose} onSubmit={handleSubmit}>
      <ViewInput
        id="name"
        name="Name"
        value={name}
        onChange={setName}
      />
      <ViewInput
        id="student_id"
        name="ID"
        value={studentId}
        onChange={setStudentId}
      />
    </AddRow>
  )
}
