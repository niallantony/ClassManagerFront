import styled from 'styled-components';

const ExplorerLayout = styled.div`
 border: solid 1px ${props => props.theme.accent};
border-radius: 4px;
height: 100%;
display: flex;
`;

const StyledSelect = styled.div`
 border-right: solid 1px ${props => props.theme.accent};
flex: 1;
`;

const StyledView = styled.div`

flex: 2;
`

export function Explorer({ children }) {

  return (
    <ExplorerLayout>
      {children}
    </ExplorerLayout>
  )

}

export function ExplorerSelect({ children }) {

  return (
    <StyledSelect>
    </StyledSelect>
  )
}

export function ExplorerView({ children }) {

  return (
    <StyledView>
    </StyledView>
  )
}
