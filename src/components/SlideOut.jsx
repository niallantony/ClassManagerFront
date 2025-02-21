import styled from 'styled-components'

const StyledSlide = styled.div`
    border-left: solid 1px ${props => props.theme.accent};
    right: 0;
    transform: translateX(${props => props.$hidden ? "450px" : "0"});
    top: 0;
    background-color: ${props => props.theme.light};
    height: 100%;
    width: 450px;
    color: black;
    padding: 2rem;
    transition: transform 1s;
    overflow: scroll;
    position: absolute;
    box-sizing:border-box;
    @media (max-width: 991px) {
      width: 100dvw;
      transform: translateX(${props => props.$hidden ? "100%" : "0"});
    }
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

export function SlideOut({ children, hidden = true, closeSlide }) {
  return (
    <StyledSlide
      $hidden={hidden}
    >
      {!hidden &&
        <ExitSlide onClick={closeSlide}>x</ExitSlide>
      }

      {children}
    </StyledSlide>
  )
}
