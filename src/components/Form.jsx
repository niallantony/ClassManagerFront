import styled from 'styled-components';

const StyledForm = styled.form`
    color: var(--accent);
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    width: 100%;
`
const StyledInput = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    position: relative;
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
`

const Error = styled.p`
    color: ${props => props.theme.error};
    margin: 0;
    height: 3rem;
`

export function Form({method, children}) {
    return (<StyledForm method={method}>
        {children}
    </StyledForm>)
}

export function TextInput({type="text", id, value, onChange, text, error}) {
    return(
        <StyledInput className='text-input'>
            <Label htmlFor={id}> {text}
            </Label>
            <Input 
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
