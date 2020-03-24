/**
 *
 * MovimientosInventario
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import {enqueueSnackbar} from 'reducers/notifications/actions';
import { withHandlers } from 'recompose';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {DAEMON} from 'utils/constants';
import {
  AppBar,
  Toolbar,
  Paper,
  Typography,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tabla from '../../../../components/DataTable';
import makeSelectMovimientosInventario from './selectors';
import reducer from './reducer';
import saga from './saga';
import Actions from './actions';
import { Container } from './styledComponents';
import NuevoMovimiento from './components/NuevoMovimiento';
import DetalleMovimiento from './components/DetalleMovimiento';

// import MovimientoNuevo from './components/MovimientoNuevo';

/* eslint-disable react/prefer-stateless-function */
export class MovimientosInventario extends React.Component {
  componentDidMount(){
    const {
      actions: {
        getPlazasAction,
        getTiposMovimientosAction,
        getTablaMovimientosAction,
        // obtenerPermisosAction,
        setUsuarioAction,
      },
      usuarioId,
    } = this.props;
    // obtenerPermisosAction();
    getTablaMovimientosAction();
    getPlazasAction(usuarioId);
    getTiposMovimientosAction();
    setUsuarioAction(usuarioId);
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
      movimientosInventario: {
     
        movimientoInventarioTabla: {
          esDetalleMovimiento,
          cabeceras,
          datos,
          configuracion,
          stepper,
          // usuarioLogeado,
          documentacion,
          PDF,
          configuracionNuevoMovimiento:{
            mostrarMolde,
            hayMoldeSeleccionado,
            pestañaSeleccionada,
            plazas,
            plazasDetalle,
            plazasDestino,
            tiposMovimientos,
            almacenes,
            almacenesDestino,
            almacenesDestinoValidos,
            comboVacio,
            tablas,
            rowSeleccionado,
            seleccionesRows,
            bandModal,
            abrirModalAgregar,
            mensajeConfirmacion,
            guardarMovimiento,
          },
          combos: {
            plantas,
          },
          secciones,
          campos,
        },
      },
      actions: {
        nuevoMovimientoAction,
        regresarAction,
        onInputChangeAction,
        onInputFolioChangeAction,
        onMoldeSeleccionadoChangeAction,
        onTipoMovimientoChangeAction,
        onChangeSeccionTabAction,
        onInputChangeSeccionAction,
        onInputPlazaDestinoChangeAction,
        onInputMontoMoldeAction,
        handleChangeArchivoAction,
        handleDownloadArchivoAction,
        handleDeleteArchivoAction,
        onEliminarArchivoDocumentacionAction,
        handleAbrirModalAgregarAction,
        onClickCancelarMovimientoAction,
        onClickAgregarMovimientoAction,
        onClickAgregarAction,
        obtenerMoldesFolioAction,
        onInputPlazaChangeAction,
        onSearchChangeAction,
      },
      classes,
      enqueueSnackbar : enqueueSnackbarAction,
      onSelectMovimientoProxy,
    } = this.props;
 
