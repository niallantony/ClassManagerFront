import styled from 'styled-components'

const H1 = styled.h1`
   color: ${props => props.theme.accent}; 
    font-size: 3rem;
    border-bottom: solid ${props => props.under} ${props => props.theme.accent};
`

const H2 = styled.h2`
   color: ${props => props.theme.accent}; 
    font-size: 2rem;
    border-bottom: solid ${props => props.under} ${props => props.theme.accent};
    margin-top: 0;
`
export function Header1({ children, under = false }) {
    const underline = under ? "1px" : "0";
    return (<H1 under={underline}>{children}</H1>)
}

export function Header2({ children, under = false }) {
    const underline = under ? "1px" : "0";
    return (<H2 under={underline}>{children}</H2>)
}
