import styled from 'styled-components';

const StyledInfoTag = styled.p`
  background-color: ${props => props.color ? props.color : props.theme.accent};
  color: ${props => props.theme.light};
  border-radius: 15px;
  padding: 0.3rem 1rem;
  font-size: 0.8rem;
  width: fit-content;
`;

export function InfoTag({ children, color }) {
  return (<StyledInfoTag color={color}>{children}</StyledInfoTag>)
}
