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
import makeSelectPrestamo from './selectors';
import reducer from './reducer';
import Actions from './actions';
import saga from './saga';
import Tabla from '../../../../components/DataTable';
import PrestamoNuevo from './components/PrestamoNuevo';
import PrestamoDetalle from './components/PrestamoDetalle';
// import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';

/* eslint-disable react/prefer-stateless-function */
export class Prestamo extends React.Component {
  componentWillMount() {
    const {
      actions: {
        getDatosGeneralesAction,
        // obtenerPermisosAction,
      },
    } = this.props;
    // obtenerPermisosAction();
    getDatosGeneralesAction();
  }

  componentDidUpdate() {
    const {
      actions: {
        setSnackbarAction,
      },
      prestamo: {
        prestamoTabla: {
          snackbar,
        },
      },
    } = this.props;

    if(snackbar > 1 && snackbar < 2) {
      setSnackbarAction(1)
    } else if(snackbar > 2 && snackbar < 3) {
      setSnackbarAction(2)
    } else if(snackbar > 3 && snackbar < 4) {
      setSnackbarAction(3)
    } else if(snackbar > 4 && snackbar < 5) {
      setSnackbarAction(4)
    } else if(snackbar > 5 && snackbar < 6) {
      setSnackbarAction(5)
    }
    
  }

  render() {
    const {
      permisos,
      actions: {
        nuevoPrestamoAction,
        getPrestamoDetalleAction,
        regresarAction,
        onInputChangeAction,
        agregarPrestamoAction,
        removeRowAction,
        editRowAction,
        editarPrestamoAction,
        postPrestamosAction,
        devolverPrestamoAction,
        openModalAction,
        closeModalAction,
      },
      prestamo: {
        // permisos: {
        //   normales,
        // },
        prestamoTabla: {
          updateRegistro,
          prestamoSlc,
          stepper,
          datos,
          cabeceras,
          configuracion,
          nuevoPrestamo,
          disabled,
          idxRegistro,
          modal,
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
                  Prestamo
                </Typography> 
              </Toolbar> 
            </AppBar>
            <Tabla
              // {...(normales.registrar === 1 ? {
              //   onClickAgregar: () => {
              //     nuevoPrestamoAction()
              //   },
              // } : {} )}
              permisos={permisos}
              data = {datos}
              headers = {cabeceras}
              onClickAgregar={nuevoPrestamoAction}
              configuracion = {configuracion}
              idPosition = "PrestamoId"
              admin
              opciones = {
                [
                  // {'icon' : 'descargar'},
                  {'icon' : 'ver', 'action' : getPrestamoDetalleAction},
                ]
              }
              small = {0}
            />
          </div>
        );
      case 1: 
        return(
          <PrestamoNuevo
            openModalAction={openModalAction}
            closeModalAction={closeModalAction}
            modal={modal}
            disabled={disabled}
            nuevoPrestamo={nuevoPrestamo}
            regresarAction={regresarAction}
            onInputChangeAction={onInputChangeAction}
            agregarPrestamoAction={agregarPrestamoAction}
            removeRowAction={removeRowAction}
            editRowAction={editRowAction}
            editarPrestamoAction={editarPrestamoAction}
            updateRegistro={updateRegistro}
            idxRegistro={idxRegistro}
            postPrestamosAction={postPrestamosAction}
          />
        )
      case 2: 
        return(
          <PrestamoDetalle
            openModalAction={openModalAction}
            closeModalAction={closeModalAction}
            modal={modal}
            nuevoPrestamo={nuevoPrestamo}
            regresarAction={regresarAction}
            devolverPrestamoAction={devolverPrestamoAction}
            prestamoSlc={prestamoSlc}
            normales={permisos.normales}
          />
        )
      default: 
        return null;
    }
  }
}

Prestamo.propTypes = {
  actions: T.object,
  prestamo: T.object,
  permisos: T.object,
};

const mapStateToProps = createStructuredSelector({
  prestamo: makeSelectPrestamo(),
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

const withReducer = injectReducer({ key: 'prestamo', reducer });
const withSaga = injectSaga({ key: 'prestamo', saga, mode:DAEMON});
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(Prestamo);
