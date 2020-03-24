// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { parseInt } from 'lodash'
import dateFns from "date-fns";
// import LogoImage from 'images/logo/fincamex-logo11.png';
import XLSX from 'xlsx';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import moment, { now } from 'moment';
import Actions from './actions';

import {
  getCombosReportesApi,
  getAlmacenesUsuarioApi,
  getMoldesAlmacenApi,
  getReporteApi,
  getReporteKardexApi,
  getReporteConfiabilidadApi,
  getOrigenesApi,
  getAñosAlmacenApi,
  getPeriodosAlmacenApi,
} from './api';

export const {
  GET_COMBOS,
  ON_INPUT_PLAZA_CHANGE,
  ON_INPUT_ALMACEN_CHANGE,
  ON_INPUT_TIPO_MOVIMIENTO,
  GET_REPORTE,
  HANDLE_DOWNLOAD_EXCEL,
  ON_INPUT_ANIO_CHANGE,
} = Actions.getConstants();
// Individual exports for testing
export function* getCombosSaga(action) {
  try {
    const {
      status,
      data = [],
    } = yield call(getCombosReportesApi,action.usuario);
    
    if(status === 200){
      yield put(
        Actions.get('SET_COMBOS').fn(data)
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

export function* getAlmacenesSaga(action) {
  
  try {
    yield put(
      Actions.get('ON_INPUT_CHANGE').fn(action.campo,action.valor)
    );

    if (action.valor >= 0){
      const usuario = yield select(state => state.getIn(['reportes','usuarioLogeado']))
      const datos = {
        usuario,
        idPlaza:action.valor,
      }

      const {
        status,
        data = [],
      } = yield call(getAlmacenesUsuarioApi,datos);

      // const {
      //   status,
      //   data = [],
      // } = yield call(getAlmacenesApi,action.valor);

    
      if(status === 200){
        yield put(
          Actions.get('SET_ALMACENES').fn(data)
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
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cambiar de plaza',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getMoldesSaga(action) {
  
  try {
    yield put(
      Actions.get('ON_INPUT_CHANGE').fn(action.campo,action.valor)
    );
    const tipoReporte = yield select(state => state.getIn(['reportes','configuracion',
      'campos','tipoReporte','valor']))
    const idPlaza = yield select(state => state.getIn(['reportes','configuracion',
      'campos','plaza','valor']))

    if (tipoReporte !== 4 ){
      const {
        status,
        data = [],
      } = yield call(getMoldesAlmacenApi,action.valor);
      if(status === 200){
        yield put(
          Actions.get('SET_MOLDES').fn(data)
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
    }else if (action.valor>0){
      const datos = {
        idPlaza,
        idAlmacen:action.valor,
      }

      const {
        status,
        data = [],
      } = yield call(getAñosAlmacenApi,datos);
      if(status === 200){
        yield put(
          Actions.get('SET_AÑOS').fn(data)
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
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cambiar de almacén',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getPeriodosSaga(action) {
  
  try {
    yield put(
      Actions.get('ON_INPUT_CHANGE').fn(action.campo,action.valor)
    );
    const idPlaza = yield select(state => state.getIn(['reportes','configuracion',
      'campos','plaza','valor']))
    const idAlmacen = yield select(state => state.getIn(['reportes','configuracion',
      'campos','almacen','valor']))
    const datos = {
      idPlaza,
      idAlmacen,
      año:action.valor,
    }
    if (action.valor>0){
      const {
        status,
        data = [],
      } = yield call(getPeriodosAlmacenApi,datos);
      if(status === 200){
        yield put(
          Actions.get('SET_PERIODOS').fn(data)
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
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener el periodo',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getOrigenesSaga(action) {
  
  try {
    yield put(
      Actions.get('ON_INPUT_CHANGE').fn(action.campo,action.valor)
    );
    
    if (action.valor>0){
      const {
        status,
        data = [],
      } = yield call(getOrigenesApi,action.valor);

      if(status === 200){
        yield put(
          Actions.get('SET_ORIGEN_DESTINO').fn(data,action.valor)
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

export function* getDatosReporteSaga() {
  
  try {
    const tipoReporte = yield select(state => state.getIn(['reportes','configuracion',
      'campos','tipoReporte','valor']))
    const idPlaza = yield select(state => state.getIn(['reportes','configuracion',
      'campos','plaza','valor']))
    const idAlmacen = yield select(state => state.getIn(['reportes','configuracion',
      'campos','almacen','valor']))
    const idMolde = yield select(state => state.getIn(['reportes','configuracion',
      'campos','molde','valor']))

    const usuario = yield select(state => state.getIn(['reportes','usuarioLogeado']))

    if (tipoReporte === 1 || tipoReporte === 2){
      const datos = {
        tipoReporte,
        idPlaza: idPlaza!==0 && idPlaza !== '' ?idPlaza:null,
        idAlmacen: idPlaza!==0 && idPlaza !== '' && idAlmacen !==''?idAlmacen:null,
        idMolde: idPlaza!==0 && idPlaza !== '' && idMolde !==''?idMolde:null,
        usuario,
      }
      const {
        status,
        data = [],
      } = yield call(getReporteApi,datos);
      if(status === 200){
        yield put(
          Actions.get('SET_DATOS_REPORTES').fn(data)
        );
      } else {
        yield put(
          Actions.get('MOSTRAR_CARGANDO').fn(false)
        );
        yield put(
          enqueueSnackbar({
            message: data.message,
            options: {
              variant: 'error',
            },
          })
        );
      }
    }

    if (tipoReporte === 3 ){
      const fechaInicio = yield select(state => state.getIn(['reportes','configuracion',
        'parametros','fechaInicio']))
      const fechaFin = yield select(state => state.getIn(['reportes','configuracion',
        'parametros','fechaFin']))
      const tipoMovimiento = yield select(state => state.getIn(['reportes','configuracion',
        'campos','tipoMovimiento','valor']))
      const origen = yield select(state => state.getIn(['reportes','configuracion',
        'campos','origen','valor']))
      const destino = yield select(state => state.getIn(['reportes','configuracion',
        'campos','destino','valor']))
      const codigoInicio = yield select(state => state.getIn(['reportes','configuracion',
        'campos','codigoInicio','valor']))
      const codigoFinal = yield select(state => state.getIn(['reportes','configuracion',
        'campos','codigoFinal','valor']))
        
      const fechaInicioValida = fechaInicio !== null ? moment(fechaInicio).format('YYYY/MM/DD'):null
      const fechaFinValida = fechaFin !== null ? moment(fechaFin).format('YYYY/MM/DD'):null
      
      const datos = {
        tipoReporte,
        idPlaza: idPlaza!==0 && idPlaza !== ''?idPlaza:null,
        idAlmacen: idAlmacen!==''?idAlmacen:null,
        fechaInicio:fechaInicioValida,
        fechaFin:fechaFinValida,
        tipoMovimiento:tipoMovimiento!==''?tipoMovimiento:null,
        origen: origen!==''?origen:null,
        destino: destino!==''?destino:null,
        codigoInicio: codigoInicio!==''?codigoInicio:null,
        codigoFinal: codigoFinal!==''?codigoFinal:null,
        usuario,
      }

      const {
        status,
        data = [],
      } = yield call(getReporteKardexApi,datos);
      if(status === 200){
        yield put(
          Actions.get('SET_DATOS_REPORTES').fn(data)
        );
      } else {
        yield put(
          Actions.get('MOSTRAR_CARGANDO').fn(false)
        );
        yield put(
          enqueueSnackbar({
            message: data.message,
            options: {
              variant: 'error',
            },
          })
        );
      }
    }
    if (tipoReporte === 4 ){
      const año = yield select(state => state.getIn(['reportes','configuracion',
        'campos','año','valor']))
      const periodo = yield select(state => state.getIn(['reportes','configuracion',
        'campos','periodo','valor']))

      const datos = {
        tipoReporte,
        idPlaza:parseInt(idPlaza),
        idAlmacen:parseInt(idAlmacen),
        año:parseInt(año),
        periodo:parseInt(periodo),
        usuario,
      }
      const {
        status,
        data = [],
      } = yield call(getReporteConfiabilidadApi,datos);

      if(status === 200){
        yield put(
          Actions.get('SET_DATOS_CONFIABILIDAD').fn(data)
        );
      } else {
        yield put(
          Actions.get('MOSTRAR_CARGANDO').fn(false)
        );
        yield put(
          enqueueSnackbar({
            message: data.message,
            options: {
              variant: 'error',
            },
          })
        );
      }
    }

  } catch (error) {
    yield put(
      Actions.get('MOSTRAR_CARGANDO').fn(false)
    );
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al consultar el reporte',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* handleDownloadExcelSaga () {
  // const {
  //   Columns,
  //   Rows,
  //   // FileName,
  // } = actions
  
  // const Columns = []
  
  const FileName = "Reporte existencias de inventario"
  // Transformar las piezas
  // const arrayDatos = []
  // const cabeceraFormatoConteo = ["Seccion","Codigo","Identificador","Descripción Insumo","Tipo","Unidad","CantidadFisica"]
  const cabeceraExistencias= ["NombrePlaza","Inventario","IdMolde","Molde","IdInsumo","Insumo","Cantidad","Ubicacion","Usos"]
  // nombreAlmacen
  // fecha

  // Fecha seleccionada
  
  const arrayDatos = yield select((state) => 
    state.getIn(
      [
        'reportes',
        'configuracion',
        'datosReporte',
      ]
    )
  )
  
  
  // const datosReporte = JSON.parse(JSON.stringify(datos))
  

  // const almacenSeleccionado = almacenes.filter(almacen => almacen.IdAlmacen === datosSeleccionados.almacenSeleccionado)
  
  
  const fecha = dateFns.format(moment(now), "DD/MM/YYYY")
  const logo = document.createElement("img");
  logo.src="images/logo/fincamex-logo11.png"


  
  
  // piezas.forEach((pieza) => {
  //   if(action.tipoExcel === 0){
  //     arrayDatos.push([pieza.Seccion,pieza.IdInsumo,pieza.Identificador,pieza.Nombre,"Pieza","pza",""])
  //   }else{
  //     arrayDatos.push([pieza.Seccion,pieza.IdInsumo,pieza.Identificador,pieza.Nombre,"Pieza",100,10,0,0,"Ok"])
  //   }  
  // })

  // accesorios.forEach((accesorio) => {
  //   if(action.tipoExcel === 0){
  //     arrayDatos.push([accesorio.Seccion,accesorio.IdInsumo,accesorio.Identificador,accesorio.Nombre,"Accesorios","pza",""])
  //   }else{
  //     arrayDatos.push([accesorio.Seccion,accesorio.IdInsumo,accesorio.Identificador,accesorio.Nombre,"Accesorios",10,1,0,0,"Ok"])
  //   }
  // })

  
  
  
  
  if (arrayDatos && arrayDatos.length) {  
    try{
      const datosExcel = []
      // dataLayoutNegociaciones.push(Columns)
      // dataLayoutNegociaciones.push(Rows)
      // Columns.map(col => Rows.map(row => row[col]))
      datosExcel.push([logo,"abc"])
      datosExcel.push(["Fecha",fecha])
      datosExcel.push([])
      datosExcel.push(cabeceraExistencias)
      datosExcel.push(...arrayDatos.map(row => Object.values(row)))
      // dataLayoutNegociaciones.push(...Rows.map(row => Object.getOwnPropertyNames(row)))
      // datosExcel.push(arrayDatos)
    
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

export default function* reportesSaga() {
  yield [
    takeLatest(
      GET_COMBOS,
      getCombosSaga,
    ),
    takeLatest(
      ON_INPUT_PLAZA_CHANGE,
      getAlmacenesSaga,
    ),
    takeLatest(
      ON_INPUT_ALMACEN_CHANGE,
      getMoldesSaga,
    ),
    takeLatest(
      ON_INPUT_ANIO_CHANGE,
      getPeriodosSaga,
    ),
    
    takeLatest(
      ON_INPUT_TIPO_MOVIMIENTO,
      getOrigenesSaga,
    ),
    takeLatest(
      GET_REPORTE,
      getDatosReporteSaga,
    ),
    takeLatest(
      HANDLE_DOWNLOAD_EXCEL,
      handleDownloadExcelSaga,
    ),
  ]
  // See example in containers/HomePage/saga.js
}

