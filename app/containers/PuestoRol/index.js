/**
 *
 * PuestoRol
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withHandlers } from 'recompose';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import { DAEMON } from 'utils/constants';
import Appbar from 'components/Appbar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Grey from '@material-ui/core/colors/grey'
import AppbarNuevo from '@material-ui/core/AppBar';
import Modal from 'components/Dialog/alertDialog';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider } from "@material-ui/core/styles";
import { enqueueSnackbar } from 'reducers/notifications/actions';
import withNotifier from 'components/HOC/withNotifier';
import makeSelectPuestoRol from './selectors';
import reducer from './reducer';
import saga from './saga';
import Actions from './actions';
// Componentes
import Tabla from '../Modulos/componentes/Tabla';
import CrearPuestoRol from './components/CrearPuestoRol';
// Estilos
import getMuiTheme from '../Modulos/style';
/* eslint-disable react/prefer-stateless-function */
export class PuestoRol extends React.Component {

  componentWillMount(){
    const {
      actions: {
        setStepperAction,
      },
    } = this.props;
    setStepperAction(0);
  }

  componentDidMount(){
    const {
      actions: {
        getListadoAction,
        setSelectedAction,
        getPuestosAction,
        getRolesAction,
        setMountedAction,
        obtenerPermisosAction,
      },
    } = this.props;
    // obtenerPermisosAction();
    getListadoAction({usuarioId: this.props.usuarioId, nombreUsuario: this.props.nombreUsuario});
    setSelectedAction([]);
    getPuestosAction();
    getRolesAction();
    setMountedAction();
  }

  componentWillUnmount() {
    const {
      actions: {
        limpiarStateAction,
        setMountedAction,
      },
      puestoRol: {
        mounted,
      },
    } = this.props;
    
    if(mounted)
      limpiarStateAction();
    else
      setMountedAction();
  }
 
