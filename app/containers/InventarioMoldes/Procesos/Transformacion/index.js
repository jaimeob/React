/**
 *
 * Transformación
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { DAEMON } from 'utils/constants';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withNotifier from 'components/HOC/withNotifier';
import grey from '@material-ui/core/colors/grey';
import {enqueueSnackbar} from 'reducers/notifications/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTransformacion from './selectors';
import reducer from './reducer';
import Actions from './actions';
import saga from './saga';
import Tabla from '../../../../components/DataTable';
import MovimientoNuevo from './components/MovimientoNuevo';
import MovimientoDetalle from './components/MovimientoDetalle';
// import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';

/* eslint-disable react/prefer-stateless-function */
export class Transformacion extends React.Component {
  componentWillMount() {
    const {
      actions: {
        getMovimientosTransformacionesAction,
        getTransformacionesAction,
        getMoldesAction,
        getPlazasAction,
        //obtenerPermisosAction,
      },
    } = this.props;

    //obtenerPermisosAction();
    getMovimientosTransformacionesAction();
    getTransformacionesAction();
    getMoldesAction();
    getPlazasAction();
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
        nuevaTransformacionAction,
        regresarAction,
        onInputChangeAction,
        onChangeSeccionTabAction,
        getMoldesDestinoAction,
        setMoldeSeleccionadoAction,
        closeModalAction,
        postMovimientoAction,
        openModalAction,
        getMovimientoTransformacionDetalleAction,
        plantaFilterAction,
        devolverAction,
      },
      transformacion: {
        // permisos: {
        //   normales,
        // },
        transformacionTabla: {
          disabled,
          stepper,
          datos,
          cabeceras,
          configuracion,
          pestanaSlc,
          nuevaTransformacion,
          modal,
          plantaSlc,
          tableText,
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
                  Movimientos de transformaciones
                </Typography> 
              </Toolbar> 
            </AppBar>
            <Tabla
              // {...(normales.registrar === 1 ? {
              //   onClickAgregar: () => {
              //     nuevaTransformacionAction()
              //   },
              // } : {} )}
              permisos={permisos}
              onClickAgregar={nuevaTransformacionAction}
              data = {datos}
              headers = {cabeceras}
              configuracion = {configuracion}
              idPosition = "IdMovimientoTransformacion"
              admin
              opciones = {
                [
                  // {'icon' : 'descargar'},
                  {'icon' : 'ver', 'action' : getMovimientoTransformacionDetalleAction},
                ]
              }
              small = {0}
            />
          </div>
        );
      case 1: 
        return(
          <MovimientoNuevo
            tableText={tableText}
            pestanaSlc={pestanaSlc}
            regresarAction={regresarAction}
            nuevaTransformacion={nuevaTransformacion}
            onInputChange={onInputChangeAction}
            onChangeSeccionTabAction={onChangeSeccionTabAction}
            getMoldesDestinoAction={getMoldesDestinoAction}
            setMoldeSeleccionadoAction={setMoldeSeleccionadoAction}
            disabled={disabled}
            modal={modal}
            closeModalAction={closeModalAction}
            openModalAction={openModalAction}
            postMovimientoAction={postMovimientoAction}
            plantaSlc={plantaSlc}
            plantaFilterAction={plantaFilterAction}
          />
        )
      case 2: 
        return (
          // <AppBar style={{backgroundColor: grey[200]}} position="static"> 
          //   <Toolbar variant="dense" style={{paddingLeft: 8}}> 
          //     <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
          //       Movimientos de transformaciones Detalle
          //     </Typography> 
          //   </Toolbar> 
          // </AppBar>
          <MovimientoDetalle
            pestanaSlc={pestanaSlc}
            regresarAction={regresarAction}
            nuevaTransformacion={nuevaTransformacion}
            onChangeSeccionTabAction={onChangeSeccionTabAction}
            devolverAction={devolverAction}
            modal={modal}
            closeModalAction={closeModalAction}
            openModalAction={openModalAction}
          />
        )
      default: 
        return null;
    }
  }
}

Transformacion.propTypes = {
  actions: T.object,
  transformacion: T.object,
  permisos:T.object,
};

const mapStateToProps = createStructuredSelector({
  transformacion: makeSelectTransformacion(),
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

const withReducer = injectReducer({ key: 'transformacion', reducer });
const withSaga = injectSaga({ key: 'transformacion', saga,  mode:DAEMON});
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(Transformacion);
