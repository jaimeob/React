// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, call, put, select } from 'redux-saga/effects';
// import { toSafeInteger } from 'lodash'
import dateFns from "date-fns";
// import LogoImage from 'images/logo/fincamex-logo11.png';
import XLSX from 'xlsx';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import moment, { now } from 'moment';
import Actions from './actions';

import {
  getDatosMantenimientosApi,
  // getAlmacenesApi,
  // getMoldesAlmacenApi,
  getDetalleMantenimientosApi,
} from './api';

export const {
  GET_MANTENIMIENTOS,
  GET_REPORTE,
  HANDLE_DOWNLOAD_EXCEL,
  SET_ROW_SELECCIONADO,
} = Actions.getConstants();
// Individual exports for testing
export function* getMantenimientosSaga() {
  try {
    const usuario = yield select(state => state.getIn(['mantenimientos','usuarioLogeado']))
    
    const {
      status,
      data = [],
    } = yield call(getDatosMantenimientosApi,usuario);
    if(status === 200){
      yield put(
        Actions.get('SET_DATOS_MANTENIMIENTOS').fn(data)
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
        message: 'Hubo un error al obtener la información',
        options: {
          variant: 'error',
        },
      })
    );
  }
}



export function* setRowSeleccionadoSaga(action) {
  try {
    const usuario = yield select(state => state.getIn(['mantenimientos','usuarioLogeado']))
    const datos = {
      IdUsuario: usuario,
      IdMolde: action.idMolde,
      IdAlmacen: action.idInventario,
      IdPlanta: action.idPlanta,
      
    }
    const {
      status,
      data = [],
    } = yield call(getDetalleMantenimientosApi,datos);
    if(status === 200){
      yield put(
        Actions.get('SET_DATOS_DETALLE').fn(data)
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
        message: 'Hubo un error al cambiar de almacen',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* handleDownloadExcelSaga () {
  const FileName = "Reporte existencias de inventario"
  const cabeceraExistencias= ["NombrePlaza","Inventario","IdMolde","Molde","IdInsumo","Insumo","Cantidad","Ubicacion","Usos"]
  const arrayDatos = yield select((state) => 
    state.getIn(
      [
        'reportes',
        'configuracion',
        'datosReporte',
      ]
    )
  )
  const fecha = dateFns.format(moment(now), "DD/MM/YYYY")
  const logo = document.createElement("img");
  logo.src="images/logo/fincamex-logo11.png"  
  if (arrayDatos && arrayDatos.length) {  
    try{
      const datosExcel = []
      datosExcel.push([logo,"abc"])
      datosExcel.push(["Fecha",fecha])
      datosExcel.push([])
      datosExcel.push(cabeceraExistencias)
      datosExcel.push(...arrayDatos.map(row => Object.values(row)))
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.aoa_to_sheet(datosExcel);
      XLSX.utils.book_append_sheet(wb, ws, 'Reporte');/* add worksheet to workbook */
      XLSX.writeFile(wb, FileName.concat('.xlsx'))/* write workbook */
      // loadExportExplotionAction(-1)
    
      // const datosExcel = []
      // // dataLayoutNegociaciones.push(Columns)
      // // dataLayoutNegociaciones.push(Rows)
      // // Columns.map(col => Rows.map(row => row[col]))
      // datosExcel.push(["Reporte de resultados"])
      // datosExcel.push(["Almacen",almacenSeleccionado[0].Nombre,"","","","Fecha",fecha])
      // datosExcel.push([])
      // datosExcel.push(cabeceraResultados)
      // datosExcel.push(...arrayDatos.map(row => Object.values(row)))
      // // dataLayoutNegociaciones.push(...Rows.map(row => Object.getOwnPropertyNames(row)))
      // // datosExcel.push(arrayDatos)
      // const wb = XLSX.utils.book_new()
      // const ws = XLSX.utils.aoa_to_sheet(datosExcel);
      // XLSX.utils.book_append_sheet(wb, ws, 'Resultados');/* add worksheet to workbook */
      // XLSX.writeFile(wb, FileName.concat('.xlsx'))/* write workbook */

      // yield put(
      //   Actions.get('SET_RESULTADOS').fn()
      // );
      // loadExportExplotionAction(-1)
      // }

    }catch(err){
      enqueueSnackbar({
        message: 'Ocurrio un problema al descargar, favor de comunicarse con Soporte.',
        options: { variant: 'error' },
      })
      // loadExportExplotionAction(0) 
    }
  }else{
    enqueueSnackbar({
      message: 'No existe información para exportar, favor de consultar.',
      options: { variant: 'error' },
    })
    // loadExportExplotionAction(0)
  }
}

export default function* mantenimientosSaga() {
  yield [
    takeLatest(
      GET_MANTENIMIENTOS,
      getMantenimientosSaga,
    ),
    takeLatest(
      SET_ROW_SELECCIONADO,
      setRowSeleccionadoSaga,
    ),
    
  ]
  // See example in containers/HomePage/saga.js
}


// export default function* mantenimientosSaga() {
//   // See example in containers/HomePage/saga.js
// }
