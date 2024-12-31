import styled from 'styled-components';



export const Card = styled.div`
padding: 1rem 2rem;
box-sizing: border-box;
border: solid 1px ${props => props.theme.accent};
border-radius: 16px;
max-width: min(fit-content, 512px);
justify-self: center;
align-self: center;
display: flex;
flex-direction: column;
margin: 1rem ;
> h1{
  margin: 1rem 0;
}
box-shadow: 0 4px 10px rgba(0,0,0,0.1);
> p {
  margin: 0;
}
`;

export const InfoList = styled.ul`

display: grid;
grid-template-columns: max-content 1fr;
padding-left: 1rem;
> li {
  list-style: none;
  margin-left: 1rem;
}
`
export const ListLabel = styled.span`
  text-align: right;

`
