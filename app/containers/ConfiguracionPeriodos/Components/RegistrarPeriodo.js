/* eslint-disable radix */
import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  TextField,
  Switch,
  FormGroup,
  FormControlLabel,
  Grid,
} from '@material-ui/core';
import { uniqueId } from 'lodash';
import Success from 'components/BotonSuccess';
import Cancelar from 'components/BotonCancelar';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  root: {
    maxWidth: 800,
    margin: '0 auto',
  },
  titulo: {
    color: '#5a5a5a',
    fontSize: 14,
    textAlign: 'center',
  },
  paper: {
    marginTop: 10,
    padding: 20,
  },
  formGroup: {
    display: 'inline-block',
  },
  headerItem: {
    backgroundColor: '#bfbfbf',
    width: '50%',
    float: 'left',
    padding: '5px 5px 5px 25px',
    borderBottom: '1px solid #949494',
  },
  nameItem: {
    width: '51%',
    float: 'left',
    backgroundColor: '#f5f5f5',
    height: 34,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
  },
  plazas: {
    marginTop: 30,
  },
  profitabilityTextField: {
    margin: 0,
    height: 34,
  },
  contenedorBotones: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  close: {
    marginRight: 10,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class RegistrarPeriodo extends React.Component {
  /*
  handleProfitability = (event, index) => {    
    this.props.actions.setProfitabilityAction(event.target.value, index);
  }
  */

  handleProfitability = (event, index) => {    
    const {
      target: {
        value,
      },
    } = event;
    
    // const formatoPorcentaje = /(?:\b|-)([0-9]{1,2}[0]?|100)\b/.test(value);
    const formatoPorcentaje = /(^-?100([.]0{1,3})?)$|(^-?\d{1,3}([.]\d{1,3})?)$/.test(value);

    if(formatoPorcentaje){
      this.props.actions.setProfitabilityAction(value, index);
    }
  }
  
  limitInputs = (limitBy = 2) => (e) => {
    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0, limitBy)
  }

  handleFocus = (event) => event.target.select();
  
  render(){
    const {
      classes,
      permisos,
      params: {
        period,
        closePeriod,
        plazas,
        periodId,
        errors,
      },
      actions: {
        setPeriodAction,
        setClosePeriodAction,
        setModalAction,
        requestPostPeriodAction,
        requestPeriodYearAction,
      },
    } = this.props;
   
    const plazasConRentabilidad = plazas.filter(plaza => plaza.Rentabilidad > 0);
    
    const cerrarPeriodo = plazasConRentabilidad.length !== plazas.length;
   
    return(
      <div className={classes.root}>
        <Typography className={classes.titulo}>Ingrese el periodo a configurar y capture la rentabilidad por plaza.</Typography>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                id="period"
                onInput={this.limitInputs(4)}
                label="Periodo"
                value={period}
                onChange={(e) => {
                  requestPeriodYearAction(periodId, e.target.value);
                  setPeriodAction(e.target.value);
                }}
                error={errors.period.error}
                type="number"
                helperText={errors.period.message}
                InputLabelProps={{
                  shrink: true,
                }}
                autoFocus
                margin="normal"
                disabled={
                  (periodId !== 0) ||
                  (permisos.normales.sololectura === 1 && !permisos.normales.editar === 0)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormGroup className={classes.formGroup}>
                <FormControlLabel
                  control={
                    <Switch
                      disabled={
                        (periodId !== 0 && closePeriod) || 
                        cerrarPeriodo || 
                        (permisos.normales.sololectura === 1 && !permisos.normales.editar === 0)
                      }
                      checked={!!closePeriod}
                      onChange={setClosePeriodAction}
                      value={closePeriod}
                    />
                  }
                  label="Cerrar periodo"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <div className={classes.contenedorPlazas}>
                <div className={classes.headerPlazas}>
                  <div className={classes.headerItem}>
                    <Typography>Plaza</Typography>
                  </div>
                  <div className={classes.headerItem}>
                    <Typography>%Rentabilidad</Typography>
                  </div>
                  <div className={classes.plazas}>
                    {
                      plazas.map((plaza) => (
                        <Typography 
                          className={classes.nameItem} 
                          style={{ borderRight: '1px solid transparent' }}
                          key={uniqueId('plaza_nombre')}
                        >
                          {plaza.Nombre}
                        </Typography>
                      ))
                    }
                    {
                      plazas.map((plaza, index) => (
                        <TextField
                          key={plaza.IdPlaza}
                          disabled={(periodId !== 0 && closePeriod) || permisos.normales.sololectura === 1 && !permisos.normales.editar === 0}
                          className={classes.profitabilityTextField}
                          onChange={(e) => this.handleProfitability(e, index)}
                          value={plaza.Rentabilidad} 
                          margin="normal"
                          type="number"
                          onFocus={this.handleFocus} 
                          inputProps={{
                            style: { textAlign: "right" },
                          }}
                        />
                      ))
                    }
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.contenedorBotones}>
              <div className={classes.close}>
                <Cancelar
                  label='Cerrar' 
                  onClick={() => setModalAction('Cancel')}
                />
              </div>
              <Success
                label={periodId === 0 ? "Guardar" : "Actualizar"}
                onClick={requestPostPeriodAction}
                disabled={
                  errors.period.error || 
                  period === '' ||
                  (permisos.normales.sololectura === 1 && !permisos.normales.editar === 0)
                }
              />
            </div>                     
          </Grid>
        </Grid>
      </div>
    )
  }
}

RegistrarPeriodo.propTypes = {
  permisos: T.object,
  classes: T.object,
  params: T.object,
  actions: T.object,
}

export default withStyles(styles)(RegistrarPeriodo);
