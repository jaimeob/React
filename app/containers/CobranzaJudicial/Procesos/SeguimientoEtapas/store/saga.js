// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import { obtenerPermisos } from '../../../../../services/api';

import { 
  postUploadFile,
  getConsultaEmpresas,
  getClientesSeguimiento,
  getConsultaEtapas,
  postSeguimientoCliente,
  contarArchivos,
  descargarArchivos,
} from './api'
import Actions from './actions';
const {
  SET_PLAZAS,
  SET_CLIENTES_SEGUIMIENTO,
  SET_ETAPAS_SEGUIMIENTO,
  SET_STEPPER,
  SET_FILTER_CLIENTES_SEGUIMIENTO,
  OBTENER_PERMISOS,
} = Actions.getConstants();

export function* ObtenerPlazas(){
  const {
    status,
    data = [],
    message,
  } = yield call(getConsultaEmpresas, 0)
  if (status === 200) {
    yield put({
      type: SET_PLAZAS,
      data,
    });
  } else {
    yield put(
      enqueueSnackbar({ 
        message, 
        options: { 
          variant: 'error', 
        }, 
      })) 
  }
}

export function* getClientesSeguimientoSaga(action){
  try {
    const {
      status,
      data = [],
    } = yield call(getClientesSeguimiento, action)
    if (status === 200) {
      yield put({
        type: SET_CLIENTES_SEGUIMIENTO,
        data: data.data,
      });
      
      yield put({
        type: SET_FILTER_CLIENTES_SEGUIMIENTO,
        data: data.data,
      })
    } 
  } catch(e){
    
    yield put(
      enqueueSnackbar({ 
        message: 'Error al consultar los clientes', 
        options: { 
          variant: 'error', 
        }, 
      }))
  }
}

export function* getClientesSeguimientoSagaPorEmpresaSaga(action){
  const idUsuario = yield select(state => state.getIn( ['global', 'currentUser', 'UsuarioId']))

  try {
    const {
      status,
      data = [],
    } = yield call(getClientesSeguimiento, { idEmpresa: action.selectedPlaza, idUsuario})
    if (status === 200) {
      yield put({
        type: SET_CLIENTES_SEGUIMIENTO,
        data: data.data,
      });

      yield put({
        type: SET_FILTER_CLIENTES_SEGUIMIENTO,
        data: data.data,
      });
    } else {
      yield put({
        type: SET_CLIENTES_SEGUIMIENTO,
        data: [],
      });

      yield put({
        type: SET_FILTER_CLIENTES_SEGUIMIENTO,
        data: [],
      });
    }
  } catch(e){
    
    yield put(
      enqueueSnackbar({ 
        message: 'Error al consultar los clientes', 
        options: { 
          variant: 'error', 
        }, 
      }))
  }
}

export function* getConsultaEtapasSaga(action){
  try {
    const {
      status,
      data = [],
    } = yield call(getConsultaEtapas, { idEmpresa: action.empresaId, clienteId: action.clienteId})
    if (status === 200) {
      yield put({
        type: SET_ETAPAS_SEGUIMIENTO,
        data: data.data,
      });
    } 
  } catch(e){
   
    yield put(
      enqueueSnackbar({ 
        message: 'Error al consultar las etapas', 
        options: { 
          variant: 'error', 
        }, 
      }))
  }
}

