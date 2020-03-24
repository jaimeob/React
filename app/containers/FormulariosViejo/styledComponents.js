import styled from 'styled-components';
import {
  DRAWER_WIDTH,
} from 'utils/constants';

export const Container = styled.div `
  display: flex;
  flex-grow: 1;
  width: calc(100% - ${DRAWER_WIDTH}px);
  height: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
`; 
