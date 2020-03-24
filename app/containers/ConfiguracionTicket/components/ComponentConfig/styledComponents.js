import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

export const bounceAnimation = keyframes`${fadeIn}`;

export const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;
