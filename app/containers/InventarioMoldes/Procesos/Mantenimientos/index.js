/**
 *
 * Mantenimientos
 *
 */

import React from 'react';

import T from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { withStyles} from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { compose } from 'redux';
import {
  AppBar,
  Toolbar,
  // Paper,
  Typography,
  Paper,
  Grid,
  // Tooltip,
  // IconButton,
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Tabla from '../../../../components/DataTable';
import makeSelectMantenimientos from './selectors';
import reducer from './reducer';
import saga from './saga';
import Actions from './actions';
// import BotonExportar from './components/BotonExportar'
import PdfCorrecto from './components/PdfCorrecto'
// import messages from './messages';
const styles = () => ({
  root: {
    flexGrow: 1,
  },
  botonLila:{
    backgroundColor: '#3F51B5',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: '#3F51B5',
    },
    color: 'white',
    textTransform:'inherit',
  },
  leftIcon: {
    marginRight: 8,
  },
})
/* eslint-disable react/prefer-stateless-function */
export class Mantenimientos extends React.Component {
  componentDidMount(){
    const {
      actions: {
        getMantenimientosAction,
        setUsuarioAction,
      },
      usuarioId,
    } = this.props;
    setUsuarioAction(usuarioId);
    getMantenimientosAction();
    
  }

  componentWillUnmount() {
    const {
      actions: {
        limpiarStateAction,
      },
    } = this.props;
    limpiarStateAction();
  }

  render() {
    const {
      permisos,
      mantenimientos: {
        configuracion:{
          datosMantenimiento,
          datosDetalle,
          rowSeleccionado,
          habilitarExportar,
        },
        // stepper,
        // usuario,
      },
      onRowSelectProxy,
    } = this.props;


    for (let i = 0; i < datosMantenimiento.datos.length; i+=1) {
      const color = /\(([^)]+)\)/.exec(datosMantenimiento.datos[i].Color);
      if(typeof datosMantenimiento.datos[i].Estatus === 'string')
        datosMantenimiento.datos[i].Estatus = 
      <Chip
        avatar={<Avatar style={{backgroundColor: datosMantenimiento.datos[i].Color, width: '22px', height: '20px'}}></Avatar>}
        label={datosMantenimiento.datos[i].Estatus} 
        style={{
          backgroundColor: 'white',
          borderColor: `rgba(${color[1]}, 0.5)`,
          width: '180px',
          height: '20px',
          justifyContent: 'start',
        }}
        variant="outlined"
      />
    }

    return (
      <div>
        <AppBar style={{backgroundColor: grey[200]}} position="static"> 
          <Toolbar variant="dense" style={{paddingLeft: 8}}> 
            <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
          Mantenimientos programados
            </Typography> 
          </Toolbar> 
        </AppBar>
        <Paper>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            justify="flex-end"
            alignItems="flex-end"
            style={{ paddingRight:8,marginTop:10}}
          >
            <PdfCorrecto
              registros={datosDetalle}
              mostrar = {habilitarExportar}
              title="Mantenimiento-Inventario"
            />
            {/* <BotonExportar
            classes={classes}
            datosDetalle={datosDetalle}
          /> */}
          </Grid>
          <Tabla
            data = {datosMantenimiento.datos}
            headers = {datosMantenimiento.cabeceras} 
            configuracion = {datosMantenimiento.configuracion}
            idPosition = "IdMantenimiento"
            onRowsSelect  = {onRowSelectProxy}
            rowsSelected = {rowSeleccionado}
            admin 
            elevacion = {0}
            permisos={permisos}
            // onClickAgregar={nuevoMovimientoAction}
            // opciones = {[{'icon' : 'ver', 'action': onSelectMovimientoProxy}]}
            // opciones = {
            //   [
            //     {'icon' : 'editar', 'action' : getTransformacionDetalleAction},
            //     {'icon' : 'eliminar', 'action' :(e) => openModalAction(e, 1)},
            //   ]
            // }
            small = {0}
          />
        </Paper>
      </div>
    );
  }
}

Mantenimientos.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // classes: T.object,
  actions: T.object,
  mantenimientos: T.object,
  usuarioId: T.number,
  onRowSelectProxy: T.func,
  permisos:T.object,
  // habilitarExportar: T.bool,
};


const mapStateToProps = createStructuredSelector({
  mantenimientos: makeSelectMantenimientos(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'mantenimientos', reducer });
const withSaga = injectSaga({ key: 'mantenimientos', saga });
const withActions = Actions.bindReduxStore();
export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyles(styles),
  withHandlers({
    onRowSelectProxy: (props) => (rowSeleccionado,seleccionados) => {
      const {
        mantenimientos: {
          configuracion:{
            datosMantenimiento,
          },
          // stepper,
          // usuario,
        },
        actions:{
          setRowSeleccionadoAction,
          setSeleccionadoAction,
        },
      } = props;

      
      const {
        index,
      } = rowSeleccionado[0]

      const rowSeleccionados = [] 

      seleccionados.forEach((seleccionado) => {
        rowSeleccionados.push(seleccionado.index)
      })

      const {
        IdMolde,
        IdInventario,
        IdPlanta,
      } = datosMantenimiento.datos[index]

      setSeleccionadoAction(rowSeleccionados)
      setRowSeleccionadoAction(IdMolde,IdInventario,IdPlanta)

    },



  })
)(Mantenimientos);
