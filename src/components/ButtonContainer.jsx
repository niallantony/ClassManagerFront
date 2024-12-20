import styled from 'styled-components'

const Container = styled.div`
    grid-column: 1 / 3;
    gap: 1rem;
    padding: 1rem;
    display:flex;
    justify-content: center;
`
export function ButtonContainer({children}){
    return (<Container className="button-container">
        {children}
    </Container>)
}