    switch (stepper) {
      case 0: 
        return (
          <div>
            <AppBar style={{backgroundColor: grey[200]}} position="static"> 
              <Toolbar variant="dense" style={{paddingLeft: 8}}> 
                <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
              Movimientos de inventario
                </Typography> 
              </Toolbar> 
            </AppBar>
            <Tabla
              data = {datos}
              headers = {cabeceras} 
              configuracion = {configuracion}
              idPosition = "IdMovimiento"
              admin
              // {...(normales.registrar === 1 ? {
              //   onClickAgregar: () => {
              //     nuevoMovimientoAction()
              //   },
              // } : {} )}
              onClickAgregar={nuevoMovimientoAction}
              opciones = {[{'icon' : 'ver', 'action': onSelectMovimientoProxy}]}
              permisos={permisos}
              // opciones = {
              //   [
              //     {'icon' : 'editar', 'action' : getTransformacionDetalleAction},
              //     {'icon' : 'eliminar', 'action' :(e) => openModalAction(e, 1)},
              //   ]
              // }
              small = {0}
            />
          </div>
        );
      case 1:
        return (
          <div>
            <Container>
              <AppBar style={{backgroundColor: grey[200]}} position="static"> 
                <Toolbar variant="dense" style={{paddingLeft: 8}}> 
                  <Tooltip title="Regresar" placement="bottom-end"> 
                    <IconButton onClick={regresarAction}> 
                      <ArrowBackIcon /> 
                    </IconButton>
                  </Tooltip>
                  <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
                  Nuevo movimiento 
                  </Typography> 
                </Toolbar> 
              </AppBar>
            </Container>
            <Paper 
              elevation={2} 
              style={
                {
                  height: '80vh',
                  borderRadius: 0,
                }
              }
            >
              <NuevoMovimiento
                classes={classes}
                plazas={plazas}
                plazasDestino={plazasDestino}
                tiposMovimientos={tiposMovimientos}
                almacenes={almacenes}
                almacenesDestino={almacenesDestinoValidos}
                comboVacio={comboVacio}
                onInputChange={onInputChangeAction}
                onInputFolioChange = {onInputFolioChangeAction}
                onTipoMovimientoChange={onTipoMovimientoChangeAction}
                onMoldeSeleccionadoChange={onMoldeSeleccionadoChangeAction}
                cambiarPestaña={onChangeSeccionTabAction}
                secciones={secciones}
                campos = {campos}
                seleccionesRows={seleccionesRows}
                tablas={tablas}
                rowSeleccionado={rowSeleccionado}
                plantas={plantas}
                pestañaSeleccionada={pestañaSeleccionada}
                mostrarMolde={mostrarMolde}
                hayMoldeSeleccionado = {hayMoldeSeleccionado}
                onInputChangeSeccion={onInputChangeSeccionAction}
                onInputPlazaDestinoChange={onInputPlazaDestinoChangeAction}
                onInputMontoMolde={onInputMontoMoldeAction}
                documentacion={documentacion}
                notificacion={enqueueSnackbarAction}
                handleChangeArchivo={handleChangeArchivoAction}
                handleDownloadArchivo={handleDownloadArchivoAction}
                handleDeleteArchivo={handleDeleteArchivoAction}
                onEliminarArchivoDocumentacion={onEliminarArchivoDocumentacionAction}
                onCancelarNuevoMovimiento={onClickCancelarMovimientoAction}
                onAgregarNuevoMovimiento={onClickAgregarMovimientoAction}
                agregarMovimiento={onClickAgregarAction}
                bandModal={bandModal}
                abrirModalAgregar={abrirModalAgregar}
                mensajeConfirmacion={mensajeConfirmacion}
                guardarMovimiento = {guardarMovimiento}
                handleAbrirModalAgregar = {handleAbrirModalAgregarAction}
                esDetalleMovimiento={esDetalleMovimiento}
                onInputFolio={obtenerMoldesFolioAction}
                onInputPlazaChange={onInputPlazaChangeAction}
                onSearchChange={onSearchChangeAction}
                // onAgregarNuevoMovimiento = {onAgregarNuevoMovimientoAction}
              />
            </Paper>
            {/* <MovimientoNuevo
              regresarAction={regresarAction}
            /> */}
          </div>
        );
      case 2:
        return (
          <div>
            <Container>
              <AppBar style={{backgroundColor: grey[200]}} position="static"> 
                <Toolbar variant="dense" style={{paddingLeft: 8}}> 
                  <Tooltip title="Regresar" placement="bottom-end"> 
                    <IconButton onClick={regresarAction}> 
                      <ArrowBackIcon /> 
                    </IconButton>
                  </Tooltip>
                  <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
                    Detalle movimiento 
                  </Typography> 
                </Toolbar> 
              </AppBar>
            </Container>
            <Paper 
              elevation={2} 
              style={
                {
                  height: '80vh',
                  borderRadius: 0,
                }
              }
            >
              <DetalleMovimiento
                pdf={PDF}
                classes={classes}
                plazas={plazasDetalle}
                tiposMovimientos={tiposMovimientos}
                almacenes={almacenes}
                almacenesDestino={almacenesDestino}
                comboVacio={comboVacio}
                onInputChange={onInputChangeAction}
                onTipoMovimientoChange={onTipoMovimientoChangeAction}
                onMoldeSeleccionadoChange={onMoldeSeleccionadoChangeAction}
                cambiarPestaña={onChangeSeccionTabAction}
                secciones={secciones}
                campos = {campos}
                seleccionesRows={seleccionesRows}
                tablas={tablas}
                rowSeleccionado={rowSeleccionado}
                plantas={plantas}
                pestañaSeleccionada={pestañaSeleccionada}
                mostrarMolde={mostrarMolde}
                hayMoldeSeleccionado = {hayMoldeSeleccionado}
                onInputChangeSeccion={onInputChangeSeccionAction}
                onInputMontoMolde={onInputMontoMoldeAction}
                documentacion={documentacion}
                notificacion={enqueueSnackbarAction}
                handleChangeArchivo={handleChangeArchivoAction}
                handleDownloadArchivo={handleDownloadArchivoAction}
                handleDeleteArchivo={handleDeleteArchivoAction}
                onEliminarArchivoDocumentacion={onEliminarArchivoDocumentacionAction}
                onCancelarNuevoMovimiento={onClickCancelarMovimientoAction}
                onAgregarNuevoMovimiento={onClickAgregarMovimientoAction}
                agregarMovimiento={onClickAgregarAction}
                bandModal={bandModal}
                abrirModalAgregar={abrirModalAgregar}
                mensajeConfirmacion={mensajeConfirmacion}
                guardarMovimiento = {guardarMovimiento}
                handleAbrirModalAgregar = {handleAbrirModalAgregarAction}
                esDetalleMovimiento={esDetalleMovimiento}
                plazasDestino={plazasDestino}
                onSearchChange={onSearchChangeAction}
              />
            </Paper>
          </div>
        );
      default: 
        return null;
    }
  }
}

