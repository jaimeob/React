/**
 *
 * Modulos
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
import {enqueueSnackbar} from 'reducers/notifications/actions';
import { MuiThemeProvider } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import { DAEMON } from 'utils/constants';
import makeSelectRoles from './selectors';
import reducer from './reducer';
import saga from './saga';
import Actions from './actions';
// Componentes
import Tabla from './componentes/Tabla';
import Header from '../Modulos/componentes/Header';
import AgregarNuevoRol from './componentes/AgregarNuevoRol'


// Estilos
import getMuiTheme from '../Modulos/style';

/* eslint-disable react/prefer-stateless-function */
export class Roles extends React.Component {

  componentWillMount(){
    const {
      actions: {
        setStepperAction,
        setIdRolEmpresaAction,
        setSoloLecturaRolAction,
      },
    } = this.props;
    setStepperAction(0);
    setIdRolEmpresaAction(0);
    setSoloLecturaRolAction(false);
  }

  componentDidMount(){
    const {
      actions: {
        getListadoAction,
        setSelectedAction,
      },
    } = this.props;
    getListadoAction();
    setSelectedAction([]);
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
        setTextfielddescripcionTextAction,
        setTextfieldnombrerolTextAction,
        setIdmoduloAction,
        setObjetosinactualizarAction,
        setSelectedPermisosNormalesAction,
        setSelectedPermisosEspecialesAction,
        postMovimientosAction,
        setRowCantidadAction,
        setRowComentarioAction,
        regresarAction,
        setTextoModalAction,
        setStepperopenmodaladdAction,
        setTextfieldnombrefuncionTextAction,
        setTipoagrupadoresAction,
        setUrlfuncionAction,
        postRolAction,
        postFuncionesAction,
        setVacioNombreModuloAction,
        setOpenmodulosalirAction,
        getListadoAction,
        setListadoAction,
        setOpenmodulosalirmodalAction,
        getTipoagrupadoresAction,
        setTipoagrupadoresTextAction,
        getUrlfuncionAction,
        setUrlfuncionSelectAction,
        setVisualizatablaAction,
        getValidaexisterolAction,
        setDatosGuardarAction,
        setActualizafuncionAction,
        setSelecttipoagrupadorAction,
        setSelecturlfuncionAction,
        setListadoDesactivarEmpresasAction,
        setListadoActivarFuncionesAction,
        setModalfuncionesdisableAction,
        setModulosdisableAction,
        getEmpresasAction,
        getModulosAction,
        setSelectEmpresasAction,
        onChangeParametrosAction,
        handleClickListaAction,
        getModuloFuncionAction,
        getRolesAction,
        setStepperaddmoduloAction,
        setOpenModalPermisosEspecialesAction,
        setActualizaPermisosAction,
        setListadoActivarEmpresasAction,
        setIdRolEmpresaAction,
        setSoloLecturaRolAction,
        setSoloLecturaEmpresaAction,
      },
      roles : {
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
          textoModal,
          articulos,
          agrupadores,
          agrupadorSlc,
          modal,
          movimiento,
        },
        nuevoModulo:{
          textFieldModulo,
          textFieldDescripcion,
          stepperaddmodulo,
          openM,
          openMPermisosEspeciales,
          textFieldNombreFuncion,
          nombreBottonModalAddFuncion,
          tipoAgrupador,
          tipoAgrupadorSlc,
          urlFuncion,
          urlFuncionSlc,
          mensajeLabel,
          vacioNombreModulo,
          openModalAddModulo,
          IdRol,
          IdRolEmpresa,
          FuncionId,
          labelTipoAgrupador,
          labelNombreFuncion,
          labelUrlFuncion,
          openMensajeSalirFuncion,
          visualizaTabla,
          nombreTipoAgrupador,
          datosGuardar,
          actualizaPermisos,
          modalFuncionesDisable,
          moduloSoloLecturaRol,
          nombreModuloSinActualizar,
          getEmpresas,
          selectEmpresa,
          getModulos,
          selectModulos,
          lista,
          opciones,
          IdEmpresa,
          loading,
          openMensajeRemplazaEmpresa,
          moduloSoloLecturaEmpresa,
        },
      },
      usuarioId,
      enqueueSnackbar : enqueueSnackbarAction,
    } = this.props;

    const rows = [
      { id: 'RolId', numeric: false, disablePadding: false, label: '#', filter: true },
      { id: 'NombreRol', numeric: false, disablePadding: false, label: 'Rol', filter: true },
      { id: 'Descripcion', numeric: false, disablePadding: false, label: 'Descripción', filter: true },
      { id: 'Activo', numeric: false, disablePadding: false, label: 'Estatus', filter: true },
      { id: 'Acciones', numeric: false, disablePadding: false, label: ' ' },
    ];

    switch(stepper){
      case 0 :
        return (  
          <div>
            <Header title="Catálogo Roles" />
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
                  idFila="RolId"

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
                  notificacion={enqueueSnackbarAction}
                  setObjetosinactualizarAction={setObjetosinactualizarAction}
                  setTextfieldnombrerolTextAction={setTextfieldnombrerolTextAction}
                  setTextfielddescripcionTextAction={setTextfielddescripcionTextAction}
                  setIdmoduloAction={setIdmoduloAction}
                  setListadoDesactivarEmpresasAction={setListadoDesactivarEmpresasAction}
                  setSoloLecturaRolAction={setSoloLecturaRolAction}

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
                  moduloSoloLecturaRol={moduloSoloLecturaRol}
    
                  // Paginador
                  rowsPerPageOptions={[5, 10, 25]} 
                />
              </MuiThemeProvider>    
            </Grid>
          </div>
        );
      case 1 :
        return (
          <AgregarNuevoRol
            postMovimientosAction = {postMovimientosAction}
            selected={selected}
            setStepperAction ={setStepperAction}
            articulos = {articulos}
            agrupadores = {agrupadores}
            agrupadorSlc = {agrupadorSlc}
            modal = {modal}
            movimiento = {movimiento}
            setRowCantidadAction={setRowCantidadAction}
            setRowComentarioAction={setRowComentarioAction}
            regresarAction={regresarAction}
            setTextfielddescripcionTextAction={setTextfielddescripcionTextAction}
            setTextfieldnombrerolTextAction={setTextfieldnombrerolTextAction}
            textFieldModulo = {textFieldModulo}
            textFieldDescripcion = {textFieldDescripcion}
            setStepperopenmodaladdAction ={setStepperopenmodaladdAction}
            stepperaddmodulo = {stepperaddmodulo}
        
            rows={rows}

            // idFila
            idFila="FuncionId"

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
            setListadoActivarAction={setListadoActivarAction}
            setListadoDesactivarAction={setListadoDesactivarAction}
            setActivarRegistrosAction={setActivarRegistrosAction}
            setTextoModalAction={setTextoModalAction}
            notificacion = {enqueueSnackbarAction}
            setModalfuncionesdisableAction={setModalfuncionesdisableAction}
            nombreModuloSinActualizar={nombreModuloSinActualizar}
            setObjetosinactualizarAction={setObjetosinactualizarAction}
            setSelectEmpresasAction={setSelectEmpresasAction}
            setStepperaddmoduloAction={setStepperaddmoduloAction}
            
            setSelectedPermisosNormalesAction={setSelectedPermisosNormalesAction}
            setSelectedPermisosEspecialesAction={setSelectedPermisosEspecialesAction}
            setOpenModalPermisosEspecialesAction={setOpenModalPermisosEspecialesAction}
            setListadoDesactivarEmpresasAction={setListadoDesactivarEmpresasAction }
            setIdRolEmpresaAction={setIdRolEmpresaAction}
            // State
            order={order}
            orderBy={orderBy}
            data={data} 
            filterData={filterData}
            page={page}
            rowsPerPage={rowsPerPage}
            open ={open}
            openM={openM}
            openMPermisosEspeciales={openMPermisosEspeciales}
            openSearch={openSearch}
            searchText={searchText}
            openModal={openModal}
            openMenuContextual={openMenuContextual}
            stepper={stepper}
            activarRegistros={activarRegistros}
            textoModal={textoModal}
            textFieldNombreFuncion = {textFieldNombreFuncion}
            setTextfieldnombrefuncionTextAction ={setTextfieldnombrefuncionTextAction}
            nombreBottonModalAddFuncion = {nombreBottonModalAddFuncion}
            tipoAgrupador = {tipoAgrupador}
            tipoAgrupadorSlc ={tipoAgrupadorSlc}
            setTipoagrupadoresAction ={setTipoagrupadoresAction}
            IdEmpresa={IdEmpresa}

            //
            urlFuncion = {urlFuncion}
            urlFuncionSlc ={urlFuncionSlc}
            setUrlfuncionAction ={setUrlfuncionAction}
            postRolAction = {postRolAction}
            guardaFuncion ={postFuncionesAction}
            mensajeLabel ={mensajeLabel}
            vacioNombreModulo = {vacioNombreModulo}
            setVacioNombreModuloAction ={setVacioNombreModuloAction}
            openModalAddModulo = {openModalAddModulo}
            setOpenmodulosalirAction ={setOpenmodulosalirAction}
            IdRol = {IdRol}
            IdRolEmpresa = {IdRolEmpresa}
            getListadoAction = {getListadoAction}
            setListadoAction={setListadoAction}
            FuncionId = {FuncionId}
            labelTipoAgrupador={labelTipoAgrupador}
            labelNombreFuncion={labelNombreFuncion}
            labelUrlFuncion={labelUrlFuncion}
            openMensajeSalirFuncion={openMensajeSalirFuncion}
            setOpenmodulosalirmodalAction={setOpenmodulosalirmodalAction}
            getTipoagrupadoresAction={getTipoagrupadoresAction}
            setTipoagrupadoresTextAction={setTipoagrupadoresTextAction}
            getUrlfuncionAction={getUrlfuncionAction}
            setUrlfuncionSelectAction={setUrlfuncionSelectAction}
            visualizaTabla={visualizaTabla}
            setVisualizatablaAction={setVisualizatablaAction}
            getValidaexisterolAction = {getValidaexisterolAction}
            nombreTipoAgrupador={nombreTipoAgrupador}
            setDatosGuardarAction = {setDatosGuardarAction}
            datosGuardar ={datosGuardar}
            setActualizafuncionAction = {setActualizafuncionAction}
            actualizaPermisos={actualizaPermisos}
            setSelecttipoagrupadorAction={setSelecttipoagrupadorAction}
            setSelecturlfuncionAction = {setSelecturlfuncionAction}
            setIdmoduloAction={setIdmoduloAction}
            setListadoActivarFuncionesAction={setListadoActivarFuncionesAction}
            modalFuncionesDisable={modalFuncionesDisable}
            moduloSoloLecturaRol={moduloSoloLecturaRol}
            setModulosdisableAction={setModulosdisableAction}
            getEmpresasAction={getEmpresasAction}
            getModulosAction={getModulosAction}
            getEmpresas={getEmpresas}
            selectEmpresa={selectEmpresa}
            onChangeParametros={onChangeParametrosAction}
            getModulos={getModulos}
            selectModulos={selectModulos}
            lista={lista}
            handleClickLista={handleClickListaAction}
            getModuloFuncionAction={getModuloFuncionAction}
            opciones={opciones}
            getRolesAction={getRolesAction}
            usuarioId={usuarioId}
            setActualizaPermisosAction={setActualizaPermisosAction}
            setListadoActivarEmpresasAction={setListadoActivarEmpresasAction}
            loading={loading}
            setSoloLecturaRolAction={setSoloLecturaRolAction}
            openMensajeRemplazaEmpresa={openMensajeRemplazaEmpresa}
            setSoloLecturaEmpresaAction={setSoloLecturaEmpresaAction}
            moduloSoloLecturaEmpresa={moduloSoloLecturaEmpresa}
            
            // Paginador
            rowsPerPageOptions={[5, 10, 25]} 
          />
        );
      default :
        return null
    }
  }
}

Roles.propTypes = {
  actions: T.object,
  roles: T.object,
  enqueueSnackbar: T.func,
  usuarioId: T.number,
};

const mapStateToProps = createStructuredSelector({
  roles: makeSelectRoles(),
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

const withReducer = injectReducer({ key: 'roles', reducer });
const withSaga = injectSaga({ key: 'roles', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(Roles);
