import React, {Component} from 'react';
import T from 'prop-types';
import {
  Typography,
  withStyles,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import { compose } from 'recompose';
import classNames from 'classnames';
import CambiarEtapaIcon from '@material-ui/icons/SwapVerticalCircle';
import TerminarEtapaIcon from '@material-ui/icons/Done';
import Success from 'components/BotonSuccess';
import Cancelar from 'components/BotonCancelar'

const styles = () => ({
  fuenteGris: {
    color: '#616161',
  },
  diasTranscurridos: {
    textAlign: 'right',
    fontSize: 14,
  },
  containerDatosCliente: {
    border: '1px solid rgb(214, 209, 209)',
    borderRadius: 4,
    margin:'0px 2px 28px',
    position: 'relative',
  },
  datosClienteTexto: {
    position: 'relative',
    top: '-22px',
    left: '30px',
    backgroundColor: '#fafafa',
    display: 'inline-block',
    padding: '0 5px',
    fontSize: 13,
  },
  datosClienteInfo: {
    fontWeight: 500,
    display: 'inline-block',
    margin: '0 7.5px 10px 7.5px',
    width: '30%',
  },
  datosClienteDato: {
    fontWeight: 'initial',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  itemDemanda: {
    position: 'relative',
    top: '-30px',
  },
  verdesito:{
    backgroundColor: '#28950f5e',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: '#28950f8a',
    },
    color: '#545050',
    textTransform: 'initial',
    margin: '10px 5px 0 0',
  },
  leftIcon: {
    marginRight: 8,
    fontSize: '20px',
    color: '#28950F',
  },
  containerBotones: {
    textAlign: 'right',
  },
  containerBotonesGuardar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
})

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// eslint-disable-next-line react/prefer-stateless-function
class SeguimientoCliente extends Component {

  componentDidMount(){
    const {
      foo: {
        handleEtapasSeguimientoAction,
      },
    } = this.props;

    handleEtapasSeguimientoAction();
  }

  render(){
    const {
      classes,
      params: {
        clienteId,
        nombreCliente,
        plaza,
        fechaAsignacion,
        fechaDemanda,
        nombreEtapa,
        montoReclamado,
        diasTranscurridos,
        fechaEtapa,
        diasTranscurridosEtapa,
        antecedente,
        expediente,
        juzgado,
        notaEtapa,
        selectedEtapa,
        archivoFinalizarEtapaSubido,
      },
      foo: {
        handleShowModalEtapaAction,
        handleGuardarSeguimientoAction,
        handleChangeInputAction,
        handleStepperAction,
        handleShowModalFinalizarEtapaAction,
      },
      permisos,
    } = this.props;
   
    return(
      <div>
        <Grid container style={{padding: 10}}>
          <Grid item sm={12}>
            <Typography variant="h6" className={classNames(classes.fuenteGris, classes.diasTranscurridos)} gutterBottom>
              {`DÍAS TRANSCURRIDOS: ${diasTranscurridos}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid container style={{padding: 10}} className={classes.containerDatosCliente}>
          <Grid item sm={12}>
            <Typography variant="h6" style={{fontSize: 13}} className={`${classes.fuenteGris} ${classes.datosClienteTexto}`} gutterBottom>
              DATOS DEL CLIENTE
            </Typography>
            <Typography style={{ display: 'block' }} className={`${classes.fuenteGris} ${classes.datosClienteInfo}`} gutterBottom noWrap>
                No. Cliente: <span className={classes.datosClienteDato}>{clienteId}</span>
            </Typography>
            <Typography className={`${classes.fuenteGris} ${classes.datosClienteInfo}`} gutterBottom noWrap>
                Nombre Cliente: <span className={classes.datosClienteDato}>{nombreCliente}</span>
            </Typography>
            <Typography className={`${classes.fuenteGris} ${classes.datosClienteInfo}`} gutterBottom noWrap>
                Plaza: <span className={classes.datosClienteDato}>{plaza}</span>
            </Typography>
            <Typography className={`${classes.fuenteGris} ${classes.datosClienteInfo}`} gutterBottom noWrap>
                Fecha asignacion: <span className={classes.datosClienteDato}>{fechaAsignacion}</span>
            </Typography>
            <Typography style={{ display: 'block' }} className={`${classes.fuenteGris} ${classes.datosClienteInfo}`} gutterBottom noWrap>
                Monto reclamado: <span className={classes.datosClienteDato}>{`$ ${formatNumber(montoReclamado)}`}</span>
            </Typography>
          </Grid>
        </Grid>
        <Grid container style={{padding: 10}} className={classes.containerDatosCliente}>
          <Grid item sm={12}>
            <Typography variant="h6" style={{fontSize: 13}} className={`${classes.fuenteGris} ${classes.datosClienteTexto}`} gutterBottom>
              DATOS DEL DEMANDA
            </Typography>
            <Grid container style={{marginTop: 35}}>
              <Grid className={classes.itemDemanda} item md={6}>
                <TextField
                  label="Ingrese Antecedente"
                  value={antecedente}
                  onChange={(e) => handleChangeInputAction(1, e)}
                  disabled={permisos.normales.registrar===0 && permisos.normales.editar===0 && permisos.normales.eliminar===0 && permisos.normales.sololectura===1}
                />
              </Grid>
              <Grid className={classes.itemDemanda} item md={6}>
                <TextField
                  label="Ingrese Expediente"
                  value={expediente}
                  onChange={(e) => handleChangeInputAction(2, e)}
                  disabled={permisos.normales.registrar===0 && permisos.normales.editar===0 && permisos.normales.eliminar===0 && permisos.normales.sololectura===1}
                />
              </Grid>
            </Grid>
            <Grid style={{ marginTop: 30 }} container>
              <Grid className={classes.itemDemanda} item md={6}>
                <TextField
                  label="Ingrese Juzgado"
                  value={juzgado}
                  onChange={(e) => handleChangeInputAction(3, e)}
                  disabled={permisos.normales.registrar===0 && permisos.normales.editar===0 && permisos.normales.eliminar===0 && permisos.normales.sololectura===1}
                />
              </Grid>
              <Grid className={classes.itemDemanda} item md={6}>
                <TextField
                  id="date"
                  label="Fecha de demanda"
                  type="date"
                  value={fechaDemanda}
                  onChange={(e) => handleChangeInputAction(4, e)}
                  disabled={permisos.normales.registrar===0 && permisos.normales.editar===0 && permisos.normales.eliminar===0 && permisos.normales.sololectura===1}
                  InputLabelProps={{
                    shrink: true,
                  }}
                
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container style={{padding: '10px 10px 40px 10px'}} className={classes.containerDatosCliente}>
          <Grid item sm={12}>
            <Typography variant="h6" className={classNames(classes.fuenteGris, classes.datosClienteTexto)} gutterBottom>
              SEGUIMIENTO ETAPA
            </Typography>
            <Typography style={{ display: 'block' }} className={classNames(classes.fuenteGris, classes.datosClienteInfo)} gutterBottom noWrap>
                Etapa: <span className={classes.datosClienteDato}>{nombreEtapa}</span>
            </Typography>
            <Typography className={classNames(classes.fuenteGris, classes.datosClienteInfo)} gutterBottom noWrap>
                Fecha etapa: <span className={classes.datosClienteDato}>{fechaEtapa}</span>
            </Typography>
            <Typography className={classNames(classes.fuenteGris, classes.datosClienteInfo)} gutterBottom noWrap>
                Días transcurridos etapa: <span className={classes.datosClienteDato}>{diasTranscurridosEtapa}</span>
            </Typography>
          </Grid>
          <Grid item sm={8}>
            <TextField
              id="outlined-with-placeholder"
              margin="normal"
              variant="outlined"
              fullWidth
              multiline
              value={notaEtapa}
              onChange={(e) => handleChangeInputAction(5, e)}
              disabled={permisos.normales.registrar===0 && permisos.normales.editar===0 && permisos.normales.eliminar===0 && permisos.normales.sololectura===1}
            />
          </Grid>
          <Grid className={classes.containerBotones} item sm={8}>
            <Button 
              size="small"
              variant="contained"
              component="span"
              className={classes.verdesito}
              onClick={handleShowModalEtapaAction}
              disabled={archivoFinalizarEtapaSubido || (permisos.normales.registrar===0 && permisos.normales.editar===0 && permisos.normales.eliminar===0 && permisos.normales.sololectura===1)}
            >
              <CambiarEtapaIcon 
                className={classes.leftIcon}
              /> Cambiar Etapa
            </Button>
            <Button 
              size="small"
              variant="contained"
              component="span"
              className={classes.verdesito}
              onClick={handleShowModalFinalizarEtapaAction}
              disabled={selectedEtapa !== 0 || (permisos.normales.registrar===0 && permisos.normales.editar===0 && permisos.normales.eliminar===0 && permisos.normales.sololectura===1)}
            >
              <TerminarEtapaIcon 
                className={classes.leftIcon}
              /> Finalizar Etapa
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.containerBotonesGuardar} style={{padding: 10}}>
          <Grid
            item
            style={
              {
                paddingRight: 4,
              }
            }
          >
            <Cancelar 
              label='Cerrar'
              // hayCambios={hayCambios}
              onClick={() => handleStepperAction()}
            />
          </Grid>
          <Grid
            item
            style={
              {
                paddingLeft: 4,
              }
            }
          >
            <Success 
              // label={clienteId ? 'Actualizar' : 'Guardar'}
              label='Guardar'
              // disabled={guardarConfiguracion}
              onClick={handleGuardarSeguimientoAction}
              disabled={permisos.normales.registrar===0}
            />
          </Grid>
        </Grid>    
      </div>
    ) 
  }

 
  
}

SeguimientoCliente.propTypes = {
  params: T.object,
  foo: T.object,
  classes: T.object,
  permisos:T.object,
};

const withStyle = withStyles(styles)


export default compose(
  withStyle,
)(SeguimientoCliente);