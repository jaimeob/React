/**
 *
 * ConfiguracionTransformacion
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
import makeSelectConfiguracionTransformacion from './selectors';
import reducer from './reducer';
import Actions from './actions';
import saga from './saga';
import Tabla from '../../../../components/DataTable';
import TransformacionesNuevo from './components/TransformacionesNuevo';
import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';

/* eslint-disable react/prefer-stateless-function */
export class ConfiguracionTransformacion extends React.Component {
  
  componentWillMount() {
    const {
      actions: {
        getTransformacionesAction,
        getMoldesAction,
      },
    } = this.props;

    getTransformacionesAction();
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

  componentDidUpdate() {
    const {
      actions: {
        setSnackbarAction,
      },
      configuracionTransformacion: {
        transformacionesTabla: {
          snackbar,
        },
      },
    } = this.props;

    if(snackbar > 1 && snackbar < 2) {
      setSnackbarAction(1)
    }
    if(snackbar > 2 && snackbar < 3) {
      setSnackbarAction(2)
    }
    if(snackbar > 3) {
      setSnackbarAction(3)
    }
    
  }
  
  render() {

    const {
      permisos,
      actions: {
        nuevaTransformacionAction,
        regresarAction,
        openModalAction,
        closeModalAction,
        deleteTransformacionAction,
        getMoldeIdAction,
        lockMoldesAction,
        unlockMoldesAction,
        dragEndAction,
        postTransformacionAction,
        getTransformacionDetalleAction,
        updateTransformacionAction,
        plantaFilterAction,
        seccionFilterAction,
        removeTaskAction,
      },
      configuracionTransformacion: {
        transformacionesTabla: {
          cabeceras,
          modal,
          datos,
          configuracion,
          stepper,
          transformacionSelec,
          agrupadores,
          disabled,
          show,
          origen,
          destino,
          nuevaTransformacion,
          update,
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
                  Transformaciones
                </Typography> 
              </Toolbar> 
            </AppBar>
            <Tabla
              permisos={permisos}
              onClickAgregar={nuevaTransformacionAction}
              data = {datos}
              headers = {cabeceras}
              configuracion = {configuracion}
              idPosition = "IdTransformacion"
              admin
              opciones = {
                [
                  {'icon' : 'editar', 'action' : getTransformacionDetalleAction},
                  {'icon' : 'eliminar', 'action' :(e) => openModalAction(e, 1)},
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
                    deleteTransformacionAction(transformacionSelec)
                    break;
                  case 2:
                    regresarAction()
                    break;
                  default:
                    break;
                }
              }}
            />
          </div>
        );
      case 1:
        return (
          <div>
            <TransformacionesNuevo
              modal={modal}
              origen={origen}
              destino={destino}
              regresarAction={regresarAction}
              agrupadores={agrupadores}
              getMoldeIdAction={getMoldeIdAction}
              disabled={disabled}
              lockMoldesAction={lockMoldesAction}
              unlockMoldesAction={unlockMoldesAction}
              show={show}
              dragEndAction={dragEndAction}
              nuevaTransformacion={nuevaTransformacion}
              update={update}
              postTransformacionAction={postTransformacionAction}
              updateTransformacionAction={updateTransformacionAction}
              openModalAction={openModalAction}
              closeModalAction={closeModalAction}
              plantaFilterAction={plantaFilterAction}
              seccionFilterAction={seccionFilterAction}
              removeTaskAction={removeTaskAction}
            />
          </div>
        );
      default: 
        return null;
    }
  }
}

ConfiguracionTransformacion.propTypes = {
  actions: T.object,
  configuracionTransformacion: T.object,
  permisos:T.object,
};

const mapStateToProps = createStructuredSelector({
  configuracionTransformacion: makeSelectConfiguracionTransformacion(),
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

const withReducer = injectReducer({ key: 'configuracionTransformacion', reducer });
const withSaga = injectSaga({ key: 'configuracionTransformacion', saga, mode:DAEMON});
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(ConfiguracionTransformacion);
