/**
 *
 * MovimientoAlmacen
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import {DAEMON} from 'utils/constants';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withNotifier from 'components/HOC/withNotifier';
import grey from '@material-ui/core/colors/grey';
import {enqueueSnackbar} from 'reducers/notifications/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMovimientoAlmacen from './selectors';
import reducer from './reducer';
import Actions from './actions';
import saga from './saga';
import Tabla from '../../../../components/DataTable';
import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
import MovimientoNuevo from './components/MovimientoNuevo';
import MovimientoDetalle from './components/MovimientoDetalle';

/* eslint-disable react/prefer-stateless-function */
export class MovimientoAlmacen extends React.Component {
  
  componentWillMount() {
    const {
      actions: {
        getMovimientosAction,
        getPlazasAction,
        getUbicacionesAction,
        getMoldesAction,
        // obtenerPermisosAction,
      },
    } = this.props;

    //obtenerPermisosAction();
    getMovimientosAction();
    getPlazasAction();
    getUbicacionesAction();
    getMoldesAction();
  }

  componentWillUnmount() {
    const {
      actions: {
        regresarAction,
      },
    } = this.props;
    regresarAction();
  }

  render() {

    const {
      permisos,
      actions: {
        regresarAction,
        openModalAction,
        closeModalAction,
        deleteMovimientoAction,
        nuevoMovimientoAction,
        getMovimientoDetalleAction,
        onInputChangeAction,
        onChangeSeccionTabAction,
        getInsumosMoldesAction,
        onInputCantidadAccesorioAction,
        setInsumosSeleccionadosAction,
        postMovimientoAction,
        plantaFilterAction,
        onSearchChangeAction,
      },
      movimientoAlmacen: {
        // permisos: {
        //   normales,
        // },
        movimientosAlmacenesTabla: {
          stepper,
          datos,
          cabeceras,
          configuracion,
          modal,
          update,
          movimientoSelec,
          nuevoMovimiento,
          pestanaSlc,
          disabled,
          plantaSlcA,
          plantaSlcP,
          PDF,
        },
      },
    } = this.props;
    
    switch (stepper) {
      case 0: 
        return (
          <div>
            <AppBar style={{backgroundColor: grey[200]}} position="static"> 
              <Toolbar variant="dense" style={{paddingLeft: 8}}> 
                <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
                  Movimientos de almacenes
                </Typography> 
              </Toolbar> 
            </AppBar>
            <Tabla
              // {...(normales.registrar === 1 ? {
              //   onClickAgregar: () => {
              //     nuevoMovimientoAction()
              //   },
              // } : {} )}
              permisos={permisos}
              onClickAgregar={nuevoMovimientoAction}
              data = {datos}
              headers = {cabeceras}
              configuracion = {configuracion}
              idPosition = "IdMovimientoAlmacen"
              admin
              opciones = {
                [
                  {'icon' : 'ver', 'action' : getMovimientoDetalleAction},
                ]
              }
              small = {0}
            />
            <Modal  
              open={modal.value} 
              typeAlert='Report' 
              typeOptions='Select' 
              title='Confirmar....' 
              message={modal.text}
              onClickCancel={closeModalAction}
              onClickAccept={() => {
                switch (modal.stepper){
                  case 1:
                    deleteMovimientoAction(movimientoSelec)
                    break;
                  default:
                    break;
                }
              }}
            />
          </div>
        );
      case 1: 
        return(
          <MovimientoNuevo
            pestanaSlc={pestanaSlc}
            regresarAction={regresarAction}
            nuevoMovimiento={nuevoMovimiento}
            onInputChange={onInputChangeAction}
            onChangeSeccionTabAction={onChangeSeccionTabAction}
            getInsumosMoldesAction={getInsumosMoldesAction}
            onInputCantidadAccesorioAction={onInputCantidadAccesorioAction}
            setInsumosSeleccionadosAction={setInsumosSeleccionadosAction}
            postMovimientoAction={postMovimientoAction}
            disabled={disabled}
            openModalAction={openModalAction}
            closeModalAction={closeModalAction}
            plantaFilterAction={plantaFilterAction}
            onSearchChange = {onSearchChangeAction}
            plantaSlcA={plantaSlcA}
            plantaSlcP={plantaSlcP}
            modal={modal}
          />
        )
      case 2: 
        return (
          <MovimientoDetalle
            pestanaSlc={pestanaSlc}
            regresarAction={regresarAction}
            nuevoMovimiento={nuevoMovimiento}
            onInputChange={onInputChangeAction}
            onChangeSeccionTabAction={onChangeSeccionTabAction}
            getInsumosMoldesAction={getInsumosMoldesAction}
            onInputCantidadAccesorioAction={onInputCantidadAccesorioAction}
            setInsumosSeleccionadosAction={setInsumosSeleccionadosAction}
            postMovimientoAction={postMovimientoAction}
            disabled={disabled}
            update={update}
            PDF={PDF}
          />
        )
      case 3: 
        return (
          <MovimientoDetalle
            pestanaSlc={pestanaSlc}
            regresarAction={regresarAction}
            nuevoMovimiento={nuevoMovimiento}
            onInputChange={onInputChangeAction}
            onChangeSeccionTabAction={onChangeSeccionTabAction}
            getInsumosMoldesAction={getInsumosMoldesAction}
            onInputCantidadAccesorioAction={onInputCantidadAccesorioAction}
            setInsumosSeleccionadosAction={setInsumosSeleccionadosAction}
            postMovimientoAction={postMovimientoAction}
            disabled={disabled}
            update={update}
          />
        )
      default: 
        return null;
    }
  }
}

MovimientoAlmacen.propTypes = {
  actions: T.object,
  movimientoAlmacen: T.object,
  permisos:T.object,
};

const mapStateToProps = createStructuredSelector({
  movimientoAlmacen: makeSelectMovimientoAlmacen(),
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

const withReducer = injectReducer({ key: 'movimientoAlmacen', reducer });
const withSaga = injectSaga({ key: 'movimientoAlmacen', saga,mode : DAEMON });
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(MovimientoAlmacen);
