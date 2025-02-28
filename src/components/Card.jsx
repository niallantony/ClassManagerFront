import styled from 'styled-components';
import { useState } from 'react';
import { DeleteButton, EditButton, SaveButton } from './Explorer';
import { Button } from './Button';



export const Card = styled.div`
padding: 1rem 2rem;
box-sizing: border-box;
border: solid 1px ${props => props.theme.accent};
border-radius: 16px;
max-width: min(fit-content, 512px);
justify-self: center;
align-self: center;
display: flex;
flex-direction: column;
margin: 1rem ;
> h1{
  margin: 1rem 0;
}
box-shadow: 0 4px 10px rgba(0,0,0,0.1);
> p {
  margin: 0;
}
align-self:start;
`;

export const InfoList = styled.ul`

display: grid;
grid-template-columns: max-content 1fr;
padding-left: 1rem;
> li {
  list-style: none;
  margin-left: 1rem;
}
`
export const ListLabel = styled.span`
  text-align: right;
`

const SmallDesc = styled.div`
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`
const ShowText = styled.a`
  font-size: 0.8em;
  text-decoration: underline;
  color: ${props => props.theme.accent};
  line-height: 0.8em;
  text-align: center;
  justify-self: center;
`

const ExpandableLi = styled.li`
  display:flex;
  flex-direction: column;
`

const SmallDate = styled.div`
  font-size: 0.8em;
  color: ${props => props.theme.accent};

`

const NoteLayout = styled.div`
  display:grid;
  grid-template-columns: 5fr fit-content(100%) fit-content(100%);
`

const InfoPanel = styled.div`
  grid-column: 1 / 4;
  border-top: solid 1px ${props => props.theme.hover}
  width: 100%;
  padding:1rem;
`

export const CardWall = styled.div`

  display:grid;

`


export const Expandable = ({ children }) => {
  const [displayed, setDisplayed] = useState(false)
  return (
    <ExpandableLi>
      {displayed ?
        (
          <>
            <div>{children}</div>
            <ShowText onClick={() => setDisplayed(false)}>Show Less</ShowText>
          </>
        ) :
        (
          <>
            <SmallDesc>{children}</SmallDesc>
            <ShowText onClick={() => setDisplayed(true)}>Show More</ShowText>
          </>
        )
      }
    </ExpandableLi>
  )
}

export const NoteCard = ({ text, onDelete, onEdit, date }) => {
  const handleDate = (timestamp) => {
    const [date, time] = timestamp.split("T")
    const [hours, minutes, _] = time.split(":")
    return `${date} ${hours}:${minutes}`

  }
  return (
    <Card style={{ width: "100%" }}>
      <NoteLayout>
        <SmallDate>{handleDate(date)}</SmallDate>
        <EditButton onClick={onEdit}></EditButton>
        <DeleteButton onClick={onDelete}></DeleteButton>
        <InfoPanel>{text}</InfoPanel>
      </NoteLayout>
    </Card>
  )
}

export const EditNoteCard = ({ children, date, onSubmit }) => {
  const handleDate = (timestamp) => {
    const [date, time] = timestamp.split("T")
    const [hours, minutes, _] = time.split(":")
    return `${date} ${hours}:${minutes}`
  }
  return (
    <Card style={{ width: "100%" }}>
      <NoteLayout>
        <SmallDate>{handleDate(date)}</SmallDate>
        <SaveButton onClick={onSubmit} />
        <InfoPanel>{children}</InfoPanel>
      </NoteLayout>
    </Card>
  )
}
