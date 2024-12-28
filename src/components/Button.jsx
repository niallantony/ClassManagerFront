import { NavLink } from 'react-router-dom'
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

const StyledNavButton = styled(NavLink)`
    background-color: ${props => props.theme.light};
    border: solid 1px ${props => props.theme.accent};
    color: ${props => props.theme.accent};
    text-decoration: none;
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


export function Button({ children, onClick, type = "button" }) {
  const handleClick = (e) => {
    e.preventDefault();
    onClick()
  }
  return (
    <StyledButton
      onClick={handleClick}
      type={type}
    >
      {children}
    </StyledButton>
  )
}

export function NavButton({ children, to }) {
  return (
    <StyledNavButton to={to}>
      {children}
    </StyledNavButton>
  )
}

export function MainButton({ onClick, children, type = "button" }) {
  const handleClick = (e) => {
    e.preventDefault();
    onClick()
  }
  return (
    <MainStyledButton
      onClick={handleClick}
      type={type}
    >
      {children}
    </MainStyledButton>
  )
}

