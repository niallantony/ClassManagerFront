import { useState, useEffect } from 'react'

const backendUrl = import.meta.env.VITE_BACKEND_URL
import styled from 'styled-components'
import { Header1, Header2 } from '../components/Header';
import { ButtonContainer } from '../components/ButtonContainer';
import { Button, NavButton } from '../components/Button';
import { useParams } from 'react-router-dom';
import { ErrorDiv } from '../components/Form';
import { Modal } from '../components/Modal';


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
      <Header2>
        {lesson.subjects && lesson.subjects.name}
      </Header2>
      <ul>
        <li>Classroom: {lesson.classroom}</li>
        <li>Attendance: {lesson.attendance}</li>
        <li>Year / Semester: {lesson.year} / {lesson.semester}</li>
        <li>Class starts: {new Date(lesson.class_start).getHours()}:{new Date(lesson.class_start).getMinutes()}</li>
      </ul>
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
        console.log(e)
      })
  }, [])

  return (
    <div className='lesson-page'>
      <Header1 under={true}>
        {lesson.name}
      </Header1>
      <Header2>
        {lesson.subjects && lesson.subjects.name}
      </Header2>
      <ul>
        <li>Classroom: {lesson.classroom}</li>
        <li>Attendance: {lesson.attendance}</li>
        <li>Year / Semester: {lesson.year} / {lesson.semester}</li>
        <li>Class starts: {new Date(lesson.class_start).getHours()}:{new Date(lesson.class_start).getMinutes()}</li>
      </ul>
    </div>
  )
}
