import React from 'react';
import T from 'prop-types';
import {
  Typography,
  Paper,
  Grid,
  Button,
} from '@material-ui/core';
import SinResultados from 'images/iconos/emptyConfiguracionIndicador.svg';
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
    actions:{
      setStepperAction,
    },
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
                Una vez que se registren indicadores se visualizarán en este apartado.
            </Typography>
            <Typography className={classes.text}>
                Para registrar un periodo debe dar clic en el botón
            </Typography>
          </div>
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={() => setStepperAction(2)}
          >
            <AddIcon className={classes.icon}/> Agregar Indicador
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

ConfiguracionIndicador.propTypes = {
  classes: T.object,
  actions: T.object,
}

export default withStyles(styles)(ConfiguracionIndicador);
