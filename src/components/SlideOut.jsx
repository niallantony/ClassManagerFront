import styled from 'styled-components'

const StyledSlide = styled.div`
    border-left: solid 1px ${props => props.theme.accent};
    right: 0;
    transform: translateX(${props => props.$xOffset}px);
    top: 0;
    background-color: ${props => props.theme.light};
    height: 100%;
    width: ${props => props.$width}px;
    color: black;
    padding: 2rem;
    transition: transform 1s;
    overflow: hidden;
    position: absolute;
    box-sizing:border-box;
`
const ExitSlide = styled.button`
    position: absolute;
    right: 1rem;
    top: 1rem;
    color: ${props => props.theme.accent};
    background-color: ${props => props.theme.light};
    border: solid 1px ${props => props.theme.accent};
    border-radius: 15px;
    width: 2rem;
    height: 2rem;
    &:hover {
        background-color: ${props => props.theme.hover};
    }
`

export function SlideOut({ children, hidden = true, width = "400", closeSlide }) {
    const xOffset = hidden ? width : 0
    return (
        <StyledSlide
            $width={width}
            $xOffset={xOffset}
        >
            <ExitSlide onClick={closeSlide}>x</ExitSlide>
            {children}
        </StyledSlide>
    )
}
