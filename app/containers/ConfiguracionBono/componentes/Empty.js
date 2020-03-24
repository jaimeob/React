import React from 'react';
import T from 'prop-types';
import {
  Typography,
  Paper,
  Grid,
  Button,
} from '@material-ui/core';
import SinResultados from 'images/iconos/GroupCat.Indicador.svg';
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
    margin: '10px 0',
    fontWeight: 'bold',
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

const ConfiguracionIndicador = props => {
  const {
    classes,
    setStepperAction,
  } = props;

  return (
    <Paper>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <img
            key="Sin resultados"
            src={SinResultados}
            alt="¡No se encontraron coincidencias! Sin resultados obtenidos."
          />
          <div className={classes.textContainer}>
            <Typography className={classes.text}>
                Una vez que se configuren bonos se visualizarán en este apartado.
            </Typography>
            <Typography className={classes.text}>
                Para configurar un bono debe dar clic en el botón.
            </Typography>
          </div>
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={() => setStepperAction(1)}
          >
            <AddIcon className={classes.icon}/> Configurar bono
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

ConfiguracionIndicador.propTypes = {
  classes: T.object,
  setStepperAction:T.func,
}

export default withStyles(styles)(ConfiguracionIndicador);
