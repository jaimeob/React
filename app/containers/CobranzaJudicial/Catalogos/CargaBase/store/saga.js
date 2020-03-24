// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import XLSX from 'xlsx';


import { 
  getPlazas, 
  getCurrentDate,
  getWeeksRetail,
  getCompanys,
  getCompanyLayout,
  postFile,
  getListadoMes,
  getExportarExcel,
} from './api'
import { obtenerPermisos } from '../../../../../services/api';

import Actions from './actions';
const {
  SET_PLAZAS,
  SET_CURRENT_DATE,
  SET_WEEKS_RETAIL,
  SET_COMPANYS,
  SET_WEEK_SELECTED,
  SET_COMPANY_LAYOUT,
  SET_LISTADO_MES,
  SET_MODAL_CARGA_BASE,
  SET_ICON_VIEW_EXPLOTION,
  VALIDATED_FILE,
  SET_FILE_LOAD,
  SET_COMPANY_SELECTED,
} = Actions.getConstants();

export function* ObtenerPlazas(action){
  const {
    IdPlaza,
  } =  action;
  const {
    status,
    data = [],
    message,
  } = yield call(getPlazas, IdPlaza)
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

export function* ObtenerFechaActual(){
  const {
    status,
    data = [],
    message,
  } = yield call(getCurrentDate)
  if (status === 200) {
    yield put({
      type: SET_CURRENT_DATE,
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

export function* ObtenerSemanasRetail(action){
  const {
    status,
    data = [],
    message,
  } = yield call(getWeeksRetail, action.data)
  if (status === 200) {
    yield put({
      type: SET_WEEKS_RETAIL,
      data,
    });

    yield put({
      type: SET_WEEK_SELECTED,
      selectedWeek: 0,
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

export function* ObtenerEmpresas(){
  const {
    status,
    data = [],
    message,
  } = yield call(getCompanys)
  if (status === 200) {
    yield put({
      type: SET_COMPANYS,
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
export function* ObtenerEmpresasLayout(action){
  if(action.selectedCompany === 0){
    yield put({
      type: SET_LISTADO_MES,
      data: [],
    });
    return;
  }

  const {
    status,
    data = [],
    message,
  } = yield call(getCompanyLayout, action.selectedCompany)
  if (status === 200) {
    yield put({
      type: SET_COMPANY_LAYOUT,
      data: data.data[0],
    });

    const mesRetail = yield select(state => state.getIn(
      ['cargaBase', 'backend', 'datasources', 'currentDate', 'Month']
    ))

    const {
      status: statusListadoMes,
      data: dataListadoMes = [],
    } = yield call(getListadoMes, {selectedCompany: action.selectedCompany, mesRetail})
    
    if(statusListadoMes === 200 && dataListadoMes.data.length > 0){
      yield put({
        type: SET_LISTADO_MES,
        data: dataListadoMes.data,
      });
    } else if(statusListadoMes === 200 && dataListadoMes.data.length === 0) {
      yield put({
        type: SET_LISTADO_MES,
        data: [],
      });
    }
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

export function* GuardaArchivo(action){
  const {
    cols,
    rows,
    size,
  } = action.data;
  // debugger;
  const idUsuario = yield select(state => state.getIn(
    ['global', 'currentUser', 'UsuarioId']
  ));

  action.data.base.usuarioId=idUsuario;

  if(cols.length === 0 || rows.length === 0 || size === 0){
    return;
  }
  const {
    status,
  } = yield call(postFile, action.data)
  if (status === 200) {
    yield put(
      enqueueSnackbar({ 
        message: 'Base guardada correctamente', 
        options: { 
          variant: 'success', 
        }, 
      })) 
      
    // Cerrar modal
    yield put({
      type: SET_MODAL_CARGA_BASE,
      modalCargaBase: false,
    });

    const mesRetail = yield select(state => state.getIn(
      ['cargaBase', 'backend', 'datasources', 'currentDate', 'Month']
    ))

    const selectedCompany = yield select(state => state.getIn(
      ['cargaBase', 'frontend', 'ui', 'selectedCompany']
    ))

    const {
      status: statusListadoMes,
      data: dataListadoMes = [],
    } = yield call(getListadoMes, {selectedCompany, mesRetail})
    
    if(statusListadoMes === 200 && dataListadoMes.data.length > 0){
      yield put({
        type: SET_LISTADO_MES,
        data: dataListadoMes.data,
      });

      yield put({
        type: SET_WEEK_SELECTED,
        selectedWeek: 0,
      });

      yield put({
        type: SET_ICON_VIEW_EXPLOTION,
        iconViewExplotion: false,
      });

      yield put({
        type: VALIDATED_FILE,
        data: false,
      });

      yield put({
        type: SET_FILE_LOAD,
        data: {
          cols: [],
          rows: [],
          name: '',
          size: 0,
        },
      })

      yield put({
        type: SET_COMPANY_SELECTED,
        selectedCompany: 0,
      });

    } else if(statusListadoMes === 200 && dataListadoMes.data.length === 0) {
      yield put({
        type: SET_LISTADO_MES,
        data: [],
      });

      yield put({
        type: SET_WEEK_SELECTED,
        selectedWeek: 0,
      });

      yield put({
        type: SET_ICON_VIEW_EXPLOTION,
        iconViewExplotion: false,
      });

      yield put({
        type: VALIDATED_FILE,
        data: false,
      });

      yield put({
        type: SET_FILE_LOAD,
        data: {
          cols: [],
          rows: [],
          name: '',
          size: 0,
        },
      })

      yield put({
        type: SET_COMPANY_SELECTED,
        selectedCompany: 0,
      });
    }

  } else {
    yield put(
      enqueueSnackbar({ 
        message: 'Error al cargar el archivo', 
        options: { 
          variant: 'error', 
        }, 
      })) 
  }
}

export function* ObtenerExportarExcel(action){
  
  const {
    status,
    data = [],
  } = yield call(getExportarExcel, action.data)

  if (status === 200) {
    
    const companys = yield select(state => state.getIn(
      ['cargaBase', 'backend', 'datasources', 'companys']
    ).toJS())

    const columns = yield select(state => state.getIn(
      ['cargaBase', 'frontend', 'ui', 'companyLayout', 'cabeceras']
    ).toJS().map(column => column.Column))
    const companySelected = companys.find(company => company.EmpresaId === action.data.selectedCompany)
    const NombreArchivo = `DESCARGA_${companySelected.Nombre}`
    const dataValores = data.data.map(dato => Object.values(dato))
 
    if(dataValores.length > 0){
      try{
        const dataExcel = [
          columns, 
          ...dataValores,
        ]
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.aoa_to_sheet(dataExcel);
        XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
        XLSX.writeFile(wb, NombreArchivo.concat('.xlsx'))
      }catch(err){
        console.log(err)
        yield put(
          enqueueSnackbar({ 
            message: 'Ocurrio un problema al descargar, favor de comunicarse con Soporte.', 
            options: { 
              variant: 'error', 
            }, 
          }))
      }

    } else {
      yield put(
        enqueueSnackbar({ 
          message: 'No existe información para descargar, favor de verificar.', 
          options: { 
            variant: 'error', 
          }, 
        })) 
    }

  } else {
    yield put(
      enqueueSnackbar({ 
        message: 'Error al descargar el archivo', 
        options: { 
          variant: 'error', 
        }, 
      })) 
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

export default function* negociacionesSaga() {
  yield [
    takeLatest('COBRANZAJUDICIAL/CATALOGOS/CARGABASE/GET_PLAZAS_ACTION', ObtenerPlazas),
    takeLatest('COBRANZAJUDICIAL/CATALOGOS/CARGABASE/GET_CURRENT_DATE_ACTION', ObtenerFechaActual),
    takeLatest('COBRANZAJUDICIAL/CATALOGOS/CARGABASE/GET_WEEKS_RETAIL_ACTION', ObtenerSemanasRetail),
    takeLatest('COBRANZAJUDICIAL/CATALOGOS/CARGABASE/GET_COMPANYS_ACTION', ObtenerEmpresas),
    takeLatest('COBRANZAJUDICIAL/CATALOGOS/CARGABASE/SET_COMPANY_SELECTED_ACTION', ObtenerEmpresasLayout),
    takeLatest('COBRANZAJUDICIAL/CATALOGOS/CARGABASE/POST_FILE_ACTION', GuardaArchivo),
    takeLatest('COBRANZAJUDICIAL/CATALOGOS/CARGABASE/GET_EXPORTAR_EXCEL_ACTION', ObtenerExportarExcel),
    takeLatest('COBRANZAJUDICIAL/CATALOGOS/CARGABASE/OBTENER_PERMISOS_ACTION', obtenerPermisosSaga)
  ]
}

