/**
 *
 * InventarioPlaza
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { DAEMON } from 'utils/constants';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import withNotifier from 'components/HOC/withNotifier';
import {enqueueSnackbar} from 'reducers/notifications/actions';
import makeSelectInventarioPlaza from './selectors';

import saga from './saga';
import Actions from './actions';
import reducer from './reducer';

import MovimientoSalida from './components/MovimientoSalida';
import ListadoMovimientos from './components/ListadoMovimientos';
import MovimientoDetalle from './components/MovimientoDetalle';
import Reportes from './components/ReportesInventario';

/* eslint-disable react/prefer-stateless-function */
export class InventarioPlaza extends React.Component {

  handleChange = agrupador => event => {
    this.setState({ [agrupador]: event.target.value });
  };
  
  componentWillMount() {
    const {
      actions: {
        getAgrupadoresAction,
        getMovimientosAction,
        getReportesAction,
      },
      inventarioPlaza : {
        inventarioPlazaTabla :{
          plaza,
        },
      },
    } = this.props;

    getAgrupadoresAction();
    getMovimientosAction();
    getReportesAction(plaza.id);
  }

  render() {
    const {
      actions : {
        getMaterialesAction,
        agregarArticuloAction,
        removeRowAction,
        postMovimientosAction,
        setRowCantidadAction,
        setRowComentarioAction,
        agregarNuevoAction,
        regresarAction,
        getMovimientoDetalleAction,
        openModalAction,
        closeModalAction,
        addByIdAction,
        setIdAction,
        setModuloAction,
        setArticuloAction,
        setComentarioAction,
        setCantidadAction,
        openModal2Action,
        closeModal2Action,
        openModal3Action,
        closeModal3Action,
        openModal4Action,
        closeModal4Action,
      },
      inventarioPlaza : {
        inventarioPlazaTabla :{
          headers,
          articulos,
          movimientos,
          stepper,
          agrupadores,
          agrupadorSlc,
          modal,
          modal2,
          modal3,
          modal4,
          movimiento,
          configuracion,
          reportes,
          headersReportes,
          movimientoDetalle,
          materialSlc,
          error,
          disabled,
        },
      },
      permisos,
      usuarioGlobal,
      enqueueSnackbar : enqueueSnackbarAction,
    } = this.props;

    console.log('permisos', permisos)

    switch (stepper) {
      case 0 :
        return (
          <div>
            <ListadoMovimientos 
              notificacion={enqueueSnackbarAction}
              agregarNuevoAction = {agregarNuevoAction}
              headers = {headers}
              movimientos = {movimientos}
              configuracion = {configuracion}
              getMovimientoDetalleAction={getMovimientoDetalleAction}
              permisos={permisos}
              usuarioGlobal={usuarioGlobal}
            />
          </div>
        )
      case 1 :
        return (
          <MovimientoDetalle
            notificacion={enqueueSnackbarAction}
            headers = {movimientoDetalle.headers}
            movimientoDetalle = {movimientoDetalle.rows}
            configuracion = {movimientoDetalle.configuracion}
            regresarAction={regresarAction}
          />
        )
      case 2 :
        return (
          <MovimientoSalida
            notificacion={enqueueSnackbarAction}
            getMaterialesAction = {getMaterialesAction}
            agregarArticuloAction = {agregarArticuloAction}
            removeRowAction = {removeRowAction}
            postMovimientosAction = {postMovimientosAction}
            cabeceras = {movimiento.cabeceras}
            articulos = {articulos}
            agrupadores = {agrupadores}
            agrupadorSlc = {agrupadorSlc}
            modal = {modal}
            modal2={modal2}
            modal3={modal3}
            modal4={modal4}
            movimiento = {movimiento}
            setRowCantidadAction={setRowCantidadAction}
            setRowComentarioAction={setRowComentarioAction}
            regresarAction={regresarAction}
            openModalAction={openModalAction}
            closeModalAction={closeModalAction}
            openModal2Action={openModal2Action}
            closeModal2Action={closeModal2Action}
            openModal3Action={openModal3Action}
            closeModal3Action={closeModal3Action}
            openModal4Action={openModal4Action}
            closeModal4Action={closeModal4Action}
            addByIdAction={addByIdAction}
            setIdAction={setIdAction}
            setModuloAction={setModuloAction}
            setArticuloAction={setArticuloAction}
            setComentarioAction={setComentarioAction}
            setCantidadAction={setCantidadAction}
            materialSlc={materialSlc}
            error={error}
            disabled={disabled}
          />
        );
      case 3 :
        return (
          <Reportes 
            notificacion={enqueueSnackbarAction}
            headers = {headersReportes}
            reportes = {reportes}
            configuracion = {configuracion}
          />
        );
      default: 
        return null;
    }
  }
}

InventarioPlaza.propTypes = {
  actions: T.object,
  inventarioPlaza: T.object,
  enqueueSnackbar: T.func,
  permisos: T.object,
  usuarioGlobal: T.object,
};

const mapStateToProps = createStructuredSelector({
  inventarioPlaza: makeSelectInventarioPlaza(),
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

const withReducer = injectReducer({ key: 'inventarioPlaza', reducer });
const withSaga = injectSaga({ key: 'inventarioPlaza', saga,  mode:DAEMON});
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(InventarioPlaza);