export function* postSeguimientoClienteSaga(action){
  try {
    //const idUsuario = yield select(state => state.getIn(['global', 'currentUser', 'UsuarioId']));
    const idUsuario =4111;
    const clienteId = yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'cliente', 'clienteId']));
    const etapaId = yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'cliente', 'etapaId']));    
    const empresaId =  yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'cliente', 'empresaId']));
    const antecedente = yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'demanda', 'antecedente']));
    const expediente = yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'demanda', 'expediente']));
    const juzgado = yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'demanda', 'juzgado']));
    const fechaDemanda = yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'demanda', 'fechaDemanda']));
    const notaEtapa =  yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'etapa', 'notaEtapa']));
    const cambioIdEtapa =  yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'etapa', 'selectedEtapa']));
    const observacionEtapa =  yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'etapa', 'observacionEtapa']));
    const observacionFinalizarEtapa = yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'etapa', 'observacionFinalizarEtapa']));
    
    const body = {
      idUsuario,
      clienteId,
      etapaId,
      empresaId,
      antecedente,
      expediente,
      juzgado,
      fechaDemanda,
      notaEtapa,
      cambioIdEtapa,
      observacionEtapa,
      observacionFinalizarEtapa,
      urlArchivoEtapa: '',
      nombreArchivoEtapa: '',
      urlArchivoFinalizarEtapa: '',
      nombreArchivoFinalizarEtapa: '',
    }

    // Archivo
    const archivoEtapaSubido = yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'etapa', 'archivoEtapaSubido']));
    const archivoFinalizarEtapaSubido = yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'etapa', 'archivoFinalizarEtapaSubido']));

    if(archivoEtapaSubido){
      const formDataArchivo = new FormData()
      const archivoEtapa = yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'etapa', 'archivoEtapa']))
      const nombreArchivoEtapa = yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'etapa', 'nombreArchivoEtapa']))
 
      formDataArchivo.append('refId', 'documentacion')
      formDataArchivo.append('files', archivoEtapa, nombreArchivoEtapa)

      const {
        status,
        data = [],
      } = yield call(postUploadFile, formDataArchivo)
      
      if(status === 200){
        
        body.urlArchivoEtapa = data[0].url;
        body.nombreArchivoEtapa = data[0].name;
      }
    }

    if(archivoFinalizarEtapaSubido){
      const formDataArchivo = new FormData()
      const archivoFinalizarEtapa = yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'etapa', 'archivoFinalizarEtapa']))
      const nombreArchivoFinalizarEtapa = yield select(state => state.getIn(['seguimientoEtapas', 'seguimientoAbogado', 'frontend', 'etapa', 'nombreArchivoFinalizarEtapa']))
 
      formDataArchivo.append('refId', 'documentacion')
      formDataArchivo.append('files', archivoFinalizarEtapa, nombreArchivoFinalizarEtapa)

      const {
        status,
        data = [],
      } = yield call(postUploadFile, formDataArchivo)
      
      if(status === 200){
        
        body.urlArchivoFinalizarEtapa = data[0].url;
        body.nombreArchivoFinalizarEtapa = data[0].name;
      }
    }
    
    const {
      status,
    } = yield call(postSeguimientoCliente, body)

    if(status === 200){
      yield put(
        enqueueSnackbar({ 
          message: 'Datos guardados con éxito', 
          options: { 
            variant: 'success', 
          }, 
        }))

        const {
          status: statusDos,
          data = [],
        } = yield call(getClientesSeguimiento, {idEmpresa: 0, idUsuario: 4111})
        if (statusDos === 200) {
          yield put({
            type: SET_CLIENTES_SEGUIMIENTO,
            data: data.data,
          });
          
          yield put({
            type: SET_FILTER_CLIENTES_SEGUIMIENTO,
            data: data.data,
          })

          yield put({
            type: SET_STEPPER,
            stepper: 0,
          });
        } 

   
    }

  } catch(e){
     
    yield put(
      enqueueSnackbar({ 
        message: 'Error al guardar los datos', 
        options: { 
          variant: 'error', 
        }, 
      }))
  }
}

export function* getDescargarArchivosSaga(action) {
  const selectedEmpresa = yield select(state => state.getIn( ['seguimientoEtapas', 'seguimientoEtapas', 'frontend', 'selectedPlaza']))

  try {
    const {
      status,
      data = [],
    } = yield call(descargarArchivos, action.clienteId, selectedEmpresa);
    if(status === 200){
  
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Evidencias.zip');


      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al descargar el archivo',
          options: {
            variant: 'error',
          },
        })
      );
    }
 
  } catch (error) {
    
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Puestos - Roles',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* obtenerPermisosSaga(){
  const paramsPermisos = yield select((state) => state.getIn(['global','paramsPermisos']).toJS());
  const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
  
  const {
    status,
    data,
  } = yield call(obtenerPermisos, {...paramsPermisos, idUsuario});

  if(status === 200){
    yield put(
      Actions.get('SET_PERMISOS').fn(data.permisos),
    );
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los permisos',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export default function* seguimientoEtapasSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest('COBRANZAJUDICIAL/PROCESOS/SEGUIMIENTOETAPAS/GET_PLAZAS_ACTION', ObtenerPlazas),
    takeLatest('COBRANZAJUDICIAL/PROCESOS/SEGUIMIENTOETAPAS/GET_CLIENTES_SEGUIMIENTO_ACTION', getClientesSeguimientoSaga),
    takeLatest('COBRANZAJUDICIAL/PROCESOS/SEGUIMIENTOETAPAS/SET_SELECTED_PLAZA_ACTION', getClientesSeguimientoSagaPorEmpresaSaga),
    takeLatest('COBRANZAJUDICIAL/PROCESOS/SEGUIMIENTOETAPAS/GET_ETAPAS_SEGUIMIENTO_ACTION', getConsultaEtapasSaga),
    takeLatest('COBRANZAJUDICIAL/PROCESOS/SEGUIMIENTOETAPAS/GUARDAR_SEGUIMIENTO_CLIENTE_ACTION', postSeguimientoClienteSaga),
    takeLatest('COBRANZAJUDICIAL/PROCESOS/SEGUIMIENTOETAPAS/DOWNLOAD_FILES_ACTION', getDescargarArchivosSaga),
    takeLatest(OBTENER_PERMISOS,obtenerPermisosSaga),
  ]
}
