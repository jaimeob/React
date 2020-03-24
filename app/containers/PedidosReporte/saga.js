import { takeLatest, call, select, put } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import Actions from './actions';

import {
  getReporteCoorporativo,
  getPlazas,
  getAgrupadores,
  getReportePedidos,
} from './api'

export const {
  GET_REPORTE_COORPORATIVO,
  GET_PLAZAS,
  GET_AGRUPADORES,
  GET_REPORTE_PEDIDOS,
} = Actions.getConstants();

export function* getPlazasAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getPlazas);
    
    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_PLAZAS').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.length !== 0 ? 
            data.message : 'Hubo un error al conectarse a la base de datos',
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener las Plazas',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getAgrupadoresAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getAgrupadores);
    
    if(status === 200 && data.length > 0){
      yield put(
        Actions.get('SET_AGRUPADORES').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.length !== 0 ? 
            data.message : 'Hubo un error al conectarse a la base de datos',
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los agrupadores',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getReporteCoorporativoAction() {
  try {
    const datos = yield select((state) => state.get('pedidosReporte').toJS())
    let idPlazas = [];
    let idAgrupadores = [];
    const idPlaza = yield select(state => state.getIn(['global', 'currentUser', 'IdPlaza'])) 
    
    if(datos.plazaSeleccionada.length === 0){
      idPlazas = datos.plazas.map(pla => pla.IdPlaza)
    }
    if(datos.agrupadorSeleccionado.length === 0){
      idAgrupadores = datos.agrupadores.map(agr => agr.IdAgrupador)
    }
    const parametros = {
      plazas: datos.plazaSeleccionada.length === 0 ? idPlazas : datos.plazaSeleccionada,
      agrupadores: datos.agrupadorSeleccionado.length === 0 ? idAgrupadores : datos.agrupadorSeleccionado,
    }

    parametros.plazas = idPlaza !== 9 ? [idPlaza] : parametros.plazas;
    const {
      status,
      data = [],
    } = yield call(getReporteCoorporativo, parametros);
    
    if(status === 200){
      yield put(
        Actions.get('SET_REPORTE_COORPORATIVO').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.length !== 0 ? 
            data.message : 'Hubo un error al conectarse a la base de datos',
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener el reporte',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getReportePedidosAction() {
  try {
    const datos = yield select((state) => state.getIn(['pedidosReporte', 'reporte', 'parametros']).toJS())
    const datosGenerales = yield select((state) => state.get('pedidosReporte').toJS())
    const idPlaza = yield select(state => state.getIn(['global', 'currentUser', 'IdPlaza'])) 

    let idPlazas = [];
    let idAgrupadores = [];
    
    if(datos.plazaSeleccionada.length === 0){
      idPlazas = datosGenerales.plazas.map(pla => pla.IdPlaza)
    }
    if(datos.agrupadorSeleccionado.length === 0){
      idAgrupadores = datosGenerales.agrupadores.map(agr => agr.IdAgrupador)
    }
    const parametros = {
      plazas: datos.plazaSeleccionada.length === 0 ? idPlazas : datos.plazaSeleccionada,
      agrupadores: datos.agrupadorSeleccionado.length === 0 ? idAgrupadores : datos.agrupadorSeleccionado,
      fecSolicitudInicio: datos.fecSolicitudInicio,
      fecSolicitudFin: datos.fecSolicitudFin,
      fecAutorizacionInicio: datos.fecAutorizacionInicio,
      fecAutorizacionFin: datos.fecAutorizacionFin,
    }
    parametros.plazas = idPlaza !== 9 ? [idPlaza] : parametros.plazas;

    const {
      status,
      data = [],
    } = yield call(getReportePedidos, parametros);
    
    if(status === 200){
      yield put(
        Actions.get('SET_REPORTE_PEDIDOS').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener el reporte',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export default function* pedidosReporteSaga() {
  yield [
    takeLatest(
      GET_REPORTE_COORPORATIVO,
      getReporteCoorporativoAction,
    ),
    takeLatest(
      GET_REPORTE_PEDIDOS,
      getReportePedidosAction,
    ),
    takeLatest(
      GET_PLAZAS,
      getPlazasAction,
    ),
    takeLatest(
      GET_AGRUPADORES,
      getAgrupadoresAction,
    ),
  ]
}
