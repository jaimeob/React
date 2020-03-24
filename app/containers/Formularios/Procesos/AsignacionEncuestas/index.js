/**
 *
 * Asignacion
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { DAEMON } from 'utils/constants';
import Spinner from 'components/Spinner';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withNotifier from 'components/HOC/withNotifier';
import grey from '@material-ui/core/colors/grey';
import {enqueueSnackbar} from 'reducers/notifications/actions';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectFormulario from './selectors';
import reducer from './reducer';
import Actions from './actions';
import saga from './saga';
import Tabla from '../../../../components/DataTable';
import AsignacionNueva from './components/AsignacionNueva';
// import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';

/* eslint-disable react/prefer-stateless-function */
export class AsignacionEncuestas extends React.Component {
  componentWillMount() {
    const {
      actions: {
        getDatosGeneralesAction,
      },
    } = this.props;
    getDatosGeneralesAction();
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
      actions: {
        nuevaAsignacionAction,
        regresarAction,
        getAsignacionDetalleAction,
        onInputChangeAction,
        onInputChangeUsuarioAction,
        onChangeComboAction,
        onChangeComboUsuarioAction,
        agregarRegistroAction,
        agregarRegistroUsuarioAction,
        asignarUsuariosAction,
        regresarNuevoAction,
        setUsuariosSeleccionadosAction,
        setUsuariosSeleccionadosUsuariosAction,
        postAsignacionAction,
        updateAsignacionAction,
        onChangePuestosAction,
        onChangePuestosUsuarioAction,
        onChangeDepartamentosAction,
        onChangeDepartamentosUsuarioAction,
        removeRowAction,
        removeRowUsuariosAction,
        showCollapseAction,
        checkUserAction,
        closeModalAction,
      },
      permisos,
      asignacionEncuestas: {
        asignacionTabla: {
          collapse,
          update,
          asignacionSlc,
          stepper,
          datos,
          cabeceras,
          configuracion,
          nuevaAsignacion,
          modal,
          IdRegistro,
        },
      },
    } = this.props;
    
    for (let i = 0; i < datos.length; i+=1) {
      const color = /\(([^)]+)\)/.exec(datos[i].Color);
      if(typeof datos[i].Estatus === 'string')
        datos[i].Estatus = 
      <Chip
        avatar={<Avatar style={{backgroundColor: datos[i].Color, width: '22px', height: '20px'}}></Avatar>}
        label={datos[i].Estatus} 
        style={{
          backgroundColor: 'white',
          borderColor: `rgba(${color[1]}, 0.5)`,
          width: '110px',
          height: '20px',
          justifyContent: 'start',
        }}
        variant="outlined"
      />
    }

    switch (stepper) {
      case 0: 
        return (
          <div>
            <AppBar style={{backgroundColor: grey[200]}} position="static"> 
              <Toolbar variant="dense" style={{paddingLeft: 8}}> 
                <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
                  Listado de asignaciones
                </Typography> 
              </Toolbar> 
            </AppBar>
            <Tabla
              // {...(normales.registrar === 1 ? {
              //   onClickAgregar: () => {
              //     nuevaAsignacionAction()
              //   },
              // } : {} )}
              permisos={permisos}
              onClickAgregar = {nuevaAsignacionAction}
              data = {datos}
              headers = {cabeceras}
              configuracion = {configuracion}
              idPosition = "IdAsignacion"
              opciones = {
                [
                  {'icon' : 'ver', 'action' : getAsignacionDetalleAction},
                ]
              }
              admin
              small = {0}
            />
            <Spinner/>
          </div>
        );
      case 1: 
        return(
          <AsignacionNueva
            updateAsignacionAction={updateAsignacionAction}
            update={update}
            modal={modal}
            nuevaAsignacion={nuevaAsignacion}
            regresarAction={regresarAction}
            onInputChangeAction={onInputChangeAction}
            onChangeComboAction={onChangeComboAction}
            onInputChangeUsuarioAction={onInputChangeUsuarioAction}
            onChangeComboUsuarioAction={onChangeComboUsuarioAction}
            agregarRegistroUsuarioAction={agregarRegistroUsuarioAction}
            agregarRegistroAction={agregarRegistroAction}
            asignarUsuariosAction={asignarUsuariosAction}
            regresarNuevoAction={regresarNuevoAction}
            asignacionSlc={asignacionSlc}
            setUsuariosSeleccionadosAction={setUsuariosSeleccionadosAction}
            setUsuariosSeleccionadosUsuariosAction={setUsuariosSeleccionadosUsuariosAction}
            postAsignacionAction={postAsignacionAction}
            onChangePuestosAction={onChangePuestosAction}
            onChangePuestosUsuarioAction={onChangePuestosUsuarioAction}
            onChangeDepartamentosAction={onChangeDepartamentosAction}
            onChangeDepartamentosUsuarioAction={onChangeDepartamentosUsuarioAction}
            removeRowAction={removeRowAction}
            removeRowUsuariosAction={removeRowUsuariosAction}
            collapse={collapse}
            showCollapseAction={showCollapseAction}
            checkUserAction={checkUserAction}
            closeModalAction={closeModalAction}
            IdRegistro={IdRegistro}
          />
        )
      default: 
        return null;
    }
  }
}

AsignacionEncuestas.propTypes = {
  actions: T.object,
  asignacionEncuestas: T.object,
  permisos: T.object, 
};

const mapStateToProps = createStructuredSelector({
  asignacionEncuestas: makeSelectFormulario(),
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

const withReducer = injectReducer({ key: 'asignacionEncuestas', reducer });
const withSaga = injectSaga({ key: 'asignacionEncuestas', saga, mode:DAEMON});
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(AsignacionEncuestas);
