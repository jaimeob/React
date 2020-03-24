import React from 'react';
import T from 'prop-types';
import {
  Typography,
  Paper,
  Grid,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircleOutline';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  container: {
    padding: '20px 0',
    textAlign: 'center',
  },
  textContainer: {
    marginTop: 20,
  },
  text: {
    color: 'black',
    fontSize: 16,
    margin: '10px auto',
    fontWeight: 'bold',
    maxWidth: 507,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#28950F',
    '&:hover':{
      backgroundColor: '#1d7109',
    },
  },
  icon: {
    marginRight: 10,
  },
});

const EmptyEbitda = props => {
  const {
    classes,
    onClickButton,
    image,
    text,
    buttonTitle,
  } = props;

  return (
    <Paper>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <img
            key="Sin resultados"
            src={image}
            alt="¡No se encontraron coincidencias! Sin resultados obtenidos."
          />
          <div className={classes.textContainer}>
            <Typography className={classes.text}>
              {text}
            </Typography>
          </div>
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={() => onClickButton()}
          >
            <AddIcon className={classes.icon}/>{buttonTitle}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

EmptyEbitda.propTypes = {
  classes: T.object,
  onClickButton: T.func,
  image: T.string,
  text: T.string,
  buttonTitle: T.string,
}

export default withStyles(styles)(EmptyEbitda);
