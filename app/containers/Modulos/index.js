/**
 *
 * Modulos
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose,bindActionCreators } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { MuiThemeProvider } from "@material-ui/core/styles";
import withNotifier from'components/HOC/withNotifier';
import{enqueueSnackbar}from'reducers/notifications/actions';
import Appbar from 'components/Appbar';
import { DAEMON } from 'utils/constants';
import makeSelectModulos from './selectors';
import reducer from './reducer';
import saga from './saga';
import Actions from './actions';

// Componentes
import Tabla from './componentes/Tabla';
import AgregarNuevoModulo from './componentes/AgregarNuevoModulo';

// Estilos
import getMuiTheme from './style';

/* eslint-disable react/prefer-stateless-function */
export class Modulos extends React.Component {

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

  componentWillMount(){
    const {
      actions: {
        setStepperAction,
        setSelectedAction,
        setPageAction,
      },
    } = this.props;
    setStepperAction(0);
    setSelectedAction([]);
    setPageAction(0);
  }

  render(){
    const {
      actions : {
        getMaterialesAction,
        setRowAction,
        removeRowAction,
        postMovimientosAction,
        setRowCantidadAction,
        setRowComentarioAction,
        regresarAction,
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
        setTextoModalAction,
        setTextfielddescripcionTextAction,
        setTextfieldmoduloTextAction,
        setStepperaddmoduloAction,
        setTextfieldnombrefuncionTextAction,
        setTipoagrupadoresAction,
        setUrlfuncionAction,
        postModuloAction,
        postFuncionesAction,
        setVacioNombreModuloAction,
        setOpenmodulosalirAction,
        getModulofuncionAction,
        getListadoAction,
        setListadoAction,
        setOpenmodulosalirfuncionAction,
        getTipoagrupadoresAction,
        setTipoagrupadoresTextAction,
        getUrlfuncionAction,
        setUrlfuncionSelectAction,
        setVisualizatablaAction,
        getValidaexistemoduloAction,
        setDatosguardarAction,
        setActualizafuncionAction,
        setSelecttipoagrupadorAction,
        setSelecturlfuncionAction,
        setIdmoduloAction,
        setListadoDesactivarFuncionesAction,
        setListadoActivarFuncionesAction,
        setModalfuncionesdisableAction,
        setModulosdisableAction,
        setNombremodulosinactualizarAction,
      },
      modulos : {
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
          textFieldNombreFuncion,
          nombreBottonModalAddFuncion,
          tipoAgrupador,
          tipoAgrupadorSlc,
          urlFuncion,
          urlFuncionSlc,
          mensajeLabel,
          vacioNombreModulo,
          openModalAddModulo,
          IdModulo,
          FuncionId,
          usuario,
          labelTipoAgrupador,
          labelNombreFuncion,
          labelUrlFuncion,
          openMensajeSalirFuncion,
          visualizaTabla,
          nombreTipoAgrupador,
          datosGuardar,
          actualizaFuncion,
          modalFuncionesDisable,
          moduloSoloLectura,
          nombreModuloSinActualizar,
          getEmpresas,
        },
      },
      enqueueSnackbar : enqueueSnackbarAction,
    } = this.props;

    const rows = [
      { id: 'ModuloId', numeric: false, disablePadding: false, label: '#', filter: true },
      { id: 'NombreModulo', numeric: false, disablePadding: false, label: 'Módulo', filter: true },
      { id: 'Descripcion', numeric: false, disablePadding: false, label: 'Descripción', filter: true },
      { id: 'Activo', numeric: false, disablePadding: false, label: 'Estatus', filter: true },
      { id: 'Acciones', numeric: false, disablePadding: false, label: ' ' },
    ];
    
