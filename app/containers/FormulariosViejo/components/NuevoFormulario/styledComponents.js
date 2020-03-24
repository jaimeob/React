import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// import orange from '@material-ui/core/colors/orange';
// import TextField from '@material-ui/core/TextField';

export const Container = styled.div `
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
` 

export const FormContainer = withStyles((theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 400,
    width: '100%',
  },
}))(Paper);

export const LoadingContainer = styled.div `
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  
  justify-content: center;

`;

export const Instructions = withStyles((theme) => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
}))(Typography);
