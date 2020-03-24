/**
 *
 * EntregaIndicador
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
import { DAEMON } from 'utils/constants';
import makeSelectEntregaIndicador from './selectors';
import reducer from './reducer';
import saga from './saga';
import Actions from './actions';

import Table from './componentes/Tabla'

/* eslint-disable react/prefer-stateless-function */
export class EntregaIndicador extends React.Component {
  componentDidMount(){
    const {
      actions: {
        obtenerPermisosAction,
        getValoresEtiquetasAction,
        getEntregaIndicadorAction,
        getCombosFiltrosAction,
      },
    } = this.props
    //obtenerPermisosAction();
    getValoresEtiquetasAction();
    getCombosFiltrosAction();
    getEntregaIndicadorAction();
  }

  selectedRows = (selectedRows) => {
    const {
      actions:{setSelectedAction},
    } = this.props
    setSelectedAction(selectedRows)
  }

  render() {
    const {
      actions :{postEntregaIndicadorAction,onChangeParametrosAction},
      entregaIndicador:{
        permisos,
        listadoEntregaIndicador: {
          backend: {
            data,
          },
          frontend: {
            rows,
          },
        },
        text,
        totalEvaluados,
        aplicaBono,
        pendienteEntrega,
        Direccion,
        Plaza,
        Departamento,
        Puesto,
        selectDireccion,
        selectPlaza,
        selectDepartamento,
        selectPuesto,
        filtroDireccion,
        filtroPlaza,
        filtroDepartamento,
        filtroPuesto,
        selectEstatus,
        filtroEstatus,
      },
      enqueueSnackbar : enqueueSnackbarAction,
    } = this.props
    
    
    return (
      <React.Fragment>
        <Appbar 
          texto='Check List de indicadores entregados'
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
          <div style={{textAlign:'center'}}>Marque el empleado que ya ha entregado el indicador.</div>
          <Table
            rows={rows}
            data={data}
            text={text}
            Direccion={Direccion}
            Plaza={Plaza}
            Departamento={Departamento}
            Puesto={Puesto}
            selectPlaza={selectPlaza}
            selectDepartamento={selectDepartamento}
            selectPuesto={selectPuesto}
            selectDireccion={selectDireccion}
            onChangeParametros={onChangeParametrosAction}
            totalEvaluados={totalEvaluados}
            aplicaBono={aplicaBono}
            pendienteEntrega={pendienteEntrega}
            filtroDireccion={filtroDireccion}
            filtroPlaza={filtroPlaza}
            filtroDepartamento={filtroDepartamento}
            filtroPuesto={filtroPuesto}
            selectEstatus={selectEstatus}
            filtroEstatus={filtroEstatus}
            search
            filters
            addNewRow={this.addNewRow}
            selectedAction={(selectedRows) => this.selectedRows(selectedRows)}
            toolbarActions={
              [
                {
                  title: 'Entregado', icon: 'activate', action: (selectedRows) => postEntregaIndicadorAction(selectedRows),
                },
              ]
            }
            actions={
              [
              ]
            }
          />
          
          
        </div>
      </React.Fragment>
    );
  }
}

EntregaIndicador.propTypes = {
  actions: T.object,
  entregaIndicador: T.object,
  enqueueSnackbar: T.func,
};

const mapStateToProps = createStructuredSelector({
  entregaIndicador: makeSelectEntregaIndicador(),
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

const withReducer = injectReducer({ key: 'entregaIndicador', reducer });
const withSaga = injectSaga({ key: 'entregaIndicador', saga,mode: DAEMON });
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(EntregaIndicador);
