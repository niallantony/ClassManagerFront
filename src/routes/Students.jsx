const backendUrl = import.meta.env.VITE_BACKEND_URL
import { useEffect, useState } from "react";
import { AddButton, AddRow, DeleteButton, EditButton, Explorer, ExplorerSelect, ExplorerSelectChoice, ExplorerView, RowInfo, StyledAddRow, ViewInput } from "../components/Explorer";
import { Modal } from "../components/Modal";
import { ButtonContainer } from "../components/ButtonContainer";
import { Button } from "../components/Button";

export function StudentExplorer() {

  const [lessons, setLessons] = useState([])
  const [selected, setSelected] = useState(0)
  const [showAdd, setShowAdd] = useState(false)
  const [students, setStudents] = useState([])
  const [confirm, setConfirm] = useState(false)
  const [deleteSelection, setDeleteSelection] = useState(null)
  const [editSelection, setEditSelection] = useState(0)

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

  const triggerConfirm = (id) => {
    setConfirm(true)
    setDeleteSelection(id)
  }

  const closeModal = () => {
    setConfirm(false)
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

  const handleDelete = () => {
    fetch(`${backendUrl}/students/student/${deleteSelection.student_id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(res => res.json())
      .then(() => {
        fetchStudents()
      })
      .finally(() => {
        setDeleteSelection(null)
        closeModal()
      })
  }

  const handleEdit = (student) => {
    setShowAdd(false)
    setEditSelection(student)
  }

  const handleEditSubmit = () => {
    setEditSelection(0)
    fetchStudents()
  }


  return (
    <Explorer>
      {confirm && (
        <Modal>
          Delete Student {deleteSelection && deleteSelection.name}?
          <ButtonContainer>
            <Button type="submit" onClick={handleDelete} >Delete</Button>
            <Button type="button" onClick={closeModal} >Cancel</Button>
          </ButtonContainer>
        </Modal>)}
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
          if (student.student_id === editSelection) {
            return (
              <StyledAddRow>
                <AddStudent
                  key={student.student_id}
                  method="put"
                  onSubmit={handleEditSubmit}
                  onClose={() => setEditSelection(null)}
                  onError={displayError}
                  lesson_id={selected}
                  existingName={student.name}
                  existingId={student.student_id}
                />
              </StyledAddRow>
            )
          }
          return (
            <RowInfo key={student.student_id}>
              <p>{student.student_id}</p>
              <p>{student.name}</p>
              <EditButton onClick={() => handleEdit(student.student_id)} />
              <DeleteButton onClick={() => triggerConfirm(student)} />
            </RowInfo>)
        })}
        <StyledAddRow>
          {showAdd ?
            (<AddStudent
              method="post"
              onSubmit={handleSubmit}
              onClose={closeAdd}
              onError={displayError}
              lesson_id={selected}
            />) :
            (<AddButton wide={true} onClick={() => setShowAdd(true)} />)
          }
        </StyledAddRow>
      </ExplorerView>
    </Explorer>
  )
}

export function AddStudent({ method, onError, onClose, onSubmit, lesson_id, existingName = "", existingId = "" }) {
  const [name, setName] = useState(existingName)
  const [studentId, setStudentId] = useState(existingId)

  const handlePost = () => {
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

  const handlePut = () => {
    fetch(`${backendUrl}/students/student/${studentId}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        name: name,
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
    <AddRow onCancel={onClose} onSubmit={method === 'post' ? handlePost : handlePut}>
      <ViewInput
        disabled={method === 'put'}
        id="student_id"
        name="ID"
        value={studentId}
        onChange={setStudentId}
      />
      <ViewInput
        id="name"
        name="Name"
        value={name}
        onChange={setName}
      />
    </AddRow>
  )
}
