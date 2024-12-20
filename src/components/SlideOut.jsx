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

export function SlideOut({ children, hidden = true, width = "400", }) {
    const xOffset = hidden ? width : 0
    return (
        <StyledSlide
            $width={width}
            $xOffset={xOffset}
        >
            {children}
        </StyledSlide>
    )
}
