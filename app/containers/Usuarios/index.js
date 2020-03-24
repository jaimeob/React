/**
 *
 * Usuarios
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import withNotifier from 'components/HOC/withNotifier';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import { MuiThemeProvider } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Appbar from 'components/Appbar';
import { DAEMON } from 'utils/constants';
import makeSelectUsuarios from './selectors';
import reducer from './reducer';
import saga from './saga';
import Actions from './actions';
// Componentes
import Tabla from '../Modulos/componentes/Tabla';
import Header from '../Modulos/componentes/Header';

// Estilos
import getMuiTheme from '../Modulos/style';
import CrearUsuario from './components/CrearUsuario'
/* eslint-disable react/prefer-stateless-function */
export class Usuarios extends React.Component {

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
        getEmpleadosAction,
        getPlazasAction,
        getPuestosAction,
        setMountedAction,
      },
    } = this.props;
    getListadoAction();
    setSelectedAction([]);
    getEmpleadosAction();
    getPlazasAction();
    getPuestosAction();
    setMountedAction();
  }

  componentWillUnmount() {
    const {
      actions: {
        limpiarStateAction,
        setMountedAction,
      },
      usuarios: {
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
      actions : {
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
        onClickRegresarAction,
        onChangePestanaAction,
        onChangeEmpleadoAction,
        onChangeParametrosAction,
        onChangeArchivoAction,
        onClickArchivoAction,
        onDeleteArchivoAction,
        onDeleteArchivoModalAction,
        onClickPlazaTemporalAction,
        onFechaInputAction,
        onChangeFechaAction,
        onChangeArchivoTempAction,
        onClickArchivoTempAction,
        onDeleteArchivoTempAction,
        onDeleteArchivoTempModalAction,
        getNextFileAction,
        onAsignarPlazaTemporalAction,
        onClickCerrarPlazaTemporalAction,
        onClickRolAdicionalAction,
        onClickCerrarRolAdicionalAction,
        onChangePuestoAction,
        onChangeRolAction,
        onChangeFechaRolAction,
        onFechaInputRolAction,
        onChangeArchivoRolAction,
        onAsignarRolAdicionalAction,
        handleClickListaAction,
        onClickCheckAction,
        onClickVerDetalleAction,
        onClickListaDetalleAction,
        onClickListaDetalleCerrarAction,
        onClickPermisosEspecialesAction,
        onClickCerrarRolDetalleAction,
        onVerDetalleUsuarioAction,
        onClickGuardarAction,
        onClickDescargarHistorialAction,
        onClickDescargarTodoHistorialAction,
      },
      usuarios : {
        permisos,
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
        },
        registrar: {
          pestañaSlc,
          hayCambios,
          idUsuario,
          nomUsuario,
          abrirModalArchivo,
          abrirPlazaTemporal,
          abrirRolAdicional,
          guardarConfiguracion,
          historial: {
            cabecerasHistorial,
            datosHistorial,
          },
          combos: {
            empleados,
            dominios,
            plazas,
            plazasTemp,
            puestosAdi,
            rolesAdi,
            empresasAdi,
          },
          parametros: {
            empleado,
            enkontrol,
            archivos,
            archivosPage,
            modulos,
            modulosCabecera,
            empresaDetalle,
            abrirDetalleRol,
            rolDatos,
            rolDetalle,
            plazaTemporal: {
              plazaTemp,
              fecInicio,
              fecFin,
              fecInput,
              fechaValida,
              archivosTemp,
              abrirModalPlaza,
              archivoTempValido,
              asignarValido,
              hayCambiosTemp,
            },
            rolAdicional: {
              puestoAdi,
              rolAdi,
              empresaAdi,
              fecInicioRol,
              fecFinRol,
              fecInputRol,
              fechaValidaRol,
              archivosRol,
              archivoRolValido,
              abrirModalRol,
              asignarValidoRol,
              hayCambiosRol,
            },
          },
          info: {
            nombre,
            puesto,
            imagen,
            correo,
            dominio,
            usuarioDominio,
            plaza,
          },
        },
      },
      enqueueSnackbar : enqueueSnackbarAction,
    } = this.props;
    
    const rows = [
      { id: 'NoEmpleado', numeric: false, disablePadding: false, label: 'Núm Empleado', filter: true },
      { id: 'UsuarioId', numeric: false, disablePadding: false, label: 'UsuarioId', filter: false, show: false },
      { id: 'Nombre', numeric: false, disablePadding: false, label: 'Nombre', filter: true },
      { id: 'UsuarioDominio', numeric: false, disablePadding: false, label: 'Usuario Dominio', filter: true },
      { id: 'Activo', numeric: false, disablePadding: false, label: 'Estatus', filter: true },
      { id: 'Acciones', numeric: false, disablePadding: false, label: ' ' },
    ];

    switch(stepper){
      case 0 :
        return (  
          <div>
            <Header title="Configuración de Usuarios" />
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
                  idFila="NoEmpleado"
                  soloId
                  // Actions
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
                  onEditar={onVerDetalleUsuarioAction}
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
                  permisos={permisos}
                  
                  // Paginador
                  rowsPerPageOptions={[5, 10, 25]} 

                  // Notificaciones
                  notificacion={enqueueSnackbarAction}

                  // Descargar
                  download
                />
              </MuiThemeProvider>    
            </Grid>
          </div>
        );
      case 1 :
        return <React.Fragment>
          <Appbar 
            texto='Registrar configuración de usuario'
            onClickRegresar={onClickRegresarAction}
            hayCambios={hayCambios}
          />
          {<CrearUsuario 
            idUsuario={idUsuario}
            nomUsuario={nomUsuario}
            hayCambios={hayCambios}
            pestañaSlc={pestañaSlc}
            onChangePestaña={onChangePestanaAction}
            onChangeParametros={onChangeParametrosAction}
            onChangeEmpleado={onChangeEmpleadoAction}
            empleado={empleado}
            empleados={empleados}
            enkontrol={enkontrol}
            nombre={nombre}
            puesto={puesto}
            imagen={imagen}
            correo={correo}
            dominios={dominios}
            dominio={dominio}
            puestoAdi={puestoAdi}
            fecInicioRol={fecInicioRol}
            fecFinRol={fecFinRol}
            fecInputRol={fecInputRol}
            fechaValidaRol={fechaValidaRol}
            archivosRol={archivosRol}
            archivoRolValido={archivoRolValido}
            abrirModalRol={abrirModalRol}
            asignarValidoRol={asignarValidoRol}
            hayCambiosRol={hayCambiosRol}
            usuarioDominio={usuarioDominio}
            plaza={plaza}
            plazas={plazas}
            plazasTemp={plazasTemp}
            archivos={archivos}
            subirArchivos={onChangeArchivoAction}
            subirArchivosTemp={onChangeArchivoTempAction}
            notificacion={enqueueSnackbarAction}
            onClickArchivo={onClickArchivoAction}
            onClickDescargarArchivoTemp={onClickArchivoTempAction}
            onDeleteArchivoTemp={onDeleteArchivoTempAction}
            onDeleteArchivoTempModal={onDeleteArchivoTempModalAction}
            onDeleteArchivo={onDeleteArchivoAction}
            onDeleteArchivoModal={onDeleteArchivoModalAction}
            abrirModalArchivo={abrirModalArchivo}
            abrirPlazaTemporal={abrirPlazaTemporal}
            abrirRolAdicional={abrirRolAdicional}
            onClickPlazaTemporal={onClickPlazaTemporalAction}
            onFechaInput={onFechaInputAction}
            onChangeFecha={onChangeFechaAction}
            fecInicio={fecInicio}
            fecFin={fecFin}
            fecInput={fecInput}
            fechaValida={fechaValida}
            plazaTemp={plazaTemp}
            archivosTemp={archivosTemp}
            abrirModalPlaza={abrirModalPlaza}
            getNextFile={getNextFileAction}
            archivosPage={archivosPage}
            archivoTempValido={archivoTempValido}
            onAsignarPlazaTemporal={onAsignarPlazaTemporalAction}
            onAsignarRolAdicional={onAsignarRolAdicionalAction}
            asignarValido={asignarValido}
            hayCambiosTemp={hayCambiosTemp}
            onClickCerrarPlazaTemporal={onClickCerrarPlazaTemporalAction}
            onClickCerrarRolAdicional={onClickCerrarRolAdicionalAction}
            onClickRolAdicional={onClickRolAdicionalAction}
            puestosAdi={puestosAdi}
            onChangePuesto={onChangePuestoAction}
            onChangeRol={onChangeRolAction}
            rolAdi={rolAdi}
            rolesAdi={rolesAdi}
            empresasAdi={empresasAdi}
            empresaAdi={empresaAdi}
            onChangeFechaRol={onChangeFechaRolAction}
            onFechaInputRol={onFechaInputRolAction}
            subirArchivoRol={onChangeArchivoRolAction}
            modulos={modulos}
            modulosCabecera={modulosCabecera}
            handleClickLista={handleClickListaAction}
            onClickCheck={onClickCheckAction}
            empresaDetalle={empresaDetalle}
            rolDetalle={rolDetalle}
            onClickVerDetalle={onClickVerDetalleAction}
            rolDatos={rolDatos}
            abrirDetalleRol={abrirDetalleRol}
            onClickListaDetalle={onClickListaDetalleAction}
            onClickListaDetalleCerrar={onClickListaDetalleCerrarAction}
            abrirPermisosEspeciales={onClickPermisosEspecialesAction}
            onClickCerrarRolDetalle={onClickCerrarRolDetalleAction}
            onClickRegresar={onClickRegresarAction}
            cabecerasHistorial={cabecerasHistorial}
            datosHistorial={datosHistorial}
            onClickGuardar={onClickGuardarAction}
            guardarConfiguracion={guardarConfiguracion}
            onClickDescargarHistorial={onClickDescargarHistorialAction}
            onClickDescargarTodoHistorial={onClickDescargarTodoHistorialAction}
          />}
        </React.Fragment>
      default :
        return null
    }
  }
}

Usuarios.propTypes = {
  actions: T.object,
  usuarios: T.object,
  enqueueSnackbar: T.func,
};

const mapStateToProps = createStructuredSelector({
  usuarios: makeSelectUsuarios(),
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

const withReducer = injectReducer({ key: 'usuarios', reducer });
const withSaga = injectSaga({ key: 'usuarios', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(Usuarios);
