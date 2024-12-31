
import styled from 'styled-components';

export const InfoLayout = styled.div`
 display: grid; 
@media (max-width: 991px) {
  grid-template-columns: 1fr;
}

@media (min-width: 992px) {
  grid-template-columns: 1fr 2fr;
}

`;

