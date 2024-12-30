import styled from 'styled-components';

export const Explorer = styled.div`
 border: solid 1px ${props => props.theme.accent};
border-radius: 4px;
height: 100%;
display: flex;
`;

const StyledSelect = styled.div`
 border-right: solid 1px ${props => props.theme.accent};
flex: 1 ;
display: flex;
flex-direction: column;
padding: 1rem;
`;

const StyledView = styled.div`
flex: 3;
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
  
    padding: 0.5rem;
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
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`

export const RowButton = styled.button`
  border: 0;
  background-color: transparent; 
color: ${props => props.theme.accent};
width: 2rem;
height: 2rem;
padding: 0;
&:hover {
  transform: scale(1.5);
}
&:active {
  transform: translateY(5px);
}

`
export const RowInfo = styled.div`
widht: 100%;
display: grid;
grid-template-columns: 1fr 6fr;
border-bottom: solid 1px ${props => props.theme.accent};
margin: 0 1rem;
padding: 0.5rem 0;
&:hover {
  background-color: ${props => props.theme.hover}
}
> p {
  margin: 0 1rem;
}
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
      <RowButton onClick={onCancel}>&times;</RowButton>
      {children}
      <RowButton type="submit" onClick={onSubmit}>+</RowButton>
    </>
  )
}
