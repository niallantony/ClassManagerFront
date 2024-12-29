import { useState, useEffect } from 'react'

const backendUrl = import.meta.env.VITE_BACKEND_URL
import styled from 'styled-components'
import { Header1, Header2 } from '../components/Header';
import { ButtonContainer } from '../components/ButtonContainer';
import { Button, NavButton } from '../components/Button';
import { ErrorDiv } from '../components/Form';
import { Modal } from '../components/Modal';

export const LessonDiv = styled.div`
  display:flex;
  flexDirection: 'column',
`;

export function ExamPageSide({ exam_id, editExam, onDelete }) {
  const [exam, setExam] = useState({})
  const [error, setError] = useState(null)
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    fetch(`${backendUrl}/subjects/exam/${exam_id}`, {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then(res => {
        setExam(res.exam)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  const handleEdit = () => {
    editExam(exam)
  }

  const handleDelete = async () => {
    fetch(`${backendUrl}/subjects/exam/${exam_id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === "Successful") {
          onDelete()
        } else if (res.message === "Unsuccessful") {
          setError(res.errors.name)
          setConfirm(false)
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
        {exam.name}
      </Header1>
      <Header2>
        Type: {exam.type}
      </Header2>
      <ul>
        <li> Week: {exam.week} </li>
        <li>Marks: {exam.marks}</li>
        <li>Percent of Grade: {exam.percent}</li>
      </ul>
      <ButtonContainer>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={triggerConfirm}>Delete</Button>
      </ButtonContainer>
    </>
  )
}