  render(){
    const {
      permisos,
      actions : {
        getConfiguracionAction,
        setListadoFilterAction,
        setSelectedAction,
        setOpenSearchAction,
        setSearchTextAction,
        setOpenFilterAction,
        setOpenMenuContextualAction,
        setOpenModalAction,
        setOrderAction,
        setOrderByAction,
        setPageAction,
        setRowsPerPageAction,
        setStepperAction,
        setListadoActivarAction,
        setListadoDesactivarAction,
        setActivarRegistrosAction,
        getDownloadFileAction,
        getDownloadFilesAction,
        setLoadingAction,
        onChangeParametrosAction,
        onChangePuestoAction,
        onClickAsignarAction,
        handleClickListaAction,
        onDescargarFormatoAction,
        subirArchivosAction,
        handleClickListaArchivoAction,
        onGuardarConfiguracionAction,
        onCancelarConfiguracionAction,
        onDescargarArchivoAction,
        onEliminarArchivoAction,
        onCancelarArchivoAction,
      },
      puestoRol : {
        modulosTabla: {
          order,
          orderBy,
          selected,
          data,
          filterData,
          page,
          rowsPerPage,
          open,
          openSearch,
          searchText,
          openModal,
          openMenuContextual,
          stepper,
          activarRegistros,
          loading,
          combos: {
            roles,
            puestos,
          },
          usuario,
        },
        registrar:{
          parametros: {
            puesto,
            rol,
            archivo,
            idPuesto,
            activo,
          },
          lista,
          cabeceras,
          cabecerasArchivo,
          abrirModal,
          abrirModalArchivo,
        },
      },
      enqueueSnackbar : enqueueSnackbarAction,
      onCancelarConfiguracionProxy,
    } = this.props;

    const rows = [
      { id: 'IdPuesto', numeric: false, disablePadding: false, label: '#', filter: true },
      { id: 'Nombre', numeric: false, disablePadding: false, label: 'Puesto', filter: true },
      { id: 'Roles', numeric: false, disablePadding: false, label: 'Rol(es)', filter: true },
      { id: 'Activo', numeric: false, disablePadding: false, label: 'Estatus', filter: true },
      { id: 'Acciones', numeric: false, disablePadding: false, label: ' ' },
    ];
    
    switch(stepper){
      case 0 :
        return (  
          <div>
            <Appbar 
              texto='Configuración Puesto - Rol'
            />
            <Grid 
              item
              xs={12} 
              sm={12} 
              md={10} 
              lg={12} 
              style={{padding: '8px'}}
            > 
              <MuiThemeProvider theme={getMuiTheme}>
                <Tabla
                  // Cabeceras de la tabla
                  rows={rows}

                  // idFila
                  idFila="IdPuesto"

                  // Actions
                  soloId
                  onEditar={getConfiguracionAction}
                  setListadoFilterAction={setListadoFilterAction}
                  setSelectedAction={setSelectedAction}
                  setOpenSearchAction={setOpenSearchAction}
                  setSearchTextAction={setSearchTextAction}
                  setOpenFilterAction={setOpenFilterAction}
                  setOpenMenuContextualAction={setOpenMenuContextualAction}
                  setOpenModalAction={setOpenModalAction}
                  setOrderAction={setOrderAction}
                  setOrderByAction={setOrderByAction}
                  setPageAction={setPageAction}
                  setRowsPerPageAction={setRowsPerPageAction}
                  setStepperAction={setStepperAction}
                  setListadoActivarAction={setListadoActivarAction}
                  setListadoDesactivarAction={setListadoDesactivarAction}
                  setActivarRegistrosAction={setActivarRegistrosAction}
                  getDownloadFileAction={getDownloadFileAction}
                  getDownloadFilesAction={getDownloadFilesAction}
                  setLoadingAction={setLoadingAction}
                  // State
                  order={order}
                  orderBy={orderBy}
                  selected={selected}
                  data={data} 
                  filterData={filterData}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  open={open}
                  openSearch={openSearch}
                  searchText={searchText}
                  openModal={openModal}
                  openMenuContextual={openMenuContextual}
                  stepper={stepper}
                  activarRegistros={activarRegistros}
                  loading={loading}

                  // Paginador
                  rowsPerPageOptions={[5, 10, 25]} 

                  // Notificaciones
                  notificacion={enqueueSnackbarAction}

                  // Descargar
                  download

                  // Permisos
                  permisos={permisos}
                  
                />
              </MuiThemeProvider>    
            </Grid>
          </div>
        );
      case 1 :
        return (
          <React.Fragment>
            <Modal 
              open={abrirModal}
              typeAlert='Report'
              typeOptions='Select'
              title='Confirmar....'
              message='Existen datos no guardados, ¿Desea continuar?'
              onClickAccept={onCancelarConfiguracionProxy(false)}
              onClickCancel={onCancelarConfiguracionProxy(true)}
            />
            <AppbarNuevo 
              position="static"
              style={
                {
                  backgroundColor: Grey[200], 
                  marginBottom: 16,
                  boxShadow: 'none',
                }
              } 
            >
              <Toolbar variant="dense" style={{paddingLeft: 8}}>
                <IconButton onClick={onCancelarConfiguracionProxy(false)}>
                  <ArrowBack/>
                </IconButton>
                <Typography
                  variant='h5'
                >
                  Registrar nuevo Puesto - Rol
                </Typography>
              </Toolbar>
            </AppbarNuevo>
            
            <CrearPuestoRol 
              puesto={puesto}
              rol={rol}
              puestos={puestos}
              roles={roles}
              archivo={archivo}
              idPuesto={idPuesto}
              onChangeParametros={onChangeParametrosAction}
              onPuestoChange={onChangePuestoAction}
              onClickAsignar={onClickAsignarAction}
              handleClickLista={handleClickListaAction}
              handleClickListaArchivo={handleClickListaArchivoAction}
              lista={lista}
              cabeceras={cabeceras}
              cabecerasArchivo={cabecerasArchivo}
              subirArchivos={subirArchivosAction}
              onDescargarFormato={onDescargarFormatoAction}
              usuario={usuario}
              abrirModal={abrirModal}
              abrirModalArchivo={abrirModalArchivo}
              notificacion={enqueueSnackbarAction}
              onGuardarConfiguracion={onGuardarConfiguracionAction}
              onCancelarConfiguracion={onCancelarConfiguracionAction}
              onDescargarArchivo={onDescargarArchivoAction}
              onEliminarArchivo={onEliminarArchivoAction}
              onCancelarArchivo={onCancelarArchivoAction}
              activo={activo}
              onCancelarConfiguracionProxy={onCancelarConfiguracionProxy}
            />
          </React.Fragment>
        )
      default :
        return null
    }
  }
}

PuestoRol.propTypes = {
  actions: T.object,
  puestoRol: T.object,
  enqueueSnackbar: T.func,
  onCancelarConfiguracionProxy: T.func,
};

const mapStateToProps = createStructuredSelector({
  puestoRol: makeSelectPuestoRol(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enqueueSnackbar,
  }, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'puestoRol', reducer });
const withSaga = injectSaga({ key: 'puestoRol', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withHandlers({
    onCancelarConfiguracionProxy: (props) => (band) => () => {
      const {
        actions: {
          onCancelarConfiguracionAction,
        },
      } = props;
      onCancelarConfiguracionAction(band);
    },
    onEliminarMoldeModalProxy: (props) => (band) => () => {
      const {
        actions: {
          onEliminarMoldeModalAction,
        },
      } = props;
      onEliminarMoldeModalAction(band);
    },
  }),
)(PuestoRol);
