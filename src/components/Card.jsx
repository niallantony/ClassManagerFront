import styled from 'styled-components';
import { useState } from 'react';



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

const SmallDesc = styled.div`
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`
const ShowText = styled.a`
  font-size: 0.8em;
  text-decoration: underline;
  color: ${props => props.theme.accent};
  line-height: 0.8em;
  text-align: center;
  justify-self: center;
`

const ExpandableLi = styled.li`
  display:flex;
  flex-direction: column;
`

export const Expandable = ({ children }) => {
  const [displayed, setDisplayed] = useState(false)
  return (
    <ExpandableLi>
      {displayed ?
        (
          <>
            <div>{children}</div>
            <ShowText onClick={() => setDisplayed(false)}>Show Less</ShowText>
          </>
        ) :
        (
          <>
            <SmallDesc>{children}</SmallDesc>
            <ShowText onClick={() => setDisplayed(true)}>Show More</ShowText>
          </>
        )
      }
    </ExpandableLi>
  )
}