    switch(stepper){
      case 0 :
        return (  
          <React.Fragment>
            <Appbar 
              texto='Catálogo Módulos'
            />
            <div 
              style={
                {
                  height: '85vh',
                  padding: '0 8px 8px 8px',
                  overflow: 'auto',
                }
              }
            > 
              <MuiThemeProvider theme={getMuiTheme}>
                <Tabla
                  // Cabeceras de la tabla
                  rows={rows}

                  // idFila
                  idFila="ModuloId"

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
                  setTextoModalAction={setTextoModalAction}
                  notificacion = {enqueueSnackbarAction}
                  setTextfieldmoduloTextAction={setTextfieldmoduloTextAction}
                  setIdmoduloAction={setIdmoduloAction}
                  setTextfielddescripcionTextAction={setTextfielddescripcionTextAction}
                  setModalfuncionesdisableAction={setModalfuncionesdisableAction}
                  setModulosdisableAction={setModulosdisableAction}
                  moduloSoloLectura={moduloSoloLectura}
                  setNombremodulosinactualizarAction={setNombremodulosinactualizarAction}
                  
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
                  permisos={permisos}
                  
                  // Paginador
                  rowsPerPageOptions={[5, 10, 25]} 
                />
              </MuiThemeProvider>    
            </div>
          </React.Fragment>
        );
      case 1 :
        return (
          <AgregarNuevoModulo
            getMaterialesAction = {getMaterialesAction}
            setRowAction = {setRowAction}
            removeRowAction = {removeRowAction}
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
            setTextfieldmoduloTextAction={setTextfieldmoduloTextAction}
            textFieldModulo = {textFieldModulo}
            textFieldDescripcion = {textFieldDescripcion}
            setStepperaddmoduloAction ={setStepperaddmoduloAction}
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
            notificacion={enqueueSnackbarAction}
            setModalfuncionesdisableAction={setModalfuncionesdisableAction}
            nombreModuloSinActualizar={nombreModuloSinActualizar}
            setNombremodulosinactualizarAction={setNombremodulosinactualizarAction}
            
            // State
            order={order}
            orderBy={orderBy}
            data={data} 
            filterData={filterData}
            page={page}
            rowsPerPage={rowsPerPage}
            open ={open}
            openM={openM}
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

            //
            urlFuncion = {urlFuncion}
            urlFuncionSlc ={urlFuncionSlc}
            setUrlfuncionAction ={setUrlfuncionAction}
            guardaModulo = {postModuloAction}
            guardaFuncion ={postFuncionesAction}
            mensajeLabel ={mensajeLabel}
            vacioNombreModulo = {vacioNombreModulo}
            setVacioNombreModuloAction ={setVacioNombreModuloAction}
            openModalAddModulo = {openModalAddModulo}
            setOpenmodulosalirAction ={setOpenmodulosalirAction}
            IdModulo = {IdModulo}
            getModulofuncionAction = {getModulofuncionAction}
            getListadoAction = {getListadoAction}
            setListadoAction={setListadoAction}
            FuncionId = {FuncionId}
            usuario={usuario}
            labelTipoAgrupador={labelTipoAgrupador}
            labelNombreFuncion={labelNombreFuncion}
            labelUrlFuncion={labelUrlFuncion}
            openMensajeSalirFuncion={openMensajeSalirFuncion}
            setOpenmodulosalirfuncionAction={setOpenmodulosalirfuncionAction}
            getTipoagrupadoresAction={getTipoagrupadoresAction}
            setTipoagrupadoresTextAction={setTipoagrupadoresTextAction}
            getUrlfuncionAction={getUrlfuncionAction}
            setUrlfuncionSelectAction={setUrlfuncionSelectAction}
            visualizaTabla={visualizaTabla}
            setVisualizatablaAction={setVisualizatablaAction}
            getValidaexistemoduloAction = {getValidaexistemoduloAction}
            nombreTipoAgrupador={nombreTipoAgrupador}
            setDatosguardarAction = {setDatosguardarAction}
            datosGuardar ={datosGuardar}
            setActualizafuncionAction = {setActualizafuncionAction}
            actualizaFuncion={actualizaFuncion}
            setSelecttipoagrupadorAction={setSelecttipoagrupadorAction}
            setSelecturlfuncionAction = {setSelecturlfuncionAction}
            setIdmoduloAction={setIdmoduloAction}
            setListadoDesactivarFuncionesAction={setListadoDesactivarFuncionesAction}
            setListadoActivarFuncionesAction={setListadoActivarFuncionesAction}
            modalFuncionesDisable={modalFuncionesDisable}
            moduloSoloLectura={moduloSoloLectura}
            setModulosdisableAction={setModulosdisableAction}
            getEmpresas={getEmpresas}
            permisos={permisos}

            // Paginador
            rowsPerPageOptions={[5, 10, 25]} 
          />
        );
      default :
        return null
    }
  }
}

Modulos.propTypes = {
  actions: T.object,
  modulos: T.object,
  enqueueSnackbar: T.func,
};


const mapStateToProps = createStructuredSelector({
  modulos: makeSelectModulos(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { enqueueSnackbar}, 
    dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'modulos', reducer });
const withSaga = injectSaga({ key: 'modulos', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(Modulos);
