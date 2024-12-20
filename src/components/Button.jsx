import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: ${props => props.theme.light};
    border: solid 1px ${props => props.theme.accent};
    color: ${props => props.theme.accent};
    padding:1rem;
    border-radius:15px;
    &:hover {
        background-color: ${props => props.theme.hover};
    }
    &:focus {
        background-color: ${props => props.theme.light2};
        border: solid 1px ${props => props.theme.darkAccent};
    }
`

const MainStyledButton = styled(StyledButton)`
    color: ${props => props.theme.light};
    background-color: ${props => props.theme.accent};
    &:hover {
        background-color: ${props => props.theme.darkAccent};
    }
`



export function Button({onClick, text, type="button", main=false}) {
    const handleClick = (e) => {
        e.preventDefault();
        onClick()
    }
    return (
        <StyledButton 
            onClick={handleClick} 
            type={type} 
            className={main ? 'main' : ''}
        >
        {text}
        </StyledButton>
    )
}

export function MainButton({onClick, text, type="button", main=false}) {
    const handleClick = (e) => {
        e.preventDefault();
        onClick()
    }
    return (
        <MainStyledButton 
            onClick={handleClick} 
            type={type} 
            className={main ? 'main' : ''}
        >
        {text}
        </MainStyledButton>
    )
}

