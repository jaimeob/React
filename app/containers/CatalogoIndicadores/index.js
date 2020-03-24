/**
 *
 * CatalogoIndicadores
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose,bindActionCreators } from 'redux';
import { DAEMON } from 'utils/constants';
import withNotifier from'components/HOC/withNotifier';
import{enqueueSnackbar}from'reducers/notifications/actions';
import Appbar from 'components/Appbar';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { MuiThemeProvider } from "@material-ui/core/styles";
import makeSelectCatalogoIndicadores from './selectors';
import reducer from './reducer';
import saga from './saga';
import Actions from './actions';
import RegistrarIndicador from './componentes/RegistrarIndicador'

import Tabla from './componentes/Tabla';
import getMuiTheme from './style';
import Empty from './componentes/Empty';




/* eslint-disable react/prefer-stateless-function */
export class CatalogoIndicadores extends React.Component {

  componentDidMount(){
    const {
      actions: {
        consultaIndicadorAction,
        setSelectedAction,
        obtenerPermisosAction,
      },
    } = this.props;
    // obtenerPermisosAction();
    consultaIndicadorAction();
    setSelectedAction([]);
  }


  render() {
    const {
      permisos,
      actions : {
        setTextfieldNombreAction,
        setTextfieldDescripcionAction,
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
        settextFieldNombreTextAction,
        setVacioNombreAction,
        setOpenmodulosalirAction,
        getValidaExisteAction,
        setActualizaAction,
        setIdmoduloAction,
        setModalfuncionesdisableAction,
        setModulosdisableAction,
        setNombreSinActualizarAction,
        setMensajeLabelAction,
        postGuardaIndicadorAction,
        setIdAction,
        setModoLecturaAction,
        consultaIndicadorAction,
      },
      catalogoIndicadores : {
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
        },
        nuevoModulo:{
          textFieldNombre,
          textFieldDescripcion,
          openModalAddModulo,
          moduloSoloLectura,
          nombreSinActualizar,
          vacioGrupo,
          mensajeLabelGrupo,
          mensajeLabelDias,
          vacioDias,
          idIndicador,
          puestos,
          puestosAsigandos,
          
        },
      },
      
      enqueueSnackbar : enqueueSnackbarAction,
    } = this.props;
    
    const rows = [
      { id: 'id', disablePadding: true, label: '#', direction:"left", filter: true },
      { id: 'Nombre', disablePadding: true, label: 'Indicador',  direction:"left", filter: true },
      
      { id: 'Activo', disablePadding: true, label: 'Estatus', direction:"left", filter: true },
    ];
    
    switch(stepper){
      case 0 :
        return (  
          <React.Fragment>
            <Appbar 
              texto='Catalogo de indicadores'
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
              {
                data.length > 0
                  ?
                  <MuiThemeProvider theme={getMuiTheme}>
                    <Tabla
                      // Cabeceras de la tabla
                      rows={rows}

                      // idFila
                      idFila="id"

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
                      settextFieldNombreTextAction={settextFieldNombreTextAction}
                      setIdmoduloAction={setIdmoduloAction}
                      setTextfielddescripcionTextAction={setTextfielddescripcionTextAction}
                      setModalfuncionesdisableAction={setModalfuncionesdisableAction}
                      setModulosdisableAction={setModulosdisableAction}
                      moduloSoloLectura={moduloSoloLectura}
                      setActualizaAction={setActualizaAction}
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
                      idIndicador={idIndicador}
                      setIdAction={setIdAction}
                      permisos={permisos}
                      setOpenmodulosalirAction={setOpenmodulosalirAction}
          
                      // Paginador
                      rowsPerPageOptions={[5, 10, 25]} 
                    />
                  </MuiThemeProvider>     
                  : <Empty setStepperAction={setStepperAction} />
              }  
            </div>
          </React.Fragment>
        );
      case 1 :
        return (
          <RegistrarIndicador
            textFieldNombre={textFieldNombre}
            setTextfieldDescripcionAction={setTextfieldDescripcionAction}
            textFieldDescripcion={textFieldDescripcion}
            vacioGrupo={vacioGrupo}       
            setMensajeLabelAction={setMensajeLabelAction}
            mensajeLabelGrupo={mensajeLabelGrupo}     
            mensajeLabelDias={mensajeLabelDias}
            vacioDias={vacioDias}
            setOpenmodulosalirAction={setOpenmodulosalirAction}
            openModalAddModulo={openModalAddModulo}
            setStepperAction={setStepperAction}
            puestos={puestos}
            puestosAsigandos={puestosAsigandos}
            idIndicador={idIndicador}
            setTextfieldNombreAction={setTextfieldNombreAction}
            moduloSoloLectura={moduloSoloLectura}
            postGuardaIndicadorAction={postGuardaIndicadorAction}
            selected={selected}
            filterData={filterData}
            setSelectedAction={setSelectedAction}
            nombreSinActualizar={nombreSinActualizar}
            setNombreSinActualizarAction={setNombreSinActualizarAction}
            setVacioNombreAction={setVacioNombreAction}
            getValidaExisteAction={getValidaExisteAction}
            setModoLecturaAction={setModoLecturaAction}
            consultaIndicadorAction={consultaIndicadorAction}
          />
        );
      default :
        return null
    }
  }
}

CatalogoIndicadores.propTypes = {
  actions: T.object,
  catalogoIndicadores: T.object,
  enqueueSnackbar: T.func,
  permisos: T.object,
};

const mapStateToProps = createStructuredSelector({
  catalogoIndicadores: makeSelectCatalogoIndicadores(),
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

const withReducer = injectReducer({ key: 'catalogoIndicadores', reducer });
const withSaga = injectSaga({ key: 'catalogoIndicadores', saga,mode: DAEMON });
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions
)(CatalogoIndicadores);
