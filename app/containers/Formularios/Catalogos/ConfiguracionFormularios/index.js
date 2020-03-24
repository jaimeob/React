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
import { withHandlers } from 'recompose';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withNotifier from 'components/HOC/withNotifier';
import grey from '@material-ui/core/colors/grey';
import {enqueueSnackbar} from 'reducers/notifications/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Modal from 'components/Dialog/alertDialog';
import makeSelectFormulario from './selectors';
import reducer from './reducer';
import Actions from './actions';
import saga from './saga';
import Tabla from '../../../../components/DataTable';
import FormularioNuevo from './components/FormularioNuevo';
// import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
/* eslint-disable react/prefer-stateless-function */
export class Formulario extends React.Component {
  componentDidMount() {
    const {
      actions: {
        // obtenerPermisosAction,
        obtenerTiposPreguntasAction,
        getFormulariosAction,
        getUsuariosAction,
      },
    } = this.props;
    obtenerTiposPreguntasAction();
    // obtenerPermisosAction();
    getFormulariosAction();
    getUsuariosAction();
  }

  componentWillUnmount() {
    const {
      actions: {
        limpiarStateAction,
      },
    } = this.props;
    limpiarStateAction();
  }

  render() {
    const {
      actions: {
        nuevoFormularioAction,
        onInputChangeAction,
        regresarAction,
        mostrarComponenteAction,
        onInputPreguntaChangeAction,
        onInputNombreSeccionChangeAction,
        onInputDescripcionSeccionChangeAction,
        onColorSeccionChangeAction,
        onInputRespuestaChangeAction,
        ordenarPreguntaAction,
        copiarPreguntaAction,
        eliminarPreguntaAction,
        mostrarPreguntasAction,
        onInputTipoPreguntaChangeAction,
        agregarPreguntaAction,
        getFormularioDetalleAction,
        openModalAction,
        closeModalAction,
        onChangeUsuarioAction,
        onAgregarUsuarioAction,
        onInputDatoPreguntaChangeAction,
        onInputValorPreguntaChangeAction,
        onInputCheckPreguntaChangeAction,
        onInputCheckOpcionChangeAction,
        ordenarDatosPreguntaAction,
        eliminarDatosPreguntaAction,
        onAgregarDatoPreguntaAction,
        guardarFormularioAction,
        handleValidarCamposAction,
        onEliminarFormularioModalAction,
        onEliminarFormularioAction,
        removeRowAction,
      },
      formulario: {
        // permisos: {
        //   // normales,
        // },
        // permisos,
        formularioTabla: {
          stepper,
          datos,
          cabeceras,
          configuracion,
          combos,
          nuevoFormulario,
          modal,
          mostrarComponente,
          nuevoFormulario:{
            preguntas,
            editar,
            
          },
          datosModal,
          eliminarModal,
        },
      },
      classes,
      permisos,
      onEliminarFormularioModalProxy,
      enqueueSnackbar : enqueueSnackbarAction,
    } = this.props;


    switch (stepper) {
      case 0: 
        return (
          <div>
            <Modal 
              open={eliminarModal}
              typeAlert='Report'
              typeOptions='Select'
              title='Confirmar....'
              message='¿Esta seguro que desea eliminar la configuración del formulario?'
              onClickAccept={onEliminarFormularioAction}
              onClickCancel={onEliminarFormularioModalProxy(0)}
            />
            <AppBar style={{backgroundColor: grey[200]}} position="static"> 
              <Toolbar variant="dense" style={{paddingLeft: 8}}> 
                <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
                  Formularios
                </Typography> 
              </Toolbar> 
            </AppBar>
            <Tabla
              // {...(normales.registrar === 1 ? {
              //   onClickAgregar: () => {
              //     nuevoFormularioAction()
              //   },
              // } : {} )}
              onClickAgregar={nuevoFormularioAction}
              data = {datos}
              headers = {cabeceras}
              configuracion = {configuracion}
              idPosition = "IdFormulario"
              admin
              opciones = {
                [
                  {'icon' : 'ver', 'action' : getFormularioDetalleAction},
                  {'icon' : 'eliminar', 'action': onEliminarFormularioModalAction},
                ]
              }
              small = {0}
              permisos={permisos}
            />
          </div>
        );
      case 1: 
        return(
          <FormularioNuevo
            classes={classes}
            modal={modal}
            nuevoFormulario={nuevoFormulario}
            onInputChange={onInputChangeAction}
            regresarAction={regresarAction}
            mostrarComponenteAction={mostrarComponenteAction}
            mostrarComponente={mostrarComponente}
            preguntas={preguntas}
            onInputPreguntaChange={onInputPreguntaChangeAction}
            onInputNombreSeccionChange={onInputNombreSeccionChangeAction}
            onInputDescripcionSeccionChange={onInputDescripcionSeccionChangeAction}
            onColorSeccionChange={onColorSeccionChangeAction}
            onInputRespuestaChange={onInputRespuestaChangeAction}
            ordenarPregunta={ordenarPreguntaAction}
            copiarPregunta={copiarPreguntaAction}
            eliminarPregunta={eliminarPreguntaAction}
            mostrarPreguntas={mostrarPreguntasAction}
            onInputTipoPreguntaChange={onInputTipoPreguntaChangeAction}
            tipoPreguntas={combos.tipoPreguntas}
            usuarios={combos.usuarios}
            agregarPreguntaAction={agregarPreguntaAction}
            openModalAction={openModalAction}
            closeModalAction={closeModalAction}
            onChangeUsuarioAction={onChangeUsuarioAction}
            onAgregarUsuarioAction={onAgregarUsuarioAction}
            onInputDatoPreguntaChange={onInputDatoPreguntaChangeAction}
            onInputValorPreguntaChange={onInputValorPreguntaChangeAction}
            onInputCheckPreguntaChange={onInputCheckPreguntaChangeAction}
            onInputCheckOpcionChange={onInputCheckOpcionChangeAction}
            ordenarDatosPregunta={ordenarDatosPreguntaAction}
            eliminarDatosPregunta={eliminarDatosPreguntaAction}
            onAgregarDatoPregunta={onAgregarDatoPreguntaAction}
            datosModal={datosModal}
            guardarFormulario={guardarFormularioAction}
            handleValidarCampos={handleValidarCamposAction}
            editar={editar}
            removeRowAction={removeRowAction}
            notificacion={enqueueSnackbarAction}
          />
        )
      default: 
        return null;
    }
  }
}

Formulario.propTypes = {
  classes: T.object,
  actions: T.object,
  formulario: T.object,
  permisos: T.object,
  onEliminarFormularioModalProxy:T.func,
  enqueueSnackbar:T.func,
};

const mapStateToProps = createStructuredSelector({
  formulario: makeSelectFormulario(),
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

const withReducer = injectReducer({ key: 'formulario', reducer });
const withSaga = injectSaga({ key: 'formulario', saga, mode:DAEMON});
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withHandlers({
    onEliminarFormularioModalProxy: (props) => (id) => () => {
      const {
        actions: {
          onEliminarFormularioModalAction,
        },
      } = props;
      onEliminarFormularioModalAction(id);
    },
  }),
)(Formulario);
