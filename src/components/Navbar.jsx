import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const MastHead = styled.h1`
    color: ${props => props.theme.light};
    padding: 0 1rem;
    font-weight: 100;
    margin:0;
    line-height: 1.4;
    font-size:2rem;
    flex: 1;
    align-self:center;
`

const Nav = styled.nav`
    border-bottom: solid 1px ${props => props.theme.accent};
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.light};
    margin: 0; 
    display: flex;
    justify-content: left;
`
const NavBarLink = styled(NavLink)`
    margin: 0;
    padding: 1rem;
    box-shadow: none;
    border: solid 1px ${props => props.theme.accent};
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.light};
    border-radius: 0;
    border-left:dashed 1px ${props => props.theme.light};
    text-decoration:none;
    font-size: 1rem;
    flex: 0;
    &:hover{
        border: solid 1px ${props => props.theme.accent};
        border-left:dashed 1px ${props => props.theme.light};
        filter:brightness(110%);
    }
`
const NavButton = styled.button`
    background-color: ${props => props.theme.accent};
    font-family: "Unna", serif;
    color: ${props => props.theme.light};
    font-size:1rem;
    border-radius: 0;
    min-width: fit-content;
    border: 0;
    border-left:dashed 1px ${props => props.theme.light};
    padding: 1rem;
    &:hover{
        border-left:dashed 1px ${props => props.theme.light};
        filter:brightness(110%);

    }
`


export function Navbar({handleLogout}) {
    return(<Nav>
        <MastHead>ClassRoom</MastHead>
        <NavBarLink className="nav-link" to="subjects">Subjects</NavBarLink>
        <NavBarLink className="nav-link" to="lessons">Lessons</NavBarLink>
        <NavBarLink className="nav-link" to="students">Students</NavBarLink>
        <NavButton text="Log Out" onClick={handleLogout}>Log Out</NavButton>
    </Nav>)
}
