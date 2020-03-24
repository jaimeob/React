/**
 *
 * CalendarioCiclico
 *
 */
import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose,bindActionCreators } from 'redux';
import {enqueueSnackbar} from 'reducers/notifications/actions';
import { withHandlers } from 'recompose';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
// import Calendar from 'react-calendar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {DAEMON} from 'utils/constants';
import makeSelectInventarioCiclico from './selectors';
import reducer from './reducer';
import saga from './saga';
import Actions from './actions';
import Calendario from './components/Calendario';
import { Container } from './styledComponents';
import CapturaInventario from './components/CapturaInventario';
import DetalleInventario from './components/DetalleInventarioCiclico';
// import DetalleMovimiento from './components/DetalleMovimiento';
// import { Container } from './styledComponents';

import "./calendario.css";
/* eslint-disable react/prefer-stateless-function */
export class InventarioCiclico extends React.Component {
  // componentDidMount(){
  //   const {
  //     actions: {
  //       setFechasAction,
  //     },
  //   } = this.props;
  //   setFechasAction(new Date());
  // }



  componentDidMount(){
    debugger;
    const {
      actions: {
        setFechasAction,
        getAlmacenesAction,
        getEstatusAction,
        setUsuarioAction,
        // obtenerPermisosAction,
      },
      usuarioId,
    } = this.props;
    // obtenerPermisosAction();
    setFechasAction(new Date());
    getAlmacenesAction(usuarioId);
    setUsuarioAction(usuarioId);
    getEstatusAction();
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
      inventarioCiclico: {
        inventarioCiclicoTabla: {
          configuracionCalendario:{
            datosSeleccionados,
            // fechaActual,
            // diaSeleccionado,
            // fechaSeleccionada,
            // almacenSeleccionado,
            // moldeSeleccionado,
            // plantaSeleccionada,
            // insumoSeleccionado,
            insumoSeleccionado,
            datosInsumos,
            tablas,
            seleccionesRows,
            almacenes,
            moldes,
            estatus,
            guardarInventario,
            abrirModal,
            abrirEliminarModal,
            mensajeConfirmacion,
            bandModal,
          },
          fechaInicial,
          cargando,
          evidenciasCalendario,
          inventariosCiclicos,
          esDetalleInventario,
          editarInventario,
          existeInventario,
          generoResultados,
          documentacion,
          campos,
          insumos,
          stepper,
          cantidadResultados,
          piezasTemporales,
          accesoriosTemporales,
          // usuarioLogeado,
        },
      },
      actions: {
        // setFechasAction,
        setFechaSeleccionadaAction,
        setDiaSeleccionadoAction,
        regresarAction,
        nuevaCapturaInventarioAction,
        setInsumoSeleccionadoAction,
        // getAlmacenesAction,
        // getEstatusAction,
        handleChangeAlmacenAction,
        handleChangeMoldeAction,
        handleChangeEstatusAction,
        onInputMontoMoldeAction,
        onRowsSeleccionadosChangeAction,
        onSearchChangeAction,
        handleChangeArchivoAction,
        handleDeleteArchivoAction,
        handleDownloadArchivoAction,
        handleChangeArchivoEvidenciaAction,
        handleDeleteArchivoEvidenciaAction,
        handleDownloadArchivoEvidenciaAction,
        handleAbrirModalAction,
        handleAbrirModalResultadosAction,
        onGuardarInventarioAction,
        onSubirArchivoEvidenciaAction,
        onDeleteArchivoEvidenciaAction,
        onDownloadArchivoEvidenciaAction,
        handleObtenerDetalleInventarioAction,
        handleEliminarModalAction,
        handleDownloadExcelAction,
        onChangeCeldaAction,
      },
      onCerrarInventarioProxy,
      handleDownloadExcelProxy,
      classes,
      enqueueSnackbar : enqueueSnackbarAction,
    } = this.props;

