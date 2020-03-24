import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import isBoolean from 'lodash/isBoolean';
// import orange from '@material-ui/core/colors/orange';
// import TextField from '@material-ui/core/TextField';

// import {
//   DRAWER_WIDTH,
// } from 'utils/constants';

const getDim = (dim = 1) => {
  const UNITY = 8;
  return dim * UNITY;
}

const listenColumnProp = ({ column = false }) =>
  `flex-direction: ${isBoolean(column) && column ? 'column' : 'row'};`;

export const Container = styled.div `
  display: flex;
  ${listenColumnProp}
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  
`;

export const LeftPannelContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: ${() => `${getDim(1)}px`};
  flex-grow: 1;
`;

export const FormContainer = withStyles((theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 400,
    width: '100%',
  },
}))(Paper);

export const Instructions = withStyles((theme) => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
}))(Typography);
