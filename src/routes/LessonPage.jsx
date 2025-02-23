import { useState, useEffect } from 'react'

const backendUrl = import.meta.env.VITE_BACKEND_URL
import styled from 'styled-components'
import { Header1 } from '../components/Header';
import { ButtonContainer } from '../components/ButtonContainer';
import { Button, NavButton } from '../components/Button';
import { useParams } from 'react-router-dom';
import { ErrorDiv, JustInput, SelectInput, TextInput } from '../components/Form';
import { Modal } from '../components/Modal';
import { InfoTag } from '../components/Tags';
import {
  AddButton,
  DeleteButton,
  EditButton,
  Explorer,
  ExplorerView,
  ExplorerMenuOption,
  ExplorerSelect,
  ExplorerSelectMenu,
  ExplorerSelectChoice,
  RowInfo,
  StyledAddRow,
  ExamRowInfo,
  ButtonRow,
  ExplorerButton,
  ExplorerButtonBottom,
  ButtonRowBottom
} from '../components/Explorer';
import { AddStudent } from './Students';
import { InfoLayout } from '../components/Layout';
import { Card, InfoList, ListLabel } from '../components/Card';
import { StudentSlide } from './StudentPage';
import { SlideOut } from '../components/SlideOut';


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
  const params = useParams()
  const [hidden, setHidden] = useState(true)
  const [slideContent, setSlideContent] = useState(<></>)
  const [exams, setExams] = useState([])
  const [errors, setErrors] = useState([])
  const [selectView, setSelectView] = useState(<></>)
  const [selectedExam, setSelectedExam] = useState(null)
  const [view, setView] = useState(<></>)

  useEffect(() => {
    fetch(`${backendUrl}/lessons/lesson/${params.lesson_id}`, {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then(res => {
        setLesson(res.lesson)
        fetchStudents(res.lesson)
        fetchExams(res.lesson)
      })
      .catch(e => {
        setErrors(e)
      })
  }, [])

  useEffect(() => {
    returnStudentView()
  }, [students])


  const fetchStudents = (lesson) => {
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

  const refresh = () => {
    fetchStudents(lesson)
  }

  const fetchExams = (lesson) => {
    fetch(`${backendUrl}/subjects/subject/${lesson.subject_id}/exams`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(res => {
        setExams(res.exams)
      })
      .catch(e => {
        setErrors(e)
      })

  }

  const returnStudentView = () => {
    setView(
      <StudentExplorer
        students={students}
        showStudentInfo={showStudentInfo}
        errors={errors}
        refresh={refresh}
        lesson={lesson}
      />)

  }

  const changeSelectView = (value) => {
    if (value === "exams") {
      setSelectView(
        <>
          {exams.map(exam => {
            return (
              <ExplorerSelectChoice
                active={exam.exam_id === selectedExam}
                id={exam.exam_id}
                onClick={handleExamSelect}
                key={exam.exam_id}
              >
                {exam.name}
              </ExplorerSelectChoice>
            )
          })}
        </>
      )
    } else {
      setSelectView(<></>)
      returnStudentView()
    }

  }

  const handleExamSelect = (exam) => {
    setSelectedExam(exam)
    setView(
      <ExamExplorer
        exam={exam}
        students={students}
        showStudentInfo={showStudentInfo}
        refresh={refresh}
        lesson={lesson}
      />
    )

  }
  const showStudentInfo = (id) => {
    setSlideContent(<StudentSlide id={id} />)
    setHidden(false)
  }

  const closeSlide = () => {
    setHidden(true)
  }

  return (
    <InfoLayout>
      <div>
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

      </div>

      <div>
        <Explorer>
          <ExplorerSelect>
            <ExplorerSelectMenu onChange={changeSelectView}>
              <ExplorerMenuOption value="students">Student Management</ExplorerMenuOption>
              <ExplorerMenuOption value="exams">Exam Management</ExplorerMenuOption>
            </ExplorerSelectMenu>
            {selectView}
          </ExplorerSelect>
          {view}
        </Explorer>
      </div>
      <SlideOut closeSlide={closeSlide} hidden={hidden}>
        {slideContent}
      </SlideOut>
    </InfoLayout>
  )
}

const ExamExplorer = ({ exam, students, showStudentInfo, refresh, lesson }) => {
  const [results, setResults] = useState(null)
  const [resultErrors, setResultErrors] = useState([])
  const [inputMode, setInputMode] = useState(false)

  useEffect(() => {
    fetchResults()
  }, [])


  const fetchResults = () => {
    fetch(`${backendUrl}/lessons/lesson/${lesson.lesson_id}/results`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(res => {
        setResults(res.results)
      })
      .catch(e => {
        setResultErrors(e)
      })
  }

  const handleGradeInput = () => {
    setInputMode(true)
  }

  const displayResult = (result) => {
    return result ? result : "No Grade";
  }

  const displayResultInput = (result) => {
    return result ? result : "";
  }

  const handleStudentResult = (target) => {
    const newResults = JSON.parse(JSON.stringify(results))
    newResults[exam][target.id] = target.value
    setResults(newResults)
  }

  const handleSubmitGrades = () => {
    fetch(`${backendUrl}/lessons/lesson/${lesson.lesson_id}/results`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        exam: exam,
        results: results[exam]
      }),
      headers: {
        "Content-type": 'application/json; charset=UTF-8'
      },
    })
      .then(res => res.json())
      .then(res => {
        handleExitInputMode()
        if (res.error) {
          setResultErrors(res.error)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  const handleExitInputMode = () => {
    setInputMode(false)
    fetchResults()
  }

  const displayRow = (student) => {
    if (results === null) {
      return (<></>)
    }
    if (!inputMode) {
      return (
        <ExamRowInfo
          key={student.student_id}
          onClick={() => { showStudentInfo(student.student_id) }}
        >
          <p>{student.student_id}</p>
          <p>{student.name}</p>
          <p>{displayResult(results[exam][String(student.student_id)])}</p>
        </ExamRowInfo>
      )
    } else {
      return (
        <ExamRowInfo
          key={student.student_id}
        >
          <p>{student.student_id}</p>
          <p>{student.name}</p>
          <JustInput
            key={student.student_id}
            id={student.student_id}
            value={displayResultInput(results[exam][String(student.student_id)])}
            onChange={handleStudentResult}
          />
        </ExamRowInfo>
      )
    }

  }

  return (
    <ExplorerView>
      <ButtonRow>
        <ExplorerButton onClick={handleGradeInput}>Input Grades</ExplorerButton>
      </ButtonRow>
      {students.map(student => displayRow(student))}
      {inputMode &&
        (<ButtonRowBottom>
          <ExplorerButtonBottom onClick={handleSubmitGrades}>Submit Grades</ExplorerButtonBottom>
          <ExplorerButtonBottom onClick={handleExitInputMode}>Close</ExplorerButtonBottom>
        </ButtonRowBottom>)
      }
    </ExplorerView>

  )
}

const StudentExplorer = ({ students, showStudentInfo, errors, refresh, lesson }) => {
  const [showAdd, setShowAdd] = useState(false)
  const [deleteSelection, setDeleteSelection] = useState(null)
  const [editSelection, setEditSelection] = useState(null)
  const [confirm, setConfirm] = useState(false)

  const handleEdit = (student) => {
    setShowAdd(false)
    setEditSelection(student)
  }

  const closeAdd = () => {
    setShowAdd(false)
  }

  const displayError = () => {
    console.log(errors)
  }

  const handleDelete = () => {
    fetch(`${backendUrl}/students/student/${deleteSelection.student_id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(res => res.json())
      .then(() => {
        refresh()
      })
      .finally(() => {
        setDeleteSelection(null)
        closeModal()
      })
  }

  const handleEditSubmit = () => {
    setEditSelection(0)
    refresh()
  }

  const triggerConfirm = (id) => {
    setConfirm(true)
    setDeleteSelection(id)
  }

  const closeModal = () => {
    setConfirm(false)
  }

  const handleSubmit = () => {
    refresh()
  }

  return (
    <>
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
                  lesson_id={lesson.lesson_id}
                  existingName={student.name}
                  existingId={student.student_id}
                />
              </StyledAddRow>
            )
          }
          return (
            <RowInfo key={student.student_id}
              onClick={() => { showStudentInfo(student.student_id) }}
            >
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
    </>
  )
}
