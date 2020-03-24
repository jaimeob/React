/**
 *
 * ConfiguracionBono
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose,bindActionCreators } from 'redux';
import withNotifier from'components/HOC/withNotifier';
import{enqueueSnackbar}from'reducers/notifications/actions';
import Appbar from 'components/Appbar';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { MuiThemeProvider } from "@material-ui/core/styles";
import { DAEMON } from 'utils/constants';
import makeSelectConfiguracionBono from './selectors';
import reducer from './reducer';
import saga from './saga';
import Actions from './actions';

// Componentes
import RegistrarBono from './componentes/RegistrarBono';
import Tabla from './componentes/Tabla';

import Empty from './componentes/Empty';

// Estilos
import getMuiTheme from './style';



/* eslint-disable react/prefer-stateless-function */
export class ConfiguracionBono extends React.Component {

  componentDidMount(){
    const {
      actions: {
        getConfiguracionBonoAction,
        setSelectedAction,
      },
    } = this.props;
    setSelectedAction([]);
    getConfiguracionBonoAction(0);
  }

  render() {
    const {
      permisos,
      actions : {
        setTextfieldGrupoAction,
        setTextfieldDiasAction,
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
        setOpenmodulosalirAction,
        setIdmoduloAction,
        setModalfuncionesdisableAction,
        setModulosdisableAction,
        setMensajeLabelAction,
        puestosConfiguracionBonoAction,
        setPuestosDragAction,
        setIdAction,
        setVacioNombreAction,
        getValidaExisteAction,
        postGuardarAction,
        setNombreSinActualizarAction,
        setPuestosAsignadosAction,
      },
      configuracionBono : {
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
          textFieldGrupo,
          textFieldDias,
          openModalAddModulo,
          moduloSoloLectura,
          vacioGrupo,
          mensajeLabelGrupo,
          mensajeLabelDias,
          vacioDias,
          idConfiguracionBono,
          puestos,
          puestosAsigandos,
          nombreSinActualizar,
          puestosIds,
        },
      },
      enqueueSnackbar : enqueueSnackbarAction,
      
    } = this.props;
    

    const rows = [
      { id: 'ConfiguracionBonoId', disablePadding: true, label: '#', direction:"left", filter: true },
      { id: 'Grupo', disablePadding: true, label: 'Grupo',  direction:"left", filter: true },
      { id: 'Dias', disablePadding: true, label: 'Dias', direction:"left", filter: true },
      { id: 'TotalPuestos', disablePadding: true, label: 'Total Puestos', direction:"left", filter: true },
      { id: 'Activo', disablePadding: true, label: 'Estatus', direction:"left", filter: true },
    ];
    
    switch(stepper){
      case 0 :
        return (  
          <React.Fragment>
            <Appbar 
              texto='Configuración de bonos'
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
                      idFila="ConfiguracionBonoId"

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
                      
                      setIdmoduloAction={setIdmoduloAction}
                      setTextfielddescripcionTextAction={setTextfielddescripcionTextAction}
                      setModalfuncionesdisableAction={setModalfuncionesdisableAction}
                      setModulosdisableAction={setModulosdisableAction}
                      moduloSoloLectura={moduloSoloLectura}
                      
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
                      setIdAction={setIdAction}
                      permisos={permisos}
                      setOpenmodulosalirAction={setOpenmodulosalirAction}
                      setTextfieldGrupoAction = {setTextfieldGrupoAction}
                      setTextfieldDiasAction={setTextfieldDiasAction}
                      
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
          <RegistrarBono
            setTextfieldGrupoAction={setTextfieldGrupoAction}
            textFieldGrupo={textFieldGrupo}
            setTextfieldDiasAction={setTextfieldDiasAction}
            textFieldDias={textFieldDias}
            vacioGrupo={vacioGrupo}       
            setMensajeLabelAction={setMensajeLabelAction}
            mensajeLabelGrupo={mensajeLabelGrupo}     
            mensajeLabelDias={mensajeLabelDias}
            vacioDias={vacioDias}
            setOpenmodulosalirAction={setOpenmodulosalirAction}
            openModalAddModulo={openModalAddModulo}
            setStepperAction={setStepperAction}
            puestosConfiguracionBonoAction={puestosConfiguracionBonoAction}
            puestos={puestos}
            puestosAsigandos={puestosAsigandos}
            setPuestosDragAction={setPuestosDragAction}
            nombreSinActualizar={nombreSinActualizar}
            setVacioNombreAction={setVacioNombreAction}
            getValidaExisteAction={getValidaExisteAction}
            idConfiguracionBono={idConfiguracionBono}
            postGuardarAction={postGuardarAction}
            setSelectedAction={setSelectedAction}
            filterData={filterData}
            selected={selected}
            setNombreSinActualizarAction={setNombreSinActualizarAction}
            setPuestosAsignadosAction={setPuestosAsignadosAction}
            setIdAction={setIdAction}
            puestosIds={puestosIds}
            moduloSoloLectura={moduloSoloLectura}
            setModulosdisableAction={setModulosdisableAction}
          />
        );
      default :
        return null
    }
  }
}

ConfiguracionBono.propTypes = {
  actions: T.object,
  configuracionBono: T.object,
  enqueueSnackbar: T.func,
};


const mapStateToProps = createStructuredSelector({
  configuracionBono: makeSelectConfiguracionBono(),
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

const withReducer = injectReducer({ key: 'configuracionBono', reducer });
const withSaga = injectSaga({ key: 'configuracionBono', saga ,mode: DAEMON});
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(ConfiguracionBono);
