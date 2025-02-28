import styled from 'styled-components';

const StyledForm = styled.form`
    color: ${props => props.theme.accent};
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    width: 100%;
`
const StyledTextArea = styled.textarea`
    resize:none;
    font-family: "Arial", sans-serif;
    padding: 0.5rem;
    box-sizing: border-box;
    font-size: 0.8rem;
    background-color: ${props => props.theme.light};
    color: ${props => props.theme.dark};
`
const StyledInput = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    position: relative;
`
const StyledInputNoLabel = styled.div`
    position: relative;
    height: 100%;
`
const Label = styled.label`

`
const Input = styled.input`
    background-color: ${props => props.theme.light};
    border: solid 1px ${props => props.theme.accent};
    border-radius: 5px;
    padding: 0.5rem;
    color: black;
    height: fit-content;
    &:disabled {
      border: solid 1px rgba(118, 118, 118, 0.3);
      color: rgba(118, 118, 118, 0.3);
    }
`

const Error = styled.p`
    color: ${props => props.theme.error};
    margin: 0;
    height: 3rem;
    grid-column: 1 / 3;
`
const Select = styled.select`
    color: ${props => props.theme.dark};
    background-color: ${props => props.theme.light};
    padding: 0.5rem;
    border-radius: 5px;
`
const Option = styled.option`

`
const StyledCheck = styled.input`
    background: ${props => props.theme.light};
    color-scheme: light;
    padding: 0.5rem;
    justify-self:start;
    color: black;
    height: fit-content;
    &:disabled {
      border: solid 1px rgba(118, 118, 118, 0.3);
      color: rgba(118, 118, 118, 0.3);
    }
`
export function ErrorDiv({ children, absolute }) {
  return (
    <Error className={absolute ? 'absolute' : ''}>
      {children}
    </Error>
  )
}

export function Form({ method, children }) {
  return (<StyledForm method={method}>
    {children}
  </StyledForm>)
}

export function TextInput({ type = "text", id, value, onChange, text, error, disabled = false }) {
  return (
    <StyledInput className='text-input'>
      <Label htmlFor={id}> {text}
      </Label>
      <Input
        disabled={disabled}
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <Error className="error">{error}</Error>
    </StyledInput>
  )
}

export function JustInput({ id, value, onChange }) {
  return (
    <StyledInput className='text-input'>
      <Input
        id={id}
        name={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target)}
      />
    </StyledInput>

  )
}

export function CheckBox({ id, text, value, disabled = false, error, onChange }) {
  return (
    <StyledInput className='text-input'>
      <Label htmlFor={id}> {text}
      </Label>
      <StyledCheck
        disabled={disabled}
        id={id}
        name={id}
        type="checkbox"
        checked={value}
        onChange={(event) => {
          onChange(event.target.checked)
          console.log(event)
        }}
      />
      <Error className="error">{error}</Error>
    </StyledInput>
  )
}

export function TextArea({ onChange, id, error, value, text, rows }) {
  return (
    <StyledInput className='text-input'>
      <Label htmlFor={id}> {text}
      </Label>
      <StyledTextArea
        id={id}
        rows={rows}
        name={id}
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
      ></StyledTextArea>
      <Error className="error">{error}</Error>
    </StyledInput>
  )
}

export function TextAreaNoLabel({ onChange, id, error, value }) {
  return (
    <StyledInputNoLabel className='text-input'>
      <StyledTextArea
        style={{ width: "100%", height: "100%" }}
        id={id}
        name={id}
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
      ></StyledTextArea>
      <Error className="error">{error}</Error>
    </StyledInputNoLabel>
  )
}
export function SelectInput({ text, error, value, disabled = false, id, options, onChange }) {

  return (
    <StyledInput>
      <Label htmlFor={id}>{text}
      </Label>
      <Select value={value} disabled={disabled} name={id} id={id} onChange={(event) => onChange(event.target.value)}>
        {options && options.map((option) =>
          <Option key={option.value} value={option.value}>{option.name || option.value}</Option>
        )}
      </Select>
      <Error className="error">{error}</Error>
    </StyledInput>
  )
}
