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
import Spinner from 'components/Spinner';

// import { withHandlers } from 'recompose';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import withNotifier from 'components/HOC/withNotifier';
import grey from '@material-ui/core/colors/grey';
import {enqueueSnackbar} from 'reducers/notifications/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Modal from 'components/Dialog/alertDialog';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import makeSelectRespuestaFormulario from './selectors';
import reducer from './reducer';
import Actions from './actions';
import saga from './saga';
import Tabla from '../../../../components/DataTable';
import RespuestaNueva from './components/RespuestaNueva';
import './styles.css';
// import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
/* eslint-disable react/prefer-stateless-function */
export class RespuestaFormulario extends React.Component {
  componentDidMount() {
    const {
      actions: {
        // obtenerPermisosAction,
        getFormulariosAction,
        // getUsuariosAction,
      },
      location: {
        state: {
          tipoFormulario,
        },
      },
    } = this.props;
    // obtenerPermisosAction();
    getFormulariosAction(tipoFormulario);
    // getUsuariosAction();
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
        regresarAction,
        getPreguntasAction,
        mostrarPreguntasAction,
        onPreguntaListaChangeAction,
        onChangeRespuestaMultipleAction,
        onChangeInputRespuestaAction,
        guardarRespuestasAction,
        handleValidarCamposAction,
        handleChangeArchivoAction,
        handleDownloadArchivoAction,
        handleDeleteArchivoAction,
        onRowsSeleccionadosChangeAction,
        getUsuariosEvaluacionAction,
      },
      respuestaFormulario: {
        // permisos: {
        //   // normales,
        // },
        formularioRespuesta: {
          stepper,
          nuevaRespuesta,
          datos,
          datosUsuarios,
          cabeceras,
          idAsignacion,
          cabecerasUsuarios,
          configuracion,
          datosModal,
          tipoFormulario,
          documentacion,
          nombreEvaluado,
        },
      },
      classes,
      enqueueSnackbar : enqueueSnackbarAction,
    } = this.props;

    let tituloFormulario = '';
    
    switch(tipoFormulario){
      case 'REFENC':
        tituloFormulario = 'Encuestas'
        break;
      case 'REFEVA':
        tituloFormulario = 'Evaluaciones'
        break;
      default:
        tituloFormulario = 'Formularios'
        break;
    }
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

    for (let i = 0; i < datosUsuarios.length; i+=1) {
      const color = /\(([^)]+)\)/.exec(datosUsuarios[i].Color);
      if(typeof datosUsuarios[i].Estatus === 'string')
        datosUsuarios[i].Estatus = 
      <Chip
        avatar={<Avatar style={{backgroundColor: datosUsuarios[i].Color, width: '22px', height: '20px'}}></Avatar>}
        label={datosUsuarios[i].Estatus} 
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
            {/* <Modal 
              open={eliminarModal}
              typeAlert='Report'
              typeOptions='Select'
              title='Confirmar....'
              message='¿Esta seguro que desea eliminar la configuración del formulario?'
              onClickAccept={onEliminarFormularioAction}
              onClickCancel={onEliminarFormularioModalProxy(0)}
            /> */}
            <AppBar style={{backgroundColor: grey[200]}} position="static"> 
              <Toolbar variant="dense" style={{paddingLeft: 8}}> 
                <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
                  {`Respuestas ${tituloFormulario}`}
                </Typography> 
              </Toolbar> 
            </AppBar>
            <Tabla
              data={datos}
              headers={cabeceras}
              configuracion={configuracion}
              idPosition="IdAsignacion"
              admin
              opciones={
                [
                  {...(tipoFormulario === 'REFEVA' ?  {'icon' : 'ver', 'action' : getUsuariosEvaluacionAction} : {'icon' : 'ver', 'action' : getPreguntasAction})},
                ]
              }
              small={0}
            />
            <Spinner/>
          </div>
        );
      case 1: 
        return(
          <div>
            <RespuestaNueva
              classes={classes}
              nuevaRespuesta={nuevaRespuesta}
              regresarAction={regresarAction}
              // preguntas={preguntas}
              datosModal={datosModal}
              mostrarPreguntas={mostrarPreguntasAction}
              onPreguntaListaChange={onPreguntaListaChangeAction}
              onChangeRespuestaMultiple={onChangeRespuestaMultipleAction}
              onChangeInputRespuesta={onChangeInputRespuestaAction}
              guardarRespuesta={guardarRespuestasAction}
              handleValidarCampos={handleValidarCamposAction}
              tituloFormulario={tituloFormulario}
              documentacion={documentacion}
              notificacion={enqueueSnackbarAction}
              handleChangeArchivo={handleChangeArchivoAction}
              handleDownloadArchivo={handleDownloadArchivoAction}
              handleDeleteArchivo={handleDeleteArchivoAction}
              onRowsSeleccionadosChange={onRowsSeleccionadosChangeAction}
              nombreEvaluado={nombreEvaluado}
              tipoFormulario={tipoFormulario}
            />
            <Spinner/>
          </div>
        )
      case 2:
        return(
          <div>
            <AppBar style={{backgroundColor: grey[200]}} position="static"> 
              <Toolbar variant="dense" style={{paddingLeft: 8}}> 
                <Tooltip title="Regresar" placement="bottom-end"> 
                  <IconButton onClick={regresarAction}> 
                    <ArrowBackIcon /> 
                  </IconButton>
                </Tooltip>
                <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
                  Nueva aplicación
                </Typography> 
              </Toolbar> 
            </AppBar>
            <Tabla
              data={datosUsuarios}
              headers={cabecerasUsuarios}
              configuracion={configuracion}
              idPosition="IdUsuario"
              admin
              opciones={
                [
                  {'icon' : 'ver', 'action' :(idUsuario) => getPreguntasAction(idAsignacion, idUsuario)},
                ]
              }
              small={0}
            />
            <Spinner/>
          </div>
        );
      default: 
        return null;
    }
  }
}

RespuestaFormulario.propTypes = {
  classes: T.object,
  actions: T.object,
  location: T.object,
  respuestaFormulario: T.object,
  // getPreguntasAction: T.object,
  enqueueSnackbar: T.func,
  // onEliminarFormularioModalProxy:T.func,
};

const mapStateToProps = createStructuredSelector({
  respuestaFormulario: makeSelectRespuestaFormulario(),
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

const withReducer = injectReducer({ key: 'respuestaFormulario', reducer });
const withSaga = injectSaga({ key: 'respuestaFormulario', saga, mode:DAEMON});
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withSaga,
  withReducer,
  withConnect,
  withActions,
  // withHandlers({
  //   onEliminarFormularioModalProxy: (props) => (id) => () => {
  //     const {
  //       actions: {
  //         onEliminarFormularioModalAction,
  //       },
  //     } = props;
  //     onEliminarFormularioModalAction(id);
  //   },
  // }),
)(RespuestaFormulario);
