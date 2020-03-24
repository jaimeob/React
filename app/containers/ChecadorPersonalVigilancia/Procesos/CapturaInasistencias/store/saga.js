import {
  // take,
  call,
  put,
  // select,
  takeLatest,
} from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import {
  getCompanysApi,
  getPlazasApi,
  getWeekApi,
  uploadFilesApi,
  saveDataApi,
} from './api';
import Actions from './actions';

const {
  REQUEST_GET_COMPANYS,
  REQUEST_GET_PLAZAS,
  REQUEST_GET_WEEK,
  HANDLE_CLICK_SAVE,
} = Actions.getConstants();

export function* getCompanys() {
  const {
    status,
    data,
  } = yield call(getCompanysApi);

  if(status === 200) {
    yield put(
      Actions.get('REQUEST_GET_COMPANYS_SUCCESS').fn(data, status),
    );
    if(data.data.length === 0) {
      yield put(
        enqueueSnackbar({ 
          message: 'No se encontraron empresas',
          options: { 
            variant: 'warning', 
          }, 
        })
      )
    }
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener las empresas',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* getPlazas() {
  const {
    status,
    data,
  } = yield call(getPlazasApi);

  if(status === 200) {
    yield put(
      Actions.get('REQUEST_GET_PLAZAS_SUCCESS').fn(data, status),
    );
    if(data.data.length === 0) {
      yield put(
        enqueueSnackbar({ 
          message: 'No se encontraron plazas',
          options: { 
            variant: 'warning', 
          }, 
        })
      )
    }
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener las plazas',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* getWeek(props) {
  const {
    status,
    data,
  } = yield call (getWeekApi, props);

  if(status === 200) {
    yield put(
      Actions.get('REQUEST_GET_WEEK_SUCCESS').fn(data,status),
    );
    if(data.data.estatus === 'SIN PENDIENTE') {
      yield put(
        enqueueSnackbar({ 
          message: 'No existen semanas pendientes por captura',
          options: { 
            variant: 'info', 
          }, 
        })
      )
    }
    if(data.data.estatus === 'ATRASADO') {
      yield put(
        enqueueSnackbar({ 
          message: 'Existen semanas anteriores pendiente de captura. Favor de capturar la información',
          options: { 
            variant: 'warning', 
          }, 
        })
      )
    }
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener la semana',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* saveData(props) {
  const {
    data:{
      user,
      company,
      plaza,
      year,
      week,
      absence,
      filesReady,
    },
  } = props

  const arrayFiles = [];
  const filesFormatted = new FormData()
  filesFormatted.append('refId', 'documentacion')

  filesReady.map(file =>
    filesFormatted.append('files', file, file.name)
  )

  const {
    status: statusUpload,
    data: dataUpload,
  } = yield call (uploadFilesApi, filesFormatted);

  if(statusUpload === 200){

    dataUpload.map(file =>
      arrayFiles.push({
        'nombre': file.name,
        'ruta': file.url,
      })
    )

    const dataToSave = {
      user,
      company,
      plaza,
      year,
      week,
      absence,
      arrayFiles,
    }
    
    const {
      status,
      // data,
    } = yield call(saveDataApi, dataToSave)

    if(status === 200){
      yield put(
        enqueueSnackbar({
          message: 'Datos guardados con éxito',
          options: {
            variant: 'success',
          },
        })
      );
      yield put(
        Actions.get('HANDLE_CLEAN_WINDOWS').fn()
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Error al guardar los datos',
          options: {
            variant: 'error',
          },
        })
      );
    }

  } else {
    yield put(
      enqueueSnackbar({ 
        message: 'Error al intentar subir los archivos al servidor',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

// Individual exports for testing
export default function* capturaInasistenciasSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_GET_COMPANYS, getCompanys);
  yield takeLatest(REQUEST_GET_PLAZAS, getPlazas);
  yield takeLatest(REQUEST_GET_WEEK, getWeek);
  yield takeLatest(HANDLE_CLICK_SAVE, saveData)
}
