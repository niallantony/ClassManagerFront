import styled from 'styled-components'
import './Modal.css'

const StyledModal = styled.dialog`
    background-color: white;
    color: black;
    border: solid 1px ${props => { props.theme.error }};
    border-radius: 15px;
    padding: 2rem;
    position: absolute;
    left: 0;
    right: 0;
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 100;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`
export function Modal({ children }) {

    return (
        <StyledModal open="true">
            {children}
        </StyledModal>
    )
}
