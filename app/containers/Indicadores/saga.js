/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
//  import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { 
  takeLatest,
  call,
  put,
  all,
  select,
  takeEvery,
} from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import {
  getPlazasIndicadores,
  getDatosIndicadoresOCKyOE,
  getDatosGraficaDesempenioProceso,
  getDatosGraficaDesempenioPuesto,
} from './api';

export function* getDatosCombosIndicadoresAction(action) {
  const{
    tipo,
  } = action;

  if(tipo === 'departamento'){
    const datos = {
      Dato: 'departamento',
      IdPlaza:  0,
      Anio: 0,
      IdPlantilla: 0,
      IdDepartamento: 0,
    }
    try {
      const {
        status,
        data = [],
      } = yield call(getPlazasIndicadores,datos);

      if(status === 200){
        yield put({
          type: 'APP/CONTAINER/INDICADORES/SET_DEPARTAMENTO_ACTION',
          data,
        });
      }else{
        yield put(
          enqueueSnackbar({
            message: 'Error al obtener catalogos',
            options: {
              variant: 'warning',
            },
          })
        );
      }
    } catch (error) {
      yield put(
        enqueueSnackbar({
          message: 'Error al obtener catalogos',
          options: {
            variant: 'warning',
          },
        })
      );
    }
  }

  if(tipo === 'tipoTicket'){
    
    const {
      IdDepartamento,
    } = action;

    const datos = {
      Dato: 'tipoTicket',
      IdPlaza:  0,
      Anio: 0,
      IdPlantilla: 0,
      IdDepartamento,
    }
    try {
      const {
        status,
        data = [],
      } = yield call(getPlazasIndicadores,datos);

      if(status === 200){
        yield put({
          type: 'APP/CONTAINER/INDICADORES/SET_TIPO_TICKET_ACTION',
          data,
          IdDepartamento,
        });
      }else{
        yield put(
          enqueueSnackbar({
            message: 'Error al obtener catalogos',
            options: {
              variant: 'warning',
            },
          })
        );
      }
    } catch (error) {
      yield put(
        enqueueSnackbar({
          message: 'Error al obtener catalogos',
          options: {
            variant: 'warning',
          },
        })
      );
    }
  }

  let IdPlantilla = yield select((state) => state
    .getIn(
      ['indicadores','tipoTicket']
    ));

  if(tipo === 'Plaza'){
    try{
      let {
        idPlan,
      } = action;

      const datos = {
        Dato: 'Plaza',
        IdPlaza:  0,
        Anio: 0,
        IdPlantilla: idPlan,
        IdDepartamento: 0,
      }
    
      const {
        status,
        data = [],
      } = yield call(getPlazasIndicadores,datos);
      
      if(status === 200){
        yield put({
          type: 'APP/CONTAINER/INDICADORES/SET_PLAZAS_ACTION',
          data,
          idPlan,
        });
      }else{
        yield put(
          enqueueSnackbar({
            message: 'Error al obtener los catalogos',
            options: {
              variant: 'warning',
            },
          })
        );
      }
    }catch{
      yield put(
        enqueueSnackbar({
          message: 'Error al obtener catalogos',
          options: {
            variant: 'warning',
          },
        })
      );
    }
  }

  try{
    if(tipo === 'Anio'){
      const {
        IdPlaza,
      } = action;
  
      const datos = {
        Dato: tipo,
        IdPlaza,
        Anio: 0,
        IdPlantilla,
        IdDepartamento: 0,
      }
      const {
        status,
        data = [],
      } = yield call(getPlazasIndicadores,datos);
  
      if(status === 200){
        yield put({
          type: 'APP/CONTAINER/INDICADORES/SET_ANIOS_ACTION',
          data,
          IdPlaza,
        });
      }else{
        yield put(
          enqueueSnackbar({
            message: 'Error al obtener catalogos',
            options: {
              variant: 'warning',
            },
          })
        );
      }
    }
  }catch{
    yield put(
      enqueueSnackbar({
        message: 'Error al obtener catalogos',
        options: {
          variant: 'warning',
        },
      })
    );
  }

  try{
    if(tipo === 'Periodo'){
      const {
        IdPlaza,
        Anio,
      } = action;
  
      const datos = {
        Dato: tipo,
        IdPlaza,
        Anio,
        IdPlantilla,
      }
      const {
        status,
        data = [],
      } = yield call(getPlazasIndicadores,datos);
  
      if(status === 200){
        yield put({
          type: 'APP/CONTAINER/INDICADORES/SET_PERIODO_ACTION',
          data,
          Anio,
        });
      }else{
        yield put(
          enqueueSnackbar({
            message: 'Error al obtener catalogos',
            options: {
              variant: 'warning',
            },
          })
        );
      }
    }
  }catch{
    yield put(
      enqueueSnackbar({
        message: 'Error al obtener catalogos',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* getGenerarReportesOCKyOE(){

  let rep;
  let grafProceso;
  let grafPuesto;
  try {
    const IdPlaza = yield select((state) => state
      .getIn(
        ['indicadores','plazaSeleccionada']
      ));
    
    const AnioCorte = yield select((state) => state
      .getIn(
        ['indicadores','anioCorte']
      ));
    
    const SemanaRetail = yield select((state) => state
      .getIn(
        ['indicadores','periodoCorte']
      ));

    const TipoTicket = yield select((state) => state
      .getIn(
        ['indicadores','tipoTicket']
      ));

    const datos = {
      SemanaRetail,
      AnioCorte,
      IdPlaza,
      IdPlantilla: TipoTicket,
    }

    const [reportes, graficaProceso, graficaPuesto] = yield all([
      call(getDatosIndicadoresOCKyOE,datos),
      call(getDatosGraficaDesempenioProceso,datos),
      call(getDatosGraficaDesempenioPuesto,datos), 
    ]);

    rep = reportes;
    grafProceso = graficaProceso;
    grafPuesto = graficaPuesto;

  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al obtener catalogos',
        options: {
          variant: 'warning',
        },
      })
    );
  }

  let {
    status: statusRepos,
    data : dataRepos,
  } = rep;

  let {
    status: statusGrafProceso,
    data : dataGrafProceso,
  } = grafProceso;

  let {
    status : statusGrafPuesto,
    data: dataGrafPuesto,
  } = grafPuesto;

  try {
    // const {
    //   dataGrafProceso,
    //   dataGrafPuesto,
    //   dataRepos,
    // } = action;

    const dataGraficaPuesto = dataGrafPuesto[0];
    const dataTablaPuesto = dataGrafPuesto[1];
    
    const arrSemanaRetailProceso = [];
    const arrCumplimientoProceso = [];

    dataGrafProceso[0].map((dato) => arrSemanaRetailProceso.push(`S${dato.SemanaRetail}`));
    dataGrafProceso[0].map((dato) => arrCumplimientoProceso.push(dato.Cumplimiento));

    // DATOS PARA GRAFICA DE LINEAS POR PUESTO
    const arrSem = [];
    const arrCum = [];
    const arrNom = [];
    let j=0;
    for(let i=0; i<dataGraficaPuesto.length; i++){
      if(i > 0){
        if( dataGraficaPuesto[i].Nombre === dataGraficaPuesto[i - 1].Nombre){
          
          arrSem[j].push(`S${dataGraficaPuesto[i].SemanaRetail}`);
          arrCum[j].push(dataGraficaPuesto[i].Cumplimiento);
        }
        else{
          
          j++;
          arrSem.push([])
          arrCum.push([])
          arrNom.push(dataGraficaPuesto[i].Nombre)
          arrCum[j].push(dataGraficaPuesto[i].Cumplimiento)
          arrSem[j].push(dataGraficaPuesto[i].SemanaRetail)
        }
      } else{
        
        arrNom.push(dataGraficaPuesto[i].Nombre)
        arrCum.push([dataGraficaPuesto[i].Cumplimiento])
        arrSem.push([`S${dataGraficaPuesto[i].SemanaRetail}`])
      }
    }
    const arrGrafPuesto= [];
    for(let k=0; k<arrNom.length; k++){
      arrGrafPuesto.push({
        Nombre: arrNom[k],
        Semana: arrSem[k],
        Cumpl: arrCum[k],
      })
    }

    // DATOS PARA GRAFICA DE BARRAS PUESTO
    const arrResponsable = [];
    const arrPromedio = [];
    const arrEstablecido = [];
    const dataGraficaBarrasPuesto = dataRepos[2];


    let r=0;
    for(let a=0; a<dataGraficaBarrasPuesto.length; a++){
      if(a > 0){
        if( dataGraficaBarrasPuesto[a].Responsable === dataGraficaBarrasPuesto[a - 1].Responsable){
          arrPromedio[r].push(dataGraficaBarrasPuesto[a].Promedio);
          arrEstablecido[r].push(dataGraficaBarrasPuesto[a].TiempoMeta);
        }
        else{
          r++;
          arrPromedio.push([])
          arrEstablecido.push([])
          arrResponsable.push(dataGraficaBarrasPuesto[a].Responsable)
          arrEstablecido[r].push(dataGraficaBarrasPuesto[a].TiempoMeta)
          arrPromedio[r].push(dataGraficaBarrasPuesto[a].Promedio)
        }
      } else{
        arrResponsable.push(dataGraficaBarrasPuesto[a].Responsable)
        arrEstablecido.push(dataGraficaBarrasPuesto[a].TiempoMeta)
        arrPromedio.push(dataGraficaBarrasPuesto[a].Promedio)
      }
    }
    const arrGrafBarrasPuesto= [];
    for(let l=0; l<arrResponsable.length; l++){
      arrGrafBarrasPuesto.push({
        Responsable: arrResponsable[l],
        Promedio: arrPromedio[l],
        Establecido: arrEstablecido[l],
      })
    }

    arrGrafBarrasPuesto.splice(arrGrafBarrasPuesto.length-1,1)
    const cargando = false;
    // return state
    //   .merge({
    //     cargando,
    //     dataTablaPuesto,
    //     arrSemanaRetailProceso,
    //     arrCumplimientoProceso,
    //     arrGrafPuesto,
    //     arrGrafBarrasPuesto,
    //     datosReportesOCKyOEProceso : dataRepos[0],
    //     datosReportesOCKyOEPuesto : dataRepos[1],
    //     datosReportesOCKyOEPuestoTotales: dataRepos[2],
    //   })
  

    if(statusGrafPuesto === 200 && statusRepos === 200 && statusGrafProceso === 200){
      
      yield put({
        type: 'APP/CONTAINER/INDICADORES/SET_DATOS_GRAFICA_PUESTO_ACTION',
        cargando,
        dataTablaPuesto,
        arrSemanaRetailProceso,
        arrCumplimientoProceso,
        arrGrafPuesto,
        arrGrafBarrasPuesto,
        datosReportesOCKyOEProceso : dataRepos[0],
        datosReportesOCKyOEPuesto : dataRepos[1],
        datosReportesOCKyOEPuestoTotales: dataRepos[2],
      }); 
    }
    // else if (statusGrafPuesto === 200 && statusRepos === 200 && statusGrafProceso !== 200) {
      
    //   dataGrafProceso = [];
    //   yield put({
    //     type: 'APP/CONTAINER/INDICADORES/SET_DATOS_GRAFICA_PUESTO_ACTION',
    //     cargando,
    // //     dataTablaPuesto,
    // //     arrSemanaRetailProceso,
    // //     arrCumplimientoProceso,
    // //     arrGrafPuesto,
    // //     arrGrafBarrasPuesto,
    // //     datosReportesOCKyOEProceso : dataRepos[0],
    // //     datosReportesOCKyOEPuesto : dataRepos[1],
    // //     datosReportesOCKyOEPuestoTotales: dataRepos[2],
    //   }); 
    // }else if (statusGrafPuesto !== 200 && statusRepos === 200 && statusGrafProceso === 200){
      
    //   dataGrafPuesto = [];
    //   yield put({
    //     type: 'APP/CONTAINER/INDICADORES/SET_DATOS_GRAFICA_PUESTO_ACTION',
    //     cargando,
    // //     dataTablaPuesto,
    // //     arrSemanaRetailProceso,
    // //     arrCumplimientoProceso,
    // //     arrGrafPuesto,
    // //     arrGrafBarrasPuesto,
    // //     datosReportesOCKyOEProceso : dataRepos[0],
    // //     datosReportesOCKyOEPuesto : dataRepos[1],
    // //     datosReportesOCKyOEPuestoTotales: dataRepos[2],
    //   }); 
    // }else if(statusGrafPuesto === 200 && statusRepos !== 200 && statusGrafProceso === 200){
      
    //   dataRepos = [];
    //   yield put({
    //     type: 'APP/CONTAINER/INDICADORES/SET_DATOS_GRAFICA_PUESTO_ACTION',
    //     dataGrafProceso,
    //     dataGrafPuesto,
    //     dataRepos,
    //   }); 
    // }else if(statusGrafPuesto !== 200 && statusRepos !== 200 && statusGrafProceso === 200){
      
    //   dataRepos = [];
    //   dataGrafPuesto = [];
    //   yield put({
    //     type: 'APP/CONTAINER/INDICADORES/SET_DATOS_GRAFICA_PUESTO_ACTION',
    //     dataGrafProceso,
    //     dataGrafPuesto,
    //     dataRepos,
    //   }); 
    // }else if(statusGrafPuesto !== 200 && statusRepos === 200 && statusGrafProceso !== 200){
      
    //   dataGrafProceso = [];
    //   dataGrafPuesto = [];
    //   yield put({
    //     type: 'APP/CONTAINER/INDICADORES/SET_DATOS_GRAFICA_PUESTO_ACTION',
    //     dataGrafProceso,
    //     dataGrafPuesto,
    //     dataRepos,
    //   }); 
    // }else if(statusGrafPuesto === 200 && statusRepos !== 200 && statusGrafProceso !== 200){
      
    //   dataGrafProceso = [];
    //   dataRepos = [];
    //   yield put({
    //     type: 'APP/CONTAINER/INDICADORES/SET_DATOS_GRAFICA_PUESTO_ACTION',
    //     dataGrafProceso,
    //     dataGrafPuesto,
    //     dataRepos,
    //   }); 
    // }
  } catch (error) {
    const cargando = false;
    console.log(error)
    yield put({
      type: 'APP/CONTAINER/INDICADORES/APAGAR_BARRA_DE_CARGA_ACTION',
      cargando,

    }); 
    // return state.setIn(['cargando'],cargando)
  }

}

export default function* indicadoresSaga() {
  yield [
    takeEvery('APP/CONTAINER/INDICADORES/GET_DATOS_COMBOS_INDICADORES_ACTION',getDatosCombosIndicadoresAction),
    takeLatest('APP/CONTAINER/INDICADORES/ONCLICK_GENERAR_GRAFICOS_ACTION',getGenerarReportesOCKyOE),
  ]
};
