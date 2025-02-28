import Delete from '../assets/delete.svg'
import Add from '../assets/add.svg'
import Close from '../assets/close.svg'
import Edit from '../assets/edit.svg'
import Save from '../assets/save.svg'
import styled from 'styled-components';

export const Explorer = styled.div`
 border: solid 1px ${props => props.theme.accent};
border-radius: 4px;
height: 100%;
display: flex;
overflow: scroll;
`;

const StyledSelect = styled.div`
 border-right: solid 1px ${props => props.theme.accent};
flex: 1 ;
display: flex;
flex-direction: column;
padding: 1rem 1rem 1rem 1rem;
`;

const StyledView = styled.div`
flex: 3;
padding: 1rem;
`

const SelectChoice = styled.li`
padding: 0 1rem;
list-style:none;
&:before{
  content:"-";
  margin-right: 1rem;
}
text-wrap:nowrap;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
text-decoration: none;
border-bottom: ${props => props.$active ? `solid 1px ${props.theme.accent}` : 'none'};
background-color: ${props => props.$active ? `${props.theme.hover}` : 'none'};
margin-bottom: 0.5rem;
&:hover {
  color: ${props => props.theme.accent};
}
`
const Label = styled.label`
height: 2rem;
line-height: 2rem;
margin-right: 1rem;
`
const Input = styled.input`
    background-color: ${props => props.theme.light};
    border: 0;
    border-bottom: solid 1px ${props => props.theme.accent};
    margin: 0.5rem;
    color: black;
    height: fit-content;
    &:disabled {
      border: solid 1px rgba(118, 118, 118, 0.3);
      color: rgba(118, 118, 118, 0.3);
    }
`
const StyledInput = styled.div`
  display: flex;

`
export const StyledAddRow = styled.div`
  display: flex;
  height: 3rem;
  justify-content: space-between;
    border-bottom: solid 1px ${props => props.theme.accent};

> button {
  height: 3rem;
}
`

export const RowButton = styled.button`
  border: 0;
  background-color: transparent; 
color: ${props => props.theme.accent};
width: ${props => props.$wide ? "100%" : "2rem"};
height: 2rem;
padding: 0;
&:hover {
  transform: ${props => props.$wide ? 'none' : 'scale(1.3)'};
  background-color: ${props => props.$wide ? props.theme.hover : 'transparent'};
}
&:active {
  transform: translateY(5px);
}
> img {
  padding: .5rem;
  height: 1rem;
  width: 1rem;
}

`
export const RowInfo = styled.div`
width: 100%;
display: grid;
grid-template-columns: 1fr 6fr 2rem 2rem;
border-bottom: solid 1px ${props => props.theme.accent};
padding: 0.5rem 0;
text-wrap: nowrap;
&:hover {
  background-color: ${props => props.theme.hover}
}
> p {
  margin: 0 1rem;
  line-height: 2rem;
}
`

export const ExamRowInfo = styled.div`
width: 100%;
display: grid;
grid-template-columns: 2fr 4fr 2fr;
border-bottom: solid 1px ${props => props.theme.accent};
padding: 0.5rem 0;
text-wrap: nowrap;
&:hover {
  background-color: ${props => props.theme.hover}
}
> p {
  margin: 0 1rem;
  line-height: 2rem;
}
`

export const ButtonRow = styled.div`
width: 100%;
display: grid;
grid-template-columns: 6fr 2fr;
border-bottom: solid 1px ${props => props.theme.accent};
`

export const ButtonRowBottom = styled.div`
width: 100%;
display: flex;
justify-content: end;
`


export const ExplorerButton = styled.button`
padding: 0.5rem 1rem;
grid-column: 2 / 3;
border-radius: 15px 15px 0 0 ;
border: 0;
text-decoration: underline;
background-color: ${props => props.theme.accent};
color: ${props => props.theme.light};
margin: 0;
&:hover {
  filter: brightness(115%);
}
&:active {
  filter: brightness(125%);
}
`

export const ExplorerButtonBottom = styled.button`
padding: 0.5rem 1rem;
border: 0;
text-decoration: underline;
background-color: ${props => props.theme.accent};
color: ${props => props.theme.light};
margin: 0 0 0 1rem;
&:hover {
  filter: brightness(115%);
}
&:active {
  filter: brightness(125%);
}
border-radius: 0 0 15px 15px
`


export const ExplorerHeader = styled.div`

`

const MenuFront = styled.select`
color: black;
background - color: ${props => props.theme.light};
margin: 1rem;
height: 2rem;
box - sizing: border - box;
&:hover {
  color: ${props => props.theme.accent};
}
`
const SelectLabel = styled.label`

  `
export const ExplorerMenuOption = styled.option`

  `

export function ExplorerSelect({ children }) {

  return (
    <StyledSelect>
      {children}
    </StyledSelect>
  )
}

export function ExplorerSelectChoice({ active = false, children, onClick, id }) {
  const click = () => {
    onClick(id)
  }
  return (
    <SelectChoice onClick={click} $active={active}>
      {children}
    </SelectChoice>
  )

}

export function ExplorerSelectMenu({ children, text, onChange }) {
  return (
    <>
      {text &&
        <SelectLabel>
          {text}
        </SelectLabel>
      }
      <MenuFront onChange={(event) => { onChange(event.target.value) }} >
        {children}
      </MenuFront>
    </>
  )
}

export function ExplorerView({ children }) {

  return (
    <StyledView>
      {children}
    </StyledView>
  )
}

export function ViewInput({ id, value, onChange, name, disabled = false }) {
  return (
    <StyledInput className='text-input'>
      <Label htmlFor={id}> {name}
      </Label>
      <Input
        disabled={disabled}
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </StyledInput>
  )
}

export function AddRow({ children, onCancel, onSubmit }) {
  return (
    <>
      <RowButton onClick={onCancel}><img src={Close} /></RowButton>
      {children}
      <AddButton onClick={onSubmit} />
    </>
  )
}

export function AddButton({ wide = false, onClick }) {
  return (
    <RowButton $wide={wide} onClick={onClick}>
      <img src={Add} />
    </RowButton>
  )
}
export function EditButton({ onClick }) {
  const handleClick = (e) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <RowButton onClick={handleClick}>
      <img src={Edit} />
    </RowButton>
  )
}

export function DeleteButton({ onClick }) {
  const handleClick = (e) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <RowButton onClick={handleClick}>
      <img src={Delete} />
    </RowButton>
  )
}

export function SaveButton({ onClick }) {
  const handleClick = (e) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <RowButton onClick={handleClick}>
      <img src={Save} />
    </RowButton>
  )
}
