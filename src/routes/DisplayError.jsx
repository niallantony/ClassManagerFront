import styled from "styled-components"

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`
const StyledInner = styled.div`
    display: flex;
    border: solid 1px ${props => props.theme.error};
    padding: 1rem;
    margin: 1rem;
    border-radius: 15px;
    flex-direction: column;
    align-items: center;
    color: ${props => props.theme.error}
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`
export function DisplayError({ code, message }) {
    return (<StyledContainer>
        <StyledInner>
            <h1>{code}</h1> <h2>{message}</h2> <p>Sorry...</p>
        </StyledInner>
    </StyledContainer>)
}
