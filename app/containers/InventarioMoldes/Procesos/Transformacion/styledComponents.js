import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// import orange from '@material-ui/core/colors/orange';
// import TextField from '@material-ui/core/TextField';

export const Container = styled.div `
  width: calc(100% - 16px) !important;
  margin: 8px;
  background-color: #fff;
  overflow: hidden;
  width: 100%;
  border-radius: 2px;
  box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2),
              0px 2px 2px 0px rgba(0,0,0,0.14),
              0px 3px 1px -2px rgba(0,0,0,0.12);
` 

export const  FormContainer = styled.div `
  padding: 16px 24px;
`

export const LoadingContainer = styled.div `
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  justify-content: center;

`;

export const Section = styled.div `
  float: left;
  width: 50%;
  min-height: calc(100vh - 162px);
  height: 765px;
  overflow: auto;
  position: relative
`

export const Instructions = withStyles((theme) => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
}))(Typography);