    switch (stepper) {
      case 0: 
        return (
          <div>
            <AppBar style={{backgroundColor: grey[200]}} position="static"> 
              <Toolbar variant="dense" style={{paddingLeft: 8}}> 
                <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
            Inventario cíclico
                </Typography> 
              </Toolbar> 
            </AppBar>
            <Calendario
              classes={classes}
              datosSeleccionados={datosSeleccionados}
              permisosNormales={permisos.normales}
              notificacion={enqueueSnackbarAction}
              // fechaActual = {fechaActual}
              // diaSeleccionado = {diaSeleccionado}
              // fechaSeleccionada = {fechaSeleccionada}
              // moldeSeleccionado={moldeSeleccionado}
              // plantaSeleccionada={plantaSeleccionada}
              // almacenSeleccionado={almacenSeleccionado}
              campos = {campos}
              almacenes = {almacenes}
              moldes = {moldes}
              // getAlmacenes={getAlmacenesAction}
              // getEstatus={getEstatusAction}
              // usuarioLogeado={usuarioLogeado}
              handleChangeAlmacen = {handleChangeAlmacenAction}
              handleChangeMolde = {handleChangeMoldeAction}
              // setFechas = {setFechasAction}
              setFechaSeleccionada = {setFechaSeleccionadaAction}
              setDiaSeleccionado = {setDiaSeleccionadoAction}
              handleObtenerDetalleInventario = {handleObtenerDetalleInventarioAction}

              nuevaCaptura = {nuevaCapturaInventarioAction}

              inventariosCiclicos =  {inventariosCiclicos}
              evidenciasCalendario = {evidenciasCalendario}
              
              onSubirArchivoEvidencia = {onSubirArchivoEvidenciaAction}
              onDeleteArchivoEvidencia = {onDeleteArchivoEvidenciaAction}
              onDownloadArchivoEvidencia = {onDownloadArchivoEvidenciaAction}
              handleEliminarModal = {handleEliminarModalAction}
              abrirEliminarModal = {abrirEliminarModal}
              mensajeConfirmacion = {mensajeConfirmacion}
              fechaInicial={fechaInicial}
              cargando={cargando}
            />
            {/* <Tabla
            
            data = {datos}
            headers = {cabeceras} 
            configuracion = {configuracion}
            idPosition = "IdMovimiento"
            admin
            onClickAgregar={nuevoMovimientoAction}
            opciones = {[{'icon' : 'ver', 'action': onSelectMovimientoProxy}]}
            // opciones = {
            //   [
            //     {'icon' : 'editar', 'action' : getTransformacionDetalleAction},
            //     {'icon' : 'eliminar', 'action' :(e) => openModalAction(e, 1)},
            //   ]
            // }
            small = {0}
          /> */}
          </div>
        );
      case 1:
        return (
          <div>
            <Container>
              <AppBar style={{backgroundColor: grey[200]}} position="static"> 
                <Toolbar variant="dense" style={{paddingLeft: 8}}> 
                  <Tooltip title="Regresar" placement="bottom-end"> 
                    <IconButton onClick={onCerrarInventarioProxy(false)}> 
                      <ArrowBackIcon /> 
                    </IconButton>
                  </Tooltip>
                  <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
                  Conteo inventario cíclico 
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
              <CapturaInventario
                classes={classes}
                regresar = {regresarAction}
                insumos = {insumos}
                insumoSeleccionado = {insumoSeleccionado}
                tablas = {tablas}
                setInsumoSeleccionado = {setInsumoSeleccionadoAction}
                datosInsumos = {datosInsumos}
                estatus={estatus}
                campos = {campos}
                handleChangeEstatus = {handleChangeEstatusAction}
                onInputMontoMolde = {onInputMontoMoldeAction}
                onChangeCelda={onChangeCeldaAction}
                onRowsSeleccionadosChange={onRowsSeleccionadosChangeAction}
                onSearchChange={onSearchChangeAction}
                seleccionesRows = {seleccionesRows}
                handleChangeArchivo={handleChangeArchivoAction}
                handleDeleteArchivo = {handleDeleteArchivoAction}
                handleDownloadArchivo = {handleDownloadArchivoAction}
                handleChangeArchivoEvidencia={handleChangeArchivoEvidenciaAction}
                handleDeleteArchivoEvidencia={handleDeleteArchivoEvidenciaAction}
                handleDownloadArchivoEvidencia = {handleDownloadArchivoEvidenciaAction}
                documentacion={documentacion}
                guardarInventario={guardarInventario}
                abrirModal = {abrirModal}
                mensajeConfirmacion = {mensajeConfirmacion}
                bandModal = {bandModal}
                onCerrarInventarioProxy={onCerrarInventarioProxy}
                handleAbrirModal={handleAbrirModalAction}
                handleAbrirModalResultados={handleAbrirModalResultadosAction}
                onGuardarInventario={onGuardarInventarioAction}
                esDetalleInventario = {esDetalleInventario}
                editarInventario={editarInventario}
                existeInventario={existeInventario}
                handleDownloadExcelProxy = {handleDownloadExcelProxy}
                handleDownloadExcel={handleDownloadExcelAction}
                generoResultados={generoResultados}
                cantidadResultados={cantidadResultados}
                piezasTemporales = {piezasTemporales}
                accesoriosTemporales = {accesoriosTemporales}
                notificacion={enqueueSnackbarAction}
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
                    Detalle inventario cíclico 
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
              <DetalleInventario
                classes={classes}
                regresar = {regresarAction}
                insumos = {insumos}
                insumoSeleccionado = {insumoSeleccionado}
                tablas = {tablas}
                setInsumoSeleccionado = {setInsumoSeleccionadoAction}
                datosInsumos = {datosInsumos}
                estatus={estatus}
                campos = {campos}
                handleChangeEstatus = {handleChangeEstatusAction}
                onInputMontoMolde = {onInputMontoMoldeAction}
                onChangeCelda = {onChangeCeldaAction}
                onRowsSeleccionadosChange={onRowsSeleccionadosChangeAction}
                onSearchChange={onSearchChangeAction}
                seleccionesRows = {seleccionesRows}
                handleChangeArchivo={handleChangeArchivoAction}
                handleDeleteArchivo = {handleDeleteArchivoAction}
                handleDownloadArchivo = {handleDownloadArchivoAction}
                handleChangeArchivoEvidencia={handleChangeArchivoEvidenciaAction}
                handleDeleteArchivoEvidencia={handleDeleteArchivoEvidenciaAction}
                handleDownloadArchivoEvidencia = {handleDownloadArchivoEvidenciaAction}
                documentacion={documentacion}
                guardarInventario={guardarInventario}
                abrirModal = {abrirModal}
                notificacion={enqueueSnackbarAction}
                mensajeConfirmacion = {mensajeConfirmacion}
                bandModal = {bandModal}
                onCerrarInventarioProxy={onCerrarInventarioProxy}
                handleAbrirModal={handleAbrirModalAction}
                onGuardarInventario={onGuardarInventarioAction}
                handleDownloadExcel = {handleDownloadExcelProxy}
                esDetalleInventario = {esDetalleInventario}
                existeInventario={existeInventario}
                permisosNormales={permisos.normales}
              />
            </Paper>
            {/* <MovimientoNuevo
                regresarAction={regresarAction}
              /> */}
          </div>
        );
      default: 
        return null;
    }
  }
}

InventarioCiclico.propTypes = {
  classes: T.object,
  inventarioCiclico: T.object,
  actions: T.object,
  onCerrarInventarioProxy: T.func,
  handleDownloadExcelProxy: T.func,
  usuarioId: T.number,
  enqueueSnackbar: T.func,
  permisos: T.object,
  // onSelectMovimientoProxy: T.func,
};

const mapStateToProps = createStructuredSelector({
  inventarioCiclico: makeSelectInventarioCiclico(),
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

const withReducer = injectReducer({ key: 'inventarioCiclico', reducer });
const withSaga = injectSaga({ key: 'inventarioCiclico', saga, mode : DAEMON });
const withActions = Actions.bindReduxStore();

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withHandlers({
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
    onCerrarInventarioProxy: (props) => (band) => () => {
      const {
        actions: {
          onCerrarInventarioAction,
        },
      } = props;
      onCerrarInventarioAction(band);
    },

    handleDownloadExcelProxy: (props) => (tipoExcel) => () => {
      
      const {
        actions: {
          handleDownloadExcelAction,
        },
      } = props;
      handleDownloadExcelAction(tipoExcel);
    },

  }),
)(InventarioCiclico);

