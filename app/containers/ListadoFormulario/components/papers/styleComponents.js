// import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import {
  InputBase,
} from '@material-ui/core'
export const withMuiStyle = withStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export const GridItemGrow = withStyles(
  () => ({
    item: {
      flexGrow: 1,
    },
  })
)(Grid);

export const GridContainerGrow = withStyles({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})(Grid);


// const showHideActopms = keyframes 

export const GroupContainer = styled.div `
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  border-radius: 4px;
  position: relative;
  background-color: transparent;
  font-size: 16px;
  transition-property: border-color, box-shadow, visibility;
  transition-duration: .2s;
  transition-timing-function: ease-in;
  padding: 5px 6px;
  
  &:hover {
    border-radius: 4px;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }


  & .cls_actions_andorments .grp-acts {
    transition: opacity .5s ease-out;
    opacity: 0;
    display: none;
  }

  &:hover .cls_actions_andorments .grp-acts {
    opacity: 1;
    display: block;
  }
  
  
`;

export const CustomInput = withStyles({
  normal: {},
  fullWidth: {
    flexGrow: 1,
  },
})(InputBase)