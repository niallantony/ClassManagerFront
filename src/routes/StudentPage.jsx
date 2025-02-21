import { useEffect, useState } from "react"
import { Header1 } from "../components/Header"
import { Card, InfoList, ListLabel } from "../components/Card"
import { ButtonContainer } from "../components/ButtonContainer"
import { NavButton } from "../components/Button"
import { InfoLayout } from "../components/Layout"
import { useParams } from "react-router-dom"
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
  const params = useParams()

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
      })
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
          </>)
        }
      </Card>
    </InfoLayout>
  )

}
