import { useState, useEffect } from 'react'

const backendUrl = import.meta.env.VITE_BACKEND_URL
import styled from 'styled-components'
import { Header1 } from '../components/Header';
import { ButtonContainer } from '../components/ButtonContainer';
import { Button, NavButton } from '../components/Button';
import { useParams } from 'react-router-dom';
import { ErrorDiv } from '../components/Form';
import { Modal } from '../components/Modal';
import { InfoTag } from '../components/Tags';
import { AddButton, DeleteButton, EditButton, Explorer, ExplorerView, RowInfo, StyledAddRow } from '../components/Explorer';
import { AddStudent } from './Students';
import { InfoLayout } from '../components/Layout';
import { Card, InfoList, ListLabel } from '../components/Card';


export const LessonDiv = styled.div`
  display:flex;
  flexDirection: 'column',
`;

export function LessonPageSide({ lesson_id, editLesson, onDelete }) {
  const [lesson, setLesson] = useState({})
  const [error, setError] = useState(null)
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    fetch(`${backendUrl}/lessons/lesson/${lesson_id}`, {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then(res => {
        setLesson(res.lesson)
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  const handleEdit = () => {
    editLesson(lesson)
  }

  const handleDelete = async () => {
    fetch(`${backendUrl}/lessons/lesson/${lesson_id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === "Successful") {
          onDelete()
        } else if (res.message === "Unsuccessful") {
          setError(res.errors)
        }
      })
  }

  const triggerConfirm = () => {
    setConfirm(true)
  }

  const closeModal = () => {
    setConfirm(false)
  }

  return (
    <>
      {error && (
        <ErrorDiv>
          {error}
        </ErrorDiv>
      )}
      {confirm && (
        <Modal>
          Confirm Deletion?
          <ButtonContainer>
            <Button type="submit" onClick={handleDelete} >Delete</Button>
            <Button type="button" onClick={closeModal} >Cancel</Button>
          </ButtonContainer>
        </Modal>)}
      <Header1 under={true}>
        {lesson.name}
      </Header1>
      {lesson.forceactive ? (<InfoTag>Active</InfoTag>) : (<InfoTag color="red">Inactive</InfoTag>)}
      <InfoList>
        <ListLabel>Subject: </ListLabel> <li>{lesson.subjects && lesson.subjects.name}</li>
        <ListLabel>Classroom:</ListLabel><li> {lesson.classroom}</li>
        <ListLabel>Attendance:</ListLabel><li> {lesson.attendance}</li>
        <ListLabel>Year / Semester:</ListLabel><li> {lesson.year} / {lesson.semester}</li>
        <ListLabel>Class starts:</ListLabel><li> {new Date(lesson.class_start).toTimeString().substring(0, 5)}</li>
      </InfoList>
      <ButtonContainer>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={triggerConfirm}>Delete</Button>
        <NavButton to={`/dash/lessons/lesson/${lesson.lesson_id}`}>View</NavButton>
      </ButtonContainer>
    </>
  )
}

export function LessonPage() {
  const [lesson, setLesson] = useState({})
  const [students, setStudents] = useState([])
  const [errors, setErrors] = useState([])
  const [confirm, setConfirm] = useState(false)
  const [deleteSelection, setDeleteSelection] = useState(null)
  const [editSelection, setEditSelection] = useState(0)
  const [showAdd, setShowAdd] = useState(false)
  const params = useParams()

  useEffect(() => {
    fetch(`${backendUrl}/lessons/lesson/${params.lesson_id}`, {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then(res => {
        setLesson(res.lesson)
        console.log(res)
      })
      .catch(e => {
        setErrors(e)
      })
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [lesson])

  const fetchStudents = () => {
    fetch(`${backendUrl}/lessons/lesson/${lesson.lesson_id}/students`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(res => {
        setStudents(res.students)
      })
      .catch(e => {
        setErrors(e)
      })
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

  const closeAdd = () => {
    setShowAdd(false)
  }
  const displayError = () => {
    console.log(errors)
  }

  return (
    <InfoLayout>
      <Card>
        <Header1 under={true}>
          {lesson.name}
        </Header1>
        {lesson.forceactive ? (<InfoTag>Active</InfoTag>) : (<InfoTag color="red">Inactive</InfoTag>)}
        <InfoList>
          <ListLabel>Subject: </ListLabel> <li>{lesson.subjects && lesson.subjects.name}</li>
          <ListLabel>Classroom:</ListLabel><li> {lesson.classroom}</li>
          <ListLabel>Attendance:</ListLabel><li> {lesson.attendance}</li>
          <ListLabel>Year / Semester:</ListLabel><li> {lesson.year} / {lesson.semester}</li>
          <ListLabel>Class starts:</ListLabel><li> {new Date(lesson.class_start).toTimeString().substring(0, 5)}</li>
        </InfoList>
      </Card>
      <div>
        <Explorer>
          {confirm && (
            <Modal>
              Delete Student {deleteSelection && deleteSelection.name}?
              <ButtonContainer>
                <Button type="submit" onClick={handleDelete} >Delete</Button>
                <Button type="button" onClick={closeModal} >Cancel</Button>
              </ButtonContainer>
            </Modal>)}
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
                  lesson_id={lesson.lesson_id}
                />) :
                (<AddButton wide={true} onClick={() => setShowAdd(true)} />)
              }
            </StyledAddRow>
          </ExplorerView>

        </Explorer>
      </div>
    </InfoLayout>
  )
}