MovimientosInventario.propTypes = {
  classes: T.object,
  actions: T.object,
  enqueueSnackbar: T.func,
  movimientosInventario: T.object,
  onSelectMovimientoProxy: T.func,
  usuarioId: T.number,
  permisos: T.object,
};

const mapStateToProps = createStructuredSelector({
  movimientosInventario: makeSelectMovimientosInventario(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enqueueSnackbar,
  }, dispatch);

}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'movimientosInventario', reducer });
const withSaga = injectSaga({ key: 'movimientosInventario', saga, mode:DAEMON});
const withActions = Actions.bindReduxStore();

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withHandlers({
    // onCancelarConfiguracionProxy: (props) => (band) => () => {
    //   const {
    //     actions: {
    //       onClickAgregarMoldeAction,
    //     },
    //   } = props;
    //   onClickAgregarMoldeAction(band);
    // },
    // onEliminarMoldeModalProxy: (props) => (band) => () => {
    //   const {
    //     actions: {
    //       onEliminarMoldeModalAction,
    //     },
    //   } = props;
    //   onEliminarMoldeModalAction(band);
    // },
    onInputChangeProxy: (props) => (id) => (e) => {
      const {
        actions: {
          onChangePuestosAction,
        },
      } = props;
      onChangePuestosAction(id, e);
    },
    onSelectMovimientoProxy: props => IdMovimiento => {
      const {
        actions: {
          onSelectMovimientoAction,
        },
      } = props;
      onSelectMovimientoAction(IdMovimiento);
    },


  }),
)(MovimientosInventario);
