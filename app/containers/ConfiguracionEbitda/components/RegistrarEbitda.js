/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable radix */
import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  TextField,
  Grid,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
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
    width: '33.33%',
    float: 'left',
    padding: '5px 5px 5px 25px',
    borderBottom: '1px solid #949494',
  },
  nameItem: {
    backgroundColor: '#f5f5f5',
    height: 34,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
  },
  plazas: {
    width: '33.33%',
    float: 'left',
    // border: '1px solid blue',
    // marginTop: 30,
  },
  containerProfitabilityTextField: {
    // border: '1px solid red',
    width: '66.67%',
    float: 'right',
  },
  profitabilityTextField: {
    margin: 0,
    height: 34,
    width: '50%',
    padding: 3,
  },
  contenedorBotones: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  close: {
    marginRight: 10,
  },
  contenedorPeriodo: {
    marginBottom: 30,
  },
});

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}


// eslint-disable-next-line react/prefer-stateless-function
class RegistrarEbitda extends React.Component {
  
  limitInputs = (limitBy = 2) => (e) => {
    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0, limitBy)
  }

  render(){
    const {
      classes,
      permisos,
      params: {
        period,
        plazas,
        ebitdaId,
        errors,
        active,
      },
      actions: {
        setPeriodAction,
        handleOpenDialogAction,
        requestPostEbitdaAction,
        requestEbitdaYearAction,
      },
    } = this.props;
  
    return(
      <div className={classes.root}>
        <Typography className={classes.titulo}>Capture el ebitda por cada una de las plazas.</Typography>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={6} className={classes.contenedorPeriodo}>
              <TextField
                id="period"
                onInput={this.limitInputs(4)}
                label="Periodo"
                value={period}
                onChange={(e) => {
                  requestEbitdaYearAction(ebitdaId, e.target.value);
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
                  (ebitdaId !== 0) ||
                  (permisos.normales.sololectura === 1 && !permisos.normales.editar === 0)
                }
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={9}>
              <div className={classes.contenedorPlazas}>
                <div className={classes.headerPlazas}>
                  <div className={classes.headerItem}>
                    <Typography>Plaza</Typography>
                  </div>
                  <div className={classes.headerItem}>
                    <Typography>$ Ebitda planeado</Typography>
                  </div>
                  <div className={classes.headerItem}>
                    <Typography>$ Ebitda real</Typography>
                  </div>
                  <div>
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
                    </div>
                    {
                      plazas.map((plaza, index) => (
                        <div key={plaza.IdPlaza} className={classes.containerProfitabilityTextField}>
                          <TextField
                            className={classes.profitabilityTextField}
                            disabled={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || active === false}
                            value={plaza.EbitdaPlaneado}
                            onChange={(e) =>  this.props.actions.setProfitabilityAction('plannedEbitda' , e.target.value, index)}
                            id="formatted-numberformat-input-planeado"
                            inputProps={{ 
                              maxLength: 13,
                              style: { textAlign: "right" },
                            }}
                            InputProps={{ inputComponent: NumberFormatCustom }}
                          />
                          <TextField
                            className={classes.profitabilityTextField}
                            disabled={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || active === false}
                            value={plaza.Ebitda}
                            onChange={(e) =>  this.props.actions.setProfitabilityAction('ebitda', e.target.value, index)}
                            id="formatted-numberformat-input"
                            inputProps={{ 
                              maxLength: 13,
                              style: { textAlign: "right" },
                            }}
                            InputProps={{ inputComponent: NumberFormatCustom }}
                          />
                        </div>
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
                  onClick={() => handleOpenDialogAction('showDialogReturn')}
                />
              </div>
              <Success
                label={ebitdaId === 0 ? "Guardar" : "Actualizar"}
                onClick={requestPostEbitdaAction}
                disabled={
                  errors.period.error || 
                  period === '' ||
                  active === false
                }
              />
            </div>                     
          </Grid>
        </Grid>
      </div>
    )
  }
}

RegistrarEbitda.propTypes = {
  permisos: T.object,
  classes: T.object,
  params: T.object,
  actions: T.object,
}

export default withStyles(styles)(RegistrarEbitda);
