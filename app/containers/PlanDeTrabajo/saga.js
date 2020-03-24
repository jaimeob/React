/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable operator-assignment */
/* eslint-disable no-plusplus */
import { 
  takeLatest,
  put,
  call,
  select,                
  // takeEvery,
} from 'redux-saga/effects';
import moment from 'moment'
// import { assign, compact } from 'lodash';
// import config from 'config/config.development';
import {
  flatten,
  some,
  isEmpty,
  parseInt,
  max,
  filter,
  isArray,
  find,
} from 'lodash';

import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import config from 'config/config.development';
import socketIOClient from "socket.io-client";
import { defaultCoreCipherList } from 'constants';
import{
  postObtenerPlantilla,
  postInsertarPortafolio,
  obtenerPortafoliosApi,
  obtenerPlantillas,
  obtenerEmpleados,
  obtenerProyectos,
  postInsertarProyecto,
  obtenerProyectosPorFecha,
  getUsuarioImagen,
  obtenerEmpleadosPorIdApi,
  obtenerCatalogosRecursoApi,
  obtenerEmpleadosApi,
  guardarLineaBaseApi,
  getTicketEspecificoApi,
  obtenerProyectosPendientes,
  postUploadFileComentariosApi,
  postUploadFile,
  getImagenAvatarApi,
  cambiarProyectoEstatus,
  // obtenerAutorizadorApi,
  // obtenerDepartamentoApi,
  obtenerProyectosPorFechaPendientes,
  setInvitarAmigoApi,
  enviarLineaBaseApi,
  postInsertarObservacion,
  obtenerObservacionesApi,
  obtenerEmpleadosDepartamentoApi,
  editarLineaBaseApi,
  cancelarCopiaLineaBaseApi,
  // cambiarLineaBaseApi,
  postInsertarDocumentosApi,
  obtenerImpactosDocumentosApi,
  postInsertarImpactosRiesgosApi,
  obtenerImpactosRiesgosApi,
  cambiarEstatusImpactosApi,
  cambiarEstatusApi,
  obtenerLineasBasesPorApi,
  cambiarEstatusTicket,
  cambiarEstatusImpactosDocumentosApi,
  obtenerTicketApi,
  cambiarEstatusImpactosRiesgosApi,
  obtenerJefeIdApi,
  obtenerTicketsCancelacionApi,
} from './api';
import Actions from './actions';

const endpoint=config.api.socketURL;
const socket=socketIOClient(endpoint);
const ACTION = (name = '') => Actions.get(name).id || '';

function* lbReodenarAvance(){
  const registros = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes']));
  const arreglo = registros.toJS();

  let avance = '';
  let avg = 0;
  let sum = 0;
  let arrEstatus = [];
  const arrNums = arreglo[0].map(pos => pos.Padre ? pos.NumOrdenamiento : null)
  const maximo = max(arrNums);

  for(let m=0;m < maximo;m++){
    for(let x=0;x<arreglo[0].length;x++){ 
      arreglo[0][x].Orden = x+1;
      if(arreglo[0][x].Padre){
        for(let y=x+1;y<arreglo[0].length;y++){          
          if(arreglo[0][y].NumOrdenamiento === arreglo[0][x].NumOrdenamiento+1){
            avance = parseInt(arreglo[0][y].Avance === null ? 0 : arreglo[0][y].Avance);
            arrEstatus.push(avance)
            if(y === arreglo[0].length-1){
              sum = arrEstatus.reduce((previous, current) => current += previous);
              avg = sum / arrEstatus.length;
              arreglo[0][x].Avance = parseInt(avg.toFixed(0));
              arrEstatus = [];
            }
          }else if(arreglo[0][x].NumOrdenamiento === arreglo[0][y].NumOrdenamiento){      
            sum = arrEstatus.reduce((previous, current) => current += previous);
            avg = sum / arrEstatus.length;
            arreglo[0][x].Avance = parseInt(avg.toFixed(0));            
            arrEstatus = [];
            break;
          }else if(y === arreglo[0].length-1){
            sum = arrEstatus.reduce((previous, current) => current += previous);
            avg = sum / arrEstatus.length;
            arreglo[0][x].Avance = parseInt(avg.toFixed(0));
            arrEstatus = [];    
            // eslint-disable-next-line no-continue
            continue;
          }
        }
      } else{
        // eslint-disable-next-line no-continue
        continue;
      }
      arrEstatus = [];
    } 
  }
  yield put({
    type: 'APP/CONTAINER/PLANDETRABAJO/REORDENAR_FECHAS_ARREGLO_ACTION', 
    arreglo,
  });
}

function* lbReordenarFechas(){

  const registros = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes']));
  const arreglo = registros.toJS();
  let arrMinimos = [];
  let arrMaximos = [];
  const padres = []
  let [minimo,maximo] = '';
  let arrayFechasMin = [];  
  let arrayFechasMax = [];
  let minFecha = [];
  let maxFecha = [];
  let fechaMin1 = '';
  let fechaMax1 = '';
  const arrNums = arreglo[0].map(pos => pos.Padre ? pos.NumOrdenamiento : null)
  const numMaximo = max(arrNums);
  
  for(let m=0; m < numMaximo ; m++){
    for(let x=0;x<arreglo[0].length;x++){

      if(arreglo[0][x].Padre){
        arreglo[0][x].Recurso = '';
        arreglo[0][x].NomRecurso = '';
        arreglo[0][x].Dependencia = '';

        if(arreglo[0].length > 3){
          // eslint-disable-next-line array-callback-return
          arreglo[0][x].Configuracion.map((componente,idx) => { idx > 2 ? componente.config.valor = '' : componente.config.valor })
        }

        for(let y=x+1;y<arreglo[0].length;y++){
          if(arreglo[0][y].NumOrdenamiento >= arreglo[0][x].NumOrdenamiento+1 ){

            minimo = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes',0,y,'Configuracion',1,'config','valor']))
            maximo = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes',0,y,'Configuracion',2,'config','valor']))

            arrMinimos.push(minimo)
            arrMaximos.push(maximo)

            if(y === arreglo[0].length-1){

              arrayFechasMin = arrMinimos.map((fechaActual) => new Date(fechaActual));
              arrayFechasMax = arrMaximos.map((fechaActual) => new Date(fechaActual));
              minFecha= new Date(Math.min.apply(null, arrayFechasMin));
              maxFecha= new Date(Math.max.apply(null, arrayFechasMax));
        
              padres.push({x,minFecha,maxFecha})
              fechaMin1 = moment(minFecha)  
              fechaMax1 = moment(maxFecha)

              arreglo[0][x].Configuracion[1].config.valor = fechaMin1;
              arreglo[0][x].Configuracion[2].config.valor = fechaMax1;

              arrMinimos = [];
              arrMaximos = [];
              arrayFechasMin = [];
              arrayFechasMax = [];
            }
          }else{

            arrayFechasMin = arrMinimos.map((fechaActual) => new Date(fechaActual));
            arrayFechasMax = arrMaximos.map((fechaActual) => new Date(fechaActual));
            minFecha= new Date(Math.min.apply(null, arrayFechasMin));
            maxFecha= new Date(Math.max.apply(null, arrayFechasMax));
      
            padres.push({x,minFecha,maxFecha})
            fechaMin1 = moment(minFecha)
            fechaMax1 = moment(maxFecha)

            arreglo[0][x].Configuracion[1].config.valor = fechaMin1;
            arreglo[0][x].Configuracion[2].config.valor = fechaMax1;
            
            arrMinimos = [];
            arrMaximos = [];
            arrayFechasMin = [];
            arrayFechasMax = [];
            break;
          } 
        }
      }else{
        // eslint-disable-next-line no-continue
        continue;
      }
    }
  }
  yield put({
    type: 'APP/CONTAINER/PLANDETRABAJO/REORDENAR_FECHAS_ARREGLO_ACTION', 
    arreglo,
  });
}

export function* lbReordenarPadres(){
  try {
    const datos = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes']));
    const arreglo = datos.toJS();

    for(let x=0; x < arreglo[0].length; x++){
      if(x > 0){
        if(x !== arreglo[0].length-1){
          if(arreglo[0][x+1].NumOrdenamiento > arreglo[0][x].NumOrdenamiento){
            arreglo[0][x].Padre = true;
          }else{
            arreglo[0][x].Padre = false;
          }
        }else{
          arreglo[0][x].Padre = false;
        }
      }
    }
    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/LB_SET_REGISTROS_DRAGNDROP_ACTION', 
      arrRegistros: arreglo,
    });
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al ordenar plantilla',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* validarOnChangeDependencia(action){
  try {
    const {
      row,
      name,
      value,
    } = action;

    let bandera = false;
    let valor;
    for(let x=0;x < value.length;x+=1){  
      valor = parseInt(value[x])
      if(!isNaN(valor) || value[x] === ','){
        // eslint-disable-next-line no-continue
        continue
      }else{
        bandera = true;
        break;
      }
    }
    let arregloDep;
    const arrDatos = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes']));
    const arreglo = arrDatos.toJS();
    const [dependencias,datosDependencias] = [[],[]];

    arreglo[0].map((componente,idxDep) => {
      arregloDep = componente.Dependencia
      dependencias.push({arregloDep,idxDep})
    })

    arreglo[0].map((componente,idxDep) => {
      if( dependencias[idxDep].arregloDep !== "" && dependencias[idxDep].arregloDep.length > 1){
        arregloDep = dependencias[idxDep].arregloDep.split(',');
      }else{
        // eslint-disable-next-line prefer-destructuring
        arregloDep = dependencias[idxDep].arregloDep;
      }
      datosDependencias.push({arregloDep,idxDep})   
    })

    const arrNums = datosDependencias.map(pos => pos.idxDep)
    let maximo = max(arrNums);
    maximo = maximo+1;
    let banderaMaximo = false;

    arrNums.map(band => {
      if(isArray(band)){
        if(band[0] > maximo)
          banderaMaximo = true;
      }else if(band > maximo){
        banderaMaximo = true;
      }
    })
    const arrValue = value.split(',');
    for(let y=0; y < arrValue.length; y++){
      if(arrValue[y] > parseInt(maximo))
        banderaMaximo = true;
    }
    if(!bandera && !banderaMaximo){
      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/LB_ONCHANGE_VALUE_ACTION',
        name,
        value,
        row,
      })
    }else{
      yield put(
        enqueueSnackbar({
          message: bandera ? 'Teclee un Numero' : banderaMaximo ? 'No se encontró dependencia' : null,
          options: {
            variant: 'warning',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al validar dependencia',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* obtenerPlantilla(action){
  const {
    from,
  } = action;

  const IdProyecto = yield select((state) => state.getIn(['planDeTrabajo','IdProyecto']));
  const IdPlantilla = yield select((state) => state.getIn(['planDeTrabajo','IdPlantilla']));
  const IdUsuario = yield select((state) => state.getIn(['planDeTrabajo','numUsuarioLogeado']));
  
  let tamanioTabla = 95;
  let datos;
  if(from === 'Otro'){
    datos = {
      IdPlantilla,
      IdProyecto,
      IdLineaBase: action.IdLineaBase,
      Copia: action.Copia,
      IdUsuario,
    }
  }else{
    datos = {
      IdPlantilla,
      IdProyecto,
      IdLineaBase: 0,
      IdUsuario,
    }
  }
  try {
    const {
      status,
      data = [],
    } = yield call(postObtenerPlantilla, datos);
    
    if(status === 200){
      
      const plantilla = data[0][0].Configuracion;
      const datosComponentes = data[1];
      
      for(let i = 0; i< datosComponentes.length; i++){      
        datosComponentes[i].Configuracion = JSON.parse(datosComponentes[i].Configuracion);
      }

      const arregloComponentes = []
      arregloComponentes.push(datosComponentes)
      const arrPlantilla = JSON.parse(plantilla)
      const arrCabeceras = arrPlantilla.map( comp => comp.config.nomCampo)

      const arrCabecerasExtras = JSON.parse(data[2][0].CabecerasExtras)
      const arrComponentesExtras = JSON.parse(data[2][0].ComponentesExtras)
      const arrCabecerasComponente = JSON.parse(data[2][0].CabecerasComponente)
      const arrCabeceraEtapas = JSON.parse(data[2][0].ArrCabeceraEtapas)
      let arrColumnaComponente = JSON.parse(data[2][0].ArrColumnaComponente)
      arrColumnaComponente = arrColumnaComponente  === null ? [] : arrColumnaComponente;

      if(from !== 'saga'){
        arrCabecerasExtras.map( () => tamanioTabla = tamanioTabla+10)
        arrCabecerasComponente.map( () => tamanioTabla = tamanioTabla+10)
      } 

      const {
        AutorizacionEstatus,
        IdAutorizador,
        LineaBaseActiva,
      } = data[3][0];

      const {
        Copia,
        Editando,
      } = data[2][0];
      const {
        IdLineaBase,
      } = data[1][0];

      const arrEtapas = data[6].map(etapa => {
        etapa.IdTicket = etapa.IdTicket;
        etapa.Configuracion = JSON.parse(etapa.Configuracion);
        return etapa
      })

      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/ARREGLO_COMPONENTES_LINEA_BASE_ACTION', 
        arrPlantilla,
        arregloComponentes,
        arrCabeceras,
        arrCabecerasExtras,
        arrComponentesExtras,
        arrCabecerasComponente,
        arrColumnaComponente,
        tamanioTabla,
        AutorizacionEstatus,
        IdAutorizador,
        IdLineaBase,
        LineaBaseActiva,
        arrLineasBase: data[4],
        Copia,
        Editando,
        Invitado: data[5][0].Invitado,
        arrEtapas,
        arrCabeceraEtapas,
      });
      
      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_FECHAS_ACTION',
      });

      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_AVANCE_ACTION', 
      });
      
    }else{
      yield put(
        enqueueSnackbar({
          message: 'Error al obtener plantilla',
          options: {
            variant: 'warning',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al obtener plantilla',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* lbAgregarNuevoRegistro(){
  try {

    const today = new Date().toUTCString();
    const formato2 = moment(today).utcOffset(-120)
    const fecha = formato2.utcOffset(-120)

    const today2 = new Date().toUTCString();
    const formato3 = moment(today2).utcOffset(-120)
    const fecha2 = formato3.utcOffset(-120).add(1, 'M')

    const plantilla = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','plantilla']));
    const registros = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes']));
    const cabecerasExtras = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arrCabecerasExtras']));
    const registrosExtras = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentesExtras']));
    const Copia = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','Copia']));
    
    const arrPlantilla = plantilla.toJS();
    const arrRegistros = registros.toJS();  
    const arrCabecerasExtras = cabecerasExtras.toJS();
    const arrRegistrosExtras = registrosExtras.toJS();
    if(arrCabecerasExtras.length > 0) {
      const arrTemp = []
      arrCabecerasExtras.map((cabecera) => arrTemp.push(cabecera))
      arrRegistrosExtras[0].push(arrTemp)  
    }

    arrPlantilla[1].config.valor = fecha
    arrPlantilla[2].config.valor = fecha2

    const nuevoOrdenamiento = arrRegistros[0].length === 1 ? 2 : arrRegistros[0][arrRegistros[0].length-1].NumOrdenamiento;
    const nuevoRegistro = {
      IdDetalle: '',
      Nombre: '',
      IdTicket: null,
      Padre: false,
      Avance:0,
      NumOrdenamiento: nuevoOrdenamiento,
      Configuracion : arrPlantilla,
      Editable: 1,
      Copia,
      Dependencia: '',
      Orden: arrRegistros[0].length+1,
      Recurso: '',
    }
    
    arrRegistros[0].push(nuevoRegistro)

    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/LB_SET_REGISTROS_ACTION', 
      arrRegistros,
      arrRegistrosExtras,
    });
    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_FECHAS_ACTION',
    });
    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_AVANCE_ACTION', 
    });
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al agregar nuevo registro',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* lbBorrarNuevoRegistro(){
  
  try {
    const index = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','rowSelected']));
    const registros = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes']));
    const arrRegistros = registros.toJS();

    for(let m=index+1;m<arrRegistros[0].length;m++){
      if(arrRegistros[0][m].NumOrdenamiento <= arrRegistros[0][index].NumOrdenamiento)
        break;

      if(arrRegistros[0][m].NumOrdenamiento > arrRegistros[0][index].NumOrdenamiento && arrRegistros[0][index-1].NumOrdenamiento < arrRegistros[0][index].NumOrdenamiento)
        arrRegistros[0][m].NumOrdenamiento = arrRegistros[0][m].NumOrdenamiento-1
    }
    arrRegistros[0].splice(index,1)

    if(index < arrRegistros[0].length-1 && index !== 1){
      if(arrRegistros[0][index-1].NumOrdenamiento < arrRegistros[0][index].NumOrdenamiento ){
        arrRegistros[0][index-1].Padre = true;
      }
    }else if(index-1 === arrRegistros[0].length-1){
      if(arrRegistros[0][index-1].Padre){
        arrRegistros[0][index-1].Padre = false
      }
    }

    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/LB_SET_NUEVO_ARREGLO_MODAL_BORRAR_ACTION', 
      arrRegistros,
    });
    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_FECHAS_ACTION', 
    });
    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_AVANCE_ACTION', 
    });
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al borrar un registro',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* lbOnDragEnd(action){
  const {
    result,
  } = action;

  if(result.source.index !== 0 && result.destination.index !== 0){
    try {
      const datos = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes']));
      const arrDatos = JSON.parse(JSON.stringify(datos))
      const resultado = Array.from(arrDatos);
      const procedencia = result.source.index;
      const destino = result.destination.index;
      const tamanio = resultado[0].length-1;
      const tamanioRL = resultado[0].length;
      let [valP,valD] = '';

      if(!resultado[0][procedencia].Editable || !resultado[0][destino].Editable){
        yield put(
          enqueueSnackbar({
            message: 'Registro sin permiso de modificar',
            options: {
              variant: 'warning',
            },
          })
        );
        return
      }

      valP = resultado[0][procedencia].NumOrdenamiento;
      valD = resultado[0][destino-1].NumOrdenamiento;
  
      if(valP > valD+1){
        const dif = valP - valD;
        resultado[0][procedencia].NumOrdenamiento = valP-dif
        if(resultado[0][procedencia].Padre){
          for(let c=procedencia+1;c<tamanioRL;c++){
            if(resultado[0][c].NumOrdenamiento > valP){
              resultado[0][c].NumOrdenamiento = resultado[0][c].NumOrdenamiento-dif
            }else{
              break;
            }
          }
        }else{
          resultado[0][procedencia].NumOrdenamiento = valP-1
        }
      }

      if(resultado[0][procedencia].NumOrdenamiento === resultado[0][destino].NumOrdenamiento){
        resultado[0][destino].Padre = false; 
      }
        
      if(procedencia > 1 && procedencia !== tamanio){
        if(resultado[0][procedencia-1].NumOrdenamiento === resultado[0][procedencia+1].NumOrdenamiento){
          resultado[0][procedencia-1].Padre = false;
        }
      }
      if(resultado[0][procedencia].Padre && procedencia < tamanio && procedencia < destino){
        const valPadre = resultado[0][procedencia].NumOrdenamiento;
        const [removed] = resultado[0].splice(result.source.index, 1);
        resultado[0].splice(result.destination.index, 0, removed);
    
        for(let x=procedencia;x<resultado[0].length;x++){
          if(resultado[0][procedencia].NumOrdenamiento > valPadre){
            const [sonRemoved] = resultado[0].splice(procedencia, 1);
            resultado[0].splice(destino, 0, sonRemoved);
          }else{
            break;
          }
        }
    
      }else if(resultado[0][procedencia].Padre && procedencia < tamanio && procedencia > destino){
        const valPadre = resultado[0][procedencia].NumOrdenamiento;
        let contDestino = destino;
        const [removed] = resultado[0].splice(result.source.index, 1);
        resultado[0].splice(result.destination.index, 0, removed);
    
        for(let x=procedencia+1;x<resultado[0].length;x++){
          if(resultado[0][x].NumOrdenamiento > valPadre){
            contDestino++;
            const [sonRemoved] = resultado[0].splice(x, 1);
            resultado[0].splice(contDestino, 0, sonRemoved);
          }else{
            break;
          }
        }
      }
      else{
        const [removed] = resultado[0].splice(result.source.index, 1);
        resultado[0].splice(result.destination.index, 0, removed);
      }
    
      if(destino < procedencia && procedencia !== tamanio){
        if(resultado[0][procedencia].NumOrdenamiento < resultado[0][procedencia+1].NumOrdenamiento)
          resultado[0][procedencia].Padre = true
        else
          resultado[0][procedencia].Padre = false
      }
  
      if(destino !== 0){
        if(resultado[0][destino].NumOrdenamiento === resultado[0][destino-1].NumOrdenamiento){
          resultado[0][destino-1].Padre = false;
        }
        if(resultado[0][destino].NumOrdenamiento > resultado[0][destino-1].NumOrdenamiento){
          resultado[0][destino-1].Padre = true;
        }
      }
      if(destino < tamanio){
        if(resultado[0][destino].NumOrdenamiento < resultado[0][destino+1].NumOrdenamiento){
          resultado[0][destino].Padre = true;
        }
        if(resultado[0][destino].NumOrdenamiento > resultado[0][destino+1].NumOrdenamiento){
          resultado[0][destino].Padre = false
        }
      }
      if(procedencia === tamanio){
        resultado[0][tamanio].Padre = false
      }
    
      
      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/LB_SET_REGISTROS_DRAGNDROP_ACTION', 
        arrRegistros: resultado,
      });
      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_PADRE_ACTION', 
      });
    
      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_FECHAS_ACTION', 
      });
      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_AVANCE_ACTION', 
      });
    } catch (error) {
      yield put(
        enqueueSnackbar({
          message: 'Error al mover nodo',
          options: {
            variant: 'warning',
          },
        })
      );
    }
  }
}

export function* lbOnClickBajarNodo(){

  try {
    const rowSelected = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','rowSelected']));
    const datos = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes']));
    const resultado = datos.toJS();

    if(!resultado[0][rowSelected].Editable){
      yield put(
        enqueueSnackbar({
          message: 'Registro sin permiso de modificar',
          options: {
            variant: 'warning',
          },
        })
      );
      return
    }
    
    if(!resultado[0][rowSelected-1].Editable){
      yield put(
        enqueueSnackbar({
          message: 'Registro sin permiso de descender',
          options: {
            variant: 'warning',
          },
        })
      );
      return
    }

    if( !(resultado[0][rowSelected].NumOrdenamiento > resultado[0][rowSelected-1].NumOrdenamiento)){
      resultado[0][rowSelected].NumOrdenamiento = resultado[0][rowSelected].NumOrdenamiento+1
    }
    const tamanio = resultado[0].length-1;

    if(tamanio === rowSelected){
      resultado[0][rowSelected].Padre = false;
    }else if(tamanio > rowSelected){
      if(resultado[0][rowSelected].NumOrdenamiento < resultado[0][rowSelected+1].NumOrdenamiento){
        resultado[0][rowSelected].Padre = true;
      }else{
        resultado[0][rowSelected].Padre = false;
      }
    }

    if(resultado[0][rowSelected].NumOrdenamiento !== 0){
      if(resultado[0][rowSelected].NumOrdenamiento > resultado[0][rowSelected-1].NumOrdenamiento){
        resultado[0][rowSelected-1].Padre = true;
      }
    }

    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/LB_SET_REGISTROS_BAJAR_NODO_ACTION',
      arrRegistros: resultado,
    });

    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_FECHAS_ACTION', 
    });
    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_AVANCE_ACTION', 
    });
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al bajar nivel de nodo',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* lbOnClickSubirNodo(){

  try {
    const rowSelected = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','rowSelected']));
    const datos = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes']));
    const resultado = datos.toJS();

    if(!resultado[0][rowSelected].Editable){
      yield put(
        enqueueSnackbar({
          message: 'Registro sin permiso de modificar',
          options: {
            variant: 'warning',
          },
        })
      );
      return
    }

    if(resultado[0][rowSelected].NumOrdenamiento > 2){

      if(resultado[0][rowSelected].Padre){
        for(let m=rowSelected+1;m<resultado[0].length;m++){
          if(resultado[0][m].NumOrdenamiento > resultado[0][rowSelected].NumOrdenamiento)
            resultado[0][m].NumOrdenamiento = resultado[0][m].NumOrdenamiento-1
        }
      }
      
      resultado[0][rowSelected].NumOrdenamiento = resultado[0][rowSelected].NumOrdenamiento-1
      const tamanio = resultado[0].length-1;

      if(tamanio === rowSelected){
        resultado[0][rowSelected].Padre = false;
      }else if(tamanio > rowSelected){
        if(resultado[0][rowSelected].NumOrdenamiento >= resultado[0][rowSelected+1].NumOrdenamiento){
          resultado[0][rowSelected].Padre = false;
        }else{
          resultado[0][rowSelected].Padre = true;
        }
      }

      if(resultado[0][rowSelected].NumOrdenamiento === resultado[0][rowSelected-1].NumOrdenamiento){
        resultado[0][rowSelected-1].Padre = false;
      }

      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/LB_SET_REGISTROS_BAJAR_NODO_ACTION', 
        arrRegistros: resultado,
      });
    }
    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_FECHAS_ACTION', 
    });
    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_AVANCE_ACTION', 
    });
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al bajar nivel de nodo',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* lbObtenerCatalogosRecurso() {
  try {
    const {
      data,
      status,
    } = yield call(obtenerCatalogosRecursoApi);

    if(status === 200){
      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/LB_SET_CATALOGOS_RECURSO_ACTION', 
        arrPlazas: data[0],
        arrDepartamentos: data[1],
        arrRecursos: data[3],
      });
    }else{
      yield put(
        enqueueSnackbar({
          message: 'Error al obtener catalogos del recurso',
          options: {
            variant: 'warning',
          },
        })
      );
    }

  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al obtener catalogos del recurso',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* lbFiltrarRecurso(action){
  try {
    const{
      name,
      value,
    } = action;

    let Tipo
    let Plaza
    let Departamento
    let Puesto
    

    if(name === 'plazaSeleccionadaRecurso'){
      Tipo = 'Plaza';
      Plaza = value;
      Departamento = 0;
      Puesto = 0;
    }else if(name === 'departamentoSeleccionadoRecurso'){
      Tipo = 'Departamento';
      Plaza = 0;
      Departamento = value;
      Puesto = 0;
    }else if(name === 'puestoSeleccionadoRecurso'){
      Tipo = 'Puesto';
      Puesto = value;
      Plaza = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','plazaSeleccionadaRecurso']));
      Departamento = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','departamentoSeleccionadoRecurso']));
    }

    const datos= {
      Tipo,
      Plaza,
      Departamento,
      Puesto,
    };

    const {
      data,
      status,
    } = yield call(obtenerEmpleadosApi,datos);

    if(status === 200){
      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/LB_SET_CATALOGO_RECURSO_ACTION', 
        tipo: Tipo,
        data,
        name,
        value,
      });
    }else{
      yield put(
        enqueueSnackbar({
          message: 'Error al obtener catalogos del recurso',
          options: {
            variant: 'warning',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al obtener catalogos del recurso',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* lbCambiarFecha(action){  
  try {
    const{
      row,
      cell,
      result,
    } = action;

    if(cell === 1){
      
      const fechaFin = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes',0,row,'Configuracion',2,'config','valor']));
      const today = new Date(fechaFin).toUTCString();
      const formato2 = moment(today).utcOffset(-120)
      const fecha = formato2.utcOffset(-120)
      const fecha2 = moment(result)

      if(fecha >= fecha2){
        yield put({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_ON_CHANGE_DATE_ACTION', 
          row,
          cell,
          result,
        });

        yield put({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_FECHAS_ACTION', 
        });

      }else{
        yield put(
          enqueueSnackbar({
            message: 'Favor de seleccionar una fecha menor',
            options: {
              variant: 'warning',
            },
          })
        );
      }
    }else if(cell === 2){
      const fechaInicio = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes',0,row,'Configuracion',1,'config','valor']));
      const today = new Date(fechaInicio).toUTCString();
      const formato2 = moment(today).utcOffset(-120)
      const fecha = formato2.utcOffset(-120)
      const fecha2 = moment(result)

      if(fecha <= fecha2){
        
        yield put({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_ON_CHANGE_DATE_ACTION', 
          row,
          cell,
          result,
        });

        yield put({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_FECHAS_ACTION', 
        });
      }else{
        yield put(
          enqueueSnackbar({
            message: 'Favor de seleccionar una fecha mayor',
            options: {
              variant: 'warning',
            },
          })
        );
      }
    }else{
      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/LB_ON_CHANGE_DATE_ACTION', 
        row,
        cell,
        result,
      });

      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_FECHAS_ACTION', 
      });
    }
    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_FECHAS_ACTION', 
    });
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al cambiar fechas',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}


export function* lbAgregarNuevaColumna(){
  try {
    
    const Nombre = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','nombreNColumna']));
    const arrCabeceras = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arrCabecerasExtras']));
    const arrComponentes = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes']));
    const arregloComponentesExtras = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentesExtras']));
    const componentes = arrComponentes.toJS()
    const componentesExtras = arregloComponentesExtras.toJS();
    const Columnas = arrCabeceras.toJS();
    
    const columna = {
      Nombre,
      Valor:'',
    }

    Columnas.push(columna);

    if(Columnas.length === 1){

      componentesExtras.push([])
      for(let x=0;x < componentes[0].length; x++){
        componentesExtras[0].push([{
          Nombre,
          Valor:'',
        }])
      }
    }else if(Columnas.length > 1){
      for(let x=0;x < componentesExtras[0].length; x++){
        componentesExtras[0][x].push({
          Nombre,
          Valor:'',
        })
      }
    }
    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/LB_SET_COLUMNAS_ACTION', 
      Columnas,
      componentesExtras,
    });
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al agregar columna',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* lbAgregarColumnaComponente(action){
  const {
    nomCampo,
    posicion,
  } = action;
  const arrColumnaComponente = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arrColumnaComponente']));
  const arrCabeceraComponente = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arrCabeceraComponente']));
  
  const arregloComp = arrColumnaComponente.toJS();
  const arregloCab = arrCabeceraComponente.toJS();

  arregloComp.push(nomCampo)
  arregloCab.push({Nombre: nomCampo,Posicion: posicion})

  yield put({
    type: 'APP/CONTAINER/PLANDETRABAJO/LB_SET_COLUMNAS_COMPONENTES_ACTION', 
    arregloComp,
    arregloCab,
  });
}

export function* lbAgregarColumnaEtapa(action){
  const {
    nomCampo,
    posicion,
  } = action;

  const arrColumnaComponente = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arrColumnaComponente']));
  const arrCabeceraEtapa = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arrCabeceraEtapas']));
  
  const arregloComp = arrColumnaComponente.toJS();
  const arregloCab = arrCabeceraEtapa.toJS();

  arregloComp.push(nomCampo)
  arregloCab.push({Nombre: nomCampo,Posicion: posicion,Ticket: 4604})

  yield put({
    type: 'APP/CONTAINER/PLANDETRABAJO/LB_SET_COLUMNAS_ETAPAS_ACTION', 
    arregloComp,
    arregloCab,
  });
}


export function* editarLineaBase(){
  try {
        
    const IdLineaBase = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','IdLineaBase']));
    const IdProyecto = yield select((state) => state.getIn(['planDeTrabajo','IdProyecto']));
    
    const datos={
      IdLineaBase,
      IdProyecto,
    };
    const {
      data,
      status,
    } = yield call(editarLineaBaseApi,datos);

    if(status === 200){
      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/OBTENER_ARREGLO_COMPONENTES_LINEA_BASE_ACTION',
        IdLineaBase: data[0][0].IdLineaBase,
        Copia: 1,
        from: 'Otro',
      });
      
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al editar linea base',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* cambiarLineaBase(action){
  try {
    const {
      value,
    } = action;
    const arrLineasBase = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arrLineasBase']));
    const arreglo = arrLineasBase.toJS();
    const Copia = arreglo.filter(valor => valor.IdLineaBase === value)

    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/OBTENER_ARREGLO_COMPONENTES_LINEA_BASE_ACTION',
      IdLineaBase: value,
      Copia: Copia[0].Copia,
      from: 'Otro',
    });

    yield put(
      enqueueSnackbar({
        message: 'Se cambió de linea base',
        options: {
          variant: 'success',
        },
      })
    );
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al cambiar linea base',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* cancelarCopiaLineaBase(){
  try {
    
    const IdProyecto = yield select((state) => state.getIn(['planDeTrabajo','IdProyecto']));
    const IdLineaBase = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','IdLineaBase']));
    const datos = {
      IdProyecto,
      IdLineaBase,
    };

    const {
      data,
      status,
    } = yield call(cancelarCopiaLineaBaseApi,datos);

    if(status === 200){
      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/OBTENER_ARREGLO_COMPONENTES_LINEA_BASE_ACTION',
      });

      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/ABRIR_CERRAR_CONFIRMACION_ACTION',
        nombreConfirmacion:'openModalCancelarCopia',
      });

      yield put(
        enqueueSnackbar({
          message: 'Se canceló correctamente la copia de linea base',
          options: {
            variant: 'success',
          },
        })
      );

    }else{
      yield put(
        enqueueSnackbar({
          message: 'Error al obtener lineas base',
          options: {
            variant: 'warning',
          },
        })
      ); 
    }

  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al cancelar la edición de linea base',
        options: {
          variant: 'warning',
        },
      })
    ); 
  }
}

export function* lbGuardarLineaBase(){
  try {
    const IdLineaBase = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','IdLineaBase']));
    const IdProyecto = yield select((state) => state.getIn(['planDeTrabajo','IdProyecto']));
    const IdPlantilla = yield select((state) => state.getIn(['planDeTrabajo','IdPlantilla']));
    const Componentes = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes']));
    const ComponentesExtras = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentesExtras']));
    const CabecerasExtras = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arrCabecerasExtras']));
    const CabeceraComponente = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arrCabeceraComponente']));
    const arrColumnaComponente = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arrColumnaComponente']));
    const arrCabeceraEtapas = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arrCabeceraEtapas']));
    const arrRequeridos = [];

    const datos = {
      IdLineaBase,
      IdProyecto,
      IdPlantilla,
      Componentes,
      CabecerasExtras,
      ComponentesExtras,
      CabeceraComponente,
      arrColumnaComponente,
      arrCabeceraEtapas,
    };

    const arrComponentes = Componentes.toJS();
    arrComponentes[0].map(componente => arrRequeridos.push((componente.Recurso === '' && !componente.Padre) || componente.Configuracion[0].config.valor === ''))
    
    if(!arrRequeridos.some(requerido => requerido)){
      
      const {
        // eslint-disable-next-line no-unused-vars
        data,
        status,
      } = yield call(guardarLineaBaseApi,datos);
  
      if(status === 200){
        yield put(
          enqueueSnackbar({
            message: 'Guardado correctamente',
            options: {
              variant: 'success',
            },
          })
        );
      }
    }else{
      yield put(
        enqueueSnackbar({
          message: 'Hay datos requeridos sin rellenar',
          options: {
            variant: 'warning',
          },
        })
      );
    }

  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al guardar linea base',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* lbEnviarLineaBase(action){
  try {
    let arregloDep;
    let depCiclada;
    let banderaBreak = false;
    const arrDatos = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','arregloComponentes']));
    const arreglo = arrDatos.toJS();
    const [dependencias,datosDependencias,delArr] = [[],[],[]];

    arreglo[0].map((componente,idxDep) => {
      arregloDep = componente.Dependencia
      dependencias.push({arregloDep,idxDep})
    })

    arreglo[0].map((componente,idxDep) => {
      if( dependencias[idxDep].arregloDep !== "" && dependencias[idxDep].arregloDep.length > 1){
        arregloDep = dependencias[idxDep].arregloDep.split(',');
        
      }else{
        // eslint-disable-next-line prefer-destructuring
        arregloDep = dependencias[idxDep].arregloDep;
      }
      datosDependencias.push({arregloDep,idxDep})   
    })

    datosDependencias.map((arr,idxDep) => {
      if(isArray(arr.arregloDep) && arr.arregloDep.length > 1){
        arr.arregloDep.map( dato => datosDependencias.push({arregloDep:dato,idxDep}))
        delArr.push(idxDep)
      }
    })
    delArr.map(del => datosDependencias.splice(del,1))
    for(let x=0;x<datosDependencias.length;x++){
      if(datosDependencias[x].arregloDep !== ""){
        if(parseInt(datosDependencias[datosDependencias[x].arregloDep-1].arregloDep-1) === datosDependencias[x].idxDep){
          banderaBreak = true;
          depCiclada = datosDependencias[x].idxDep;
          break;
        }
      }
    }
    
    if(banderaBreak){
      yield put(
        enqueueSnackbar({
          message: `Dependencia ${depCiclada+1} Ciclada`,
          options: {
            variant: 'warning',
          },
        })
      );
      return
    }

    const even = (element) => (element.Recurso === '' || element.Recurso === null) && element.Padre === false;
    if(arreglo[0].some(even)){
      yield put(
        enqueueSnackbar({
          message: `Seleccione Recurso`,
          options: {
            variant: 'warning',
          },
        })
      );
      return
    }

    yield put({
      type:'APP/CONTAINER/PLANDETRABAJO/GUARDAR_LINEABASE_ACTION',
    })

    const IdProyecto = yield select((state) => state.getIn(['planDeTrabajo','IdProyecto']));
    const IdLineaBase = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','IdLineaBase']));

    const datos = {
      IdProyecto,
      IdLineaBase,
    }
    const {
      status,
    } = yield call(enviarLineaBaseApi,datos);

    if(status === 200){
      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/ABRIR_CERRAR_CONFIRMACION_ACTION',
        nombreConfirmacion:'openModalGenerarLB',

      });

      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/OBTENER_ARREGLO_COMPONENTES_LINEA_BASE_ACTION',
        from:'saga',
      });

      yield put(
        enqueueSnackbar({
          message: 'Enviado correctamente',
          options: {
            variant: 'success',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al enviar linea base',
        options: {
          variant: 'warning',
        },
      })
    );
  }

  try{
    // NOTIFICACION DE GENERAR LINEA BASE ---
    const IdUsuario = yield select((state) => state.getIn(['planDeTrabajo','numUsuarioLogeado']))
    let IdUsuarioRecibe = ""
    let IdDepartamentoRecibe = ""
    const NombreProyecto = action.nombreProyecto
       
    const {
      data:dataEmpleado,
      status:statusEmpleado,
    } = yield call (obtenerEmpleadosPorIdApi, IdUsuario);
      
     
    if(statusEmpleado === 200){
      // const obt = JSON.parse(JSON.stringify(data[0][0]))    
      const {
        data:JefeData,
        status:statusJefe,
           
      } = yield call (obtenerJefeIdApi, dataEmpleado.recordset[0].IdPuesto);
      if(statusJefe === 200){
     
        IdUsuarioRecibe = JefeData.recordset[0].NoEmpleado
        IdDepartamentoRecibe = dataEmpleado.recordset[0].IdDepartamento
     
        const datosNotificacion = {
          IdUsuarioRecibe,
          IdDepartamentoRecibe,
          IdUsuarioEnvia: IdUsuario,
          IdDepartamentoEnvia: 29,
          Notificacion:   `¡Tiene una línea base pendiente de autorizar! ${ NombreProyecto }`,
          Direccion: "",
        }
       
        socket.emit('nuevaNotificacion',datosNotificacion);
           
      }
    }
  }catch (error){
    yield put(
      enqueueSnackbar({
        message: 'Error al enviar notificacion',
        options: {
          variant: 'warning',
        },
      })
    );
    
  }
}


export function* obtenerPortafolios(action){  
  
  const {
    data,
    status,
  } = yield call(obtenerPortafoliosApi,action.id);

  const portafolios = data.recordset
  
  // OBTENIENDO NUMERO DE PROYECTOS EN PORTAFOLIO
  let proyectos = ''
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < portafolios.length; index++) {
    proyectos =  yield call(obtenerProyectos, portafolios[index].IdPortafolio,action.id );

    if(proyectos.data !== undefined){
      portafolios[index].proyectos = proyectos.data.recordsets[0].length
    }else{
      portafolios[index].proyectos = 0
    }
  }

  if(status === 200){
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/SET_CARPETAS',
      data: data.recordset,
    });
  } 
}

export function* obtPlantillas(action){ 
   
  const {
    data,
    status,
  } = yield call(obtenerPlantillas,action.IdDepartamento);
  
  if(status === 200){
    let plantillas = []
    // plantillas.push({IdPlantilla:"Plantilla General",nombre:"Plantilla General"})
    plantillas.push(data)
    plantillas = flatten(plantillas);

    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/SET_PLANTILLAS',
      plantillas,
    });
  }
}

export function* obtEmpleados(){  
  const {
    data,
    status,
  } = yield call(obtenerEmpleados);
  
  if(status === 200){
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/SET_EMPLEADOS',
      data,
    });
  }
}

export function* insertarPortafolios(){
  const colorPortafolio = yield select((state) => state.getIn(['planDeTrabajo','portafolios','colorPortafolio']));
  const color = JSON.parse(JSON.stringify(colorPortafolio));
  const nombrePortafolio = yield select((state) => state.getIn(['planDeTrabajo','portafolios','nombrePortafolio']));
  const idPortafolio = yield select((state) => state.getIn(['planDeTrabajo','portafolios','idPortafolio']));
  const idxPortafolio = yield select((state) => state.getIn(['planDeTrabajo','portafolios','idxPortafolio']));
  const portafolios = yield select((state) => state.getIn(['planDeTrabajo','portafolios','carpetas']));
  const IdUsuario = yield select((state) => state.getIn(['planDeTrabajo','numUsuarioLogeado'])); 
  
  const datos = {nombrePortafolio,colorPortafolio:color.hex,idPortafolio,idxPortafolio,IdUsuario}  
  let existePortafolio = false

  // GUARDA
  if(idPortafolio ===""){
    for (let index = 0; index < portafolios.length; index+=1) {
      if (portafolios[index].NombrePortafolio.toLowerCase().trim() === datos.nombrePortafolio.toLowerCase().trim()) {
        existePortafolio = true
      }
    }
  }
  // EDITA
  if(idPortafolio > 0){
    for (let index = 0; index < portafolios.length; index+=1) {
      if (portafolios[index].IdPortafolio === idPortafolio && portafolios[index].NombrePortafolio.toLowerCase() === datos.nombrePortafolio.toLowerCase()) {
        existePortafolio = false
      }
      if (portafolios[index].IdPortafolio !== idPortafolio && portafolios[index].NombrePortafolio.toLowerCase() === datos.nombrePortafolio.toLowerCase()) {
        existePortafolio = true
      }
    }
  }
  
  if (existePortafolio || nombrePortafolio.trim()==="") {
    return yield put(
      Actions.get('ERROR_NOMBREPORTFOLIO').fn(nombrePortafolio)
    );
  }

  if(nombrePortafolio && existePortafolio || nombrePortafolio === undefined  && existePortafolio ){
    yield put(
      Actions.get('ERROR_NOMBREPORTFOLIO').fn(nombrePortafolio)
    );
  }else{
    
    const {
      status,
    } = yield call(postInsertarPortafolio, datos );
    

    if(status === 200){
      if(idPortafolio !==""){
        yield put({
          type:  'APP/CONTAINER/PLANDETRABAJO/SET_PORTAFOLIO',
          data: datos,
        });
      }else{
        const {
          data,
        } = yield call(obtenerPortafoliosApi,IdUsuario);
        if(data.recordset.length > 0){
          const portafoliosArray = data.recordset
          
          // OBTENIENDO NUMERO DE PROYECTOS EN PORTAFOLIO
          let proyectos = ''
          // eslint-disable-next-line no-plusplus
          for (let index = 0; index < portafoliosArray.length; index++) {
            proyectos =  yield call(obtenerProyectos, portafoliosArray[index].IdPortafolio,IdUsuario );
            if(proyectos.data !== undefined){
              
              portafoliosArray[index].proyectos = proyectos.data.recordsets[0].length
            }else{
              portafoliosArray[index].proyectos = 0
            }
          }
          
          yield put({
            type:  'APP/CONTAINER/PLANDETRABAJO/SET_CARPETAS',
            data: data.recordset,
          });
        }
      }
    }
  }
}

// ------------------------------------------------------------ PROYECTOS
export function* insertarProyectos(){
  const plantilla = yield select((state) => state.getIn(['planDeTrabajo','listadoProyectos','plantillaSeleccionada']));
  const prioridad = yield select((state) => state.getIn(['planDeTrabajo','listadoProyectos','prioridadSeleccionada']));
  const nombreProyecto = yield select((state) => state.getIn(['planDeTrabajo','listadoProyectos','nombreProyecto']));
  const empleado = yield select((state) => state.getIn(['planDeTrabajo','listadoProyectos','empleadoSeleccionado']));
  const colorProyectoV = yield select((state) => state.getIn(['planDeTrabajo','listadoProyectos','colorProyecto']));
  const idProyecto = yield select((state) => state.getIn(['planDeTrabajo','listadoProyectos','idProyecto']));
  const idPortafolio = yield select((state) => state.getIn(['planDeTrabajo','listadoProyectos','idPortafolio']));
  const proyectos = yield select((state) => state.getIn(['planDeTrabajo','listadoProyectos','proyectos']));
  const colorProyecto = JSON.parse(JSON.stringify(colorProyectoV));
  let camposvalidados = true
  
  // VALIDACIONES
  if(plantilla===""){
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/ERROR_TIPO_PROYECTO',
    });
    camposvalidados = false
  }

  if(nombreProyecto.trim()===""){
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/ERROR_NOMBRE_PROYECTO',
    });
    camposvalidados = false
  }

  if(prioridad===""){
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/ERROR_PRIORIDAD',
    });
    camposvalidados = false
  }

  if(empleado===""){
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/ERROR_RESPONSABLE',
    });
    camposvalidados = false
  }

  if(proyectos.length > 0){
    let existe = false
    proyectos.forEach(item => {
      if(item.NombreProyecto.toLowerCase().trim() === nombreProyecto.toLowerCase().trim() && idProyecto !== item.IdProyecto ){
        existe = true
      }
    });
    if(existe){
      yield put({
        type:  'APP/CONTAINER/PLANDETRABAJO/ERROR_PROYECTO_REPETIDO',
      });
      camposvalidados = false
    }
  }

  const IdUsuario = yield select((state) => state.getIn(['planDeTrabajo','numUsuarioLogeado'])); 
  const IdPuesto = yield select((state) => state.getIn(['planDeTrabajo','idRolUsuarioLogeado']));
  

  if(camposvalidados){
    const datos = {
      IdPlantilla:plantilla[0].value,
      idProyecto,
      IdPuesto,
      idPortafolio:idPortafolio.item.IdPortafolio,
      nombreProyecto,
      colorProyecto:colorProyecto.hex,
      prioridad,
      empleado:empleado[0].value,
      estatus:2,
      idUsuario:IdUsuario,
    }
    // SILVA 27594  2946

    const {
      status,
    } = yield call(postInsertarProyecto, datos );

    if(status === 200)
    {
      
      const {
        data:res,
      } = yield call(obtenerProyectos,datos.idPortafolio,datos.idUsuario);
      
      const proyectosArray = res.recordset
      
      // ASIGNANDO IMAGEN AL PROYECTO
      let imagen = ''
      let arreglo = []
      // console.log(proyectosArray,"proyectosArray -----------------");

      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < proyectosArray.length; index++) {
        if(proyectosArray[index].UsuarioDominio !== null){
          imagen =  yield call(getUsuarioImagen,proyectosArray[index].UsuarioDominio)
          if(imagen !==""){
            proyectosArray[index].imagen = imagen.data.imagen
          }
        }
        

        // SACANDO EL NUMERO DE PORCENTAJE DEL PROGRESO DE CADA PROYECTO ---------
        const {
          data:lineasBase,
          status:exito,
        } =  yield call(obtenerLineasBasesPorApi,proyectosArray[index].IdProyecto,proyectosArray[index].LineaBaseActiva)
        
        if(exito === 200){
          // eslint-disable-next-line prefer-destructuring
          arreglo = lineasBase

          const conteoPadres = []
          let avg = 0;
          let sum = 0;
          let arrEstatus = [];
          let avance = '';
          const arrNums = arreglo[0].map(pos => pos.Padre ? pos.NumOrdenamiento : null)
          const maximo = max(arrNums);

          for(let m=0;m < maximo;m++){
            for(let x=0;x<arreglo[0].length;x++){
              
              arreglo[0][x].Orden = x+1;

              if(arreglo[0][x].Padre){
                for(let y=x+1;y<arreglo[0].length;y++){  

                  if(arreglo[0][y].NumOrdenamiento === arreglo[0][x].NumOrdenamiento+1){
                    avance = parseInt(arreglo[0][y].Avance === null ? 0 : arreglo[0][y].Avance);
                    arrEstatus.push(avance)
                    if(y === arreglo[0].length-1){
                      sum = arrEstatus.reduce((previous, current) => current += previous);
                      avg = sum / arrEstatus.length;
                      arreglo[0][x].Avance = parseInt(avg.toFixed(0));
                      if(arreglo[0][0].Avance>= 1){
                        proyectosArray[index].Avance = arreglo[0][0].Avance
                      }
                      arrEstatus = [];
                    }
                  }else if(arreglo[0][x].NumOrdenamiento === arreglo[0][y].NumOrdenamiento){
                    if(arrEstatus.length > 0){
                      sum = arrEstatus.reduce((previous, current) => current += previous);
                      avg = sum / arrEstatus.length;
                      arreglo[0][x].Avance = parseInt(avg.toFixed(0));
                    }
                    arrEstatus = [];
                    break;
                  }else if(y === arreglo[0].length-1){
                    sum = arrEstatus.reduce((previous, current) => current += previous);
                    avg = sum / arrEstatus.length;
                    arreglo[0][x].Avance = parseInt(avg.toFixed(0));
                    proyectosArray[index].Avance = arreglo[0][0].Avance
                    // if(proyectosArray[index].Estatus === 5){
                    //   proyectosArray[index].Avance = 0
                    // }
                    arrEstatus = [];
                    // eslint-disable-next-line no-continue
                    continue;
                  }
                }
              } else{
                // eslint-disable-next-line no-continue
                continue;
        
              }
              arrEstatus = [];
            }
          }
        }

        if(arreglo[0][0].Avance === 100){
          proyectosArray[index].Avance = 100}

        if(proyectosArray[index].Avance === undefined){
          proyectosArray[index].Avance = 0
        }
      }
          
      yield put({
        type:  'APP/CONTAINER/PLANDETRABAJO/SET_PROYECTOS',
        data: proyectosArray,
      });
    }
  }
}


export function* obtProyectos(action){  
  const IdUsuario = yield select((state) => state.getIn(['planDeTrabajo','numUsuarioLogeado']))

  const {
    data,
    status,
  } = yield call(obtenerProyectos,action.id,IdUsuario);

  if(status === 200){
    const proyectos = data.recordset
    // ASIGNANDO IMAGEN AL PROYECTO
    let imagen = ''
    let arreglo = []
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < proyectos.length; index++) {
      
      if(proyectos[index].UsuarioDominio !== null){
        // ASIGNADO IMAGEN A CADA PROYECTO
        imagen =  yield call(getUsuarioImagen,proyectos[index].UsuarioDominio)
        if(imagen !==""){
          proyectos[index].imagen = imagen.data.imagen
        }
      }
      // ------
      // SACANDO EL NUMERO DE PORCENTAJE DEL PROGRESO DE CADA PROYECTO ---------        
      const {
        data:lineasBase,
        status:exito,
      } =  yield call(obtenerLineasBasesPorApi,proyectos[index].IdProyecto,proyectos[index].LineaBaseActiva)
        
      if(exito === 200){
        // eslint-disable-next-line prefer-destructuring
        arreglo = lineasBase

        let avg = 0;
        let sum = 0;
        let arrEstatus = [];
        let avance = '';
        const arrNums = arreglo[0].map(pos => pos.Padre ? pos.NumOrdenamiento : null)
          
        const maximo = max(arrNums);        
        for(let m=0;m < maximo;m++){
          for(let x=0;x<arreglo[0].length;x++){
              
            arreglo[0][x].Orden = x+1;
            
            if(arreglo[0][x].Padre){
              for(let y=x+1;y<arreglo[0].length;y++){  
                if(arreglo[0][y].NumOrdenamiento === arreglo[0][x].NumOrdenamiento+1){

                  avance = parseInt(arreglo[0][y].Avance === null ? 0 : arreglo[0][y].Avance);
                  arrEstatus.push(avance)

                  if(y === arreglo[0].length-1){
                    sum = arrEstatus.reduce((previous, current) => current += previous);
                    avg = sum / arrEstatus.length;
                    arreglo[0][x].Avance = parseInt(avg.toFixed(0));
                    if(arreglo[0][0].Avance>= 1){
                      proyectos[index].Avance = arreglo[0][0].Avance
                    }
                    arrEstatus = [];
                  }
                }else if(arreglo[0][x].NumOrdenamiento === arreglo[0][y].NumOrdenamiento){
                  if(arrEstatus.length > 0){
                    sum = arrEstatus.reduce((previous, current) => current += previous);
                    avg = sum / arrEstatus.length;
                    arreglo[0][x].Avance = parseInt(avg.toFixed(0));
                    // console.log(arreglo[0][0].Avance,"lag 2");
                    arrEstatus = [];
                  }
                  break;
                }else if(y === arreglo[0].length-1){
                  sum = arrEstatus.reduce((previous, current) => current += previous);
                  avg = sum / arrEstatus.length;
                  arreglo[0][x].Avance = parseInt(avg.toFixed(0));
                  proyectos[index].Avance = arreglo[0][0].Avance
                  // console.log(arreglo[0][0].Avance,"lag 3");
                  // debugger
                  arrEstatus = [];
                  // eslint-disable-next-line no-continue
                  continue;
                }
              }
            } else{
              // eslint-disable-next-line no-continue
              continue;
        
            }
            arrEstatus = [];
  
          }
        }
      }
      
      if(proyectos[index].Avance === undefined){
        proyectos[index].Avance = 0
      }
    }
    
    // console.log(data,"LA DATA");
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/SET_PROYECTOS',
      data: proyectos,
    });
  } 
}

export function* filtrarProyectos(action){  
  const idUsuarioEnvia = yield select((state) => state.getIn(['planDeTrabajo','numUsuarioLogeado']));

  // formato de fecha inicio
  const dateString =action.data.fechas.fechaInicio !== null ? moment(action.data.fechas.fechaInicio.format('YYYY-MM-DD')).format("YYYY-MM-DD") : null
  const time = dateString !== null ? "00:00:00" : null 
  const fechaIniciox =  time !== null ? moment(`${dateString  } ${  time}`) : null
  // const fechaIniciox =  time !== null ? moment(dateString + ' ' + time) : null
    
  // formato de fecha Fin
  const dateString2 =action.data.fechas.fechaFin !== null ? moment(action.data.fechas.fechaFin.format('YYYY-MM-DD')).format("YYYY-MM-DD") : null
  const time2 = dateString2 !== null ? "23:59:59" : null 
  const fechaFinx =  time2 !== null ? moment(`${dateString2  } ${  time2}`) : null

  const datos ={
    IdPortafolio:action.data.idPortafolio,
    responsable:action.data.responsable === undefined ? null : action.data.responsable,
    estatus:action.data.estatus ? action.data.estatus : null,
    autorizacionEstatus: action.data.autorizacionEstatus ? action.data.autorizacionEstatus : null,
    fechaInicio : fechaIniciox !== null ? moment(fechaIniciox).format('YYYY-MM-DD HH:mm:ss') : null,
    fechaFin : fechaFinx !== null ? moment(fechaFinx).format('YYYY-MM-DD HH:mm:ss') : null, 
    idUsuarioEnvia,
  }  

  const {
    data,
    status,
  } = yield call(obtenerProyectosPorFecha,datos);
    
  if(status === 200){
    const proyectos = data.recordset    
    // ASIGNANDO IMAGEN AL PROYECTO
    let imagen = ''
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < proyectos.length; index++) {
      if(proyectos[index].UsuarioDominio !== null){
        imagen =  yield call(getUsuarioImagen,proyectos[index].UsuarioDominio)
        if(imagen !==""){
          proyectos[index].imagen = imagen.data.imagen
        }
      }
    }
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/SET_PROYECTOS',
      data: proyectos,
    });
  } 
}

export function* abrirEdicion(action){  
  const {
    data,
    status,
  } = yield call(obtenerEmpleadosPorIdApi,action.event.Responsable);  
  const objetoEdicion = data.recordset
  objetoEdicion.proyecto = action.event  
  
  if(status === 200){
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/ABRIR_EDICION_PROYECTO_REDUCER',
      data:objetoEdicion,
    });
  }
}

export function* generarLinea(){  
  const usuario = yield select((state) => state.getIn(['global', 'currentUser']).toJS());
  const datosNotificacion = {
    IdUsuarioRecibe: 27594,
    IdDepartamentoRecibe: 29, 
    IdUsuarioEnvia: usuario.IdEmpleado,
    IdDepartamentoEnvia: usuario.IdDepartamento,
    Notificacion: "Esta es la notificacion pa que cheques el plan de trabajo compa",
    Direccion: "",
  }
  socket.emit('nuevaNotificacion',datosNotificacion);
}

export function* obtenerTicket(action){  
  const {
    data,
    status,
  } = yield call(obtenerEmpleadosPorIdApi,action.event.Responsable);
  const objetoEdicion = data.recordset
  objetoEdicion.proyecto = action.event  

  if(status === 200){
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/ABRIR_EDICION_PROYECTO_REDUCER',
      data:objetoEdicion,
    });
  }
}

export function* postInsertTicketsComentarios(action){

  const idTicket = yield select((state) => state
    .getIn(['planDeTrabajo','lineaBase', 'bandejaTickets', 'idTicketSelected']));

  const dataBlop = yield select((state) => state
    .getIn(['planDeTrabajo','lineaBase', 'bandejaTickets', 'ticketsDetails','dataBlop']));

  const etapas = yield select((state) => state
    .getIn(['planDeTrabajo','lineaBase', 'bandejaTickets', 'ticketSelected','etapas']));

  const etapaSiguiente = yield select((state) => state
    .getIn(['planDeTrabajo','lineaBase', 'bandejaTickets', 'ticketSelected','EtapaSiguiente']));
  
  let urlss = "";
  let nomArchivo = "";
  let banderaRequerido = true;

  if(etapas && action.from === 'modal'){
    
    const numUsuarioLogeado = yield select((state) => state
      .getIn(['planDeTrabajo','lineaBase', 'numUsuarioLogeado']));

    const idRolUsuarioLogeado = yield select((state) => state
      .getIn(['planDeTrabajo','lineaBase', 'idRolUsuarioLogeado']));

    const arrEtapas = etapas.toJS()
    let conf = [];
    let IdEtapa = -1;
    let indiceEtapa = -1;
    let tipo = -1;
    let requerido = false;
    
    for(let m=0; m < arrEtapas.length; m++){

      if((arrEtapas[m].IdUsuario === numUsuarioLogeado || arrEtapas[m].rolUsuarioSelected === idRolUsuarioLogeado) && arrEtapas[m].CerradaPorRegla === false && etapaSiguiente === arrEtapas[m].IdEtapa && IdEtapa === -1){
        IdEtapa = arrEtapas[m].IdTicketEtapa;
        conf = arrEtapas[m].configuracion;
        indiceEtapa = m;
      }
      if(indiceEtapa !== -1 && banderaRequerido){
        for(let c=0; c < arrEtapas[indiceEtapa].configuracion.length; c++){

          tipo = arrEtapas[indiceEtapa].configuracion[c].tipoComponenteId;
          requerido = arrEtapas[indiceEtapa].configuracion[c].config.requerido;

          if(tipo === 0 || tipo === 1 || tipo === 3 || tipo === 4){
            if(requerido && arrEtapas[indiceEtapa].configuracion[c].config.valor === ''){
              banderaRequerido = false;
              
              break;
            }
          }
          if(tipo === 2 && requerido){
            let opcion = '';
            let band = false;

            for(let op=0; op < arrEtapas[indiceEtapa].configuracion[c].config.opciones.length; op++){
              opcion = arrEtapas[indiceEtapa].configuracion[c].config.opciones[op].id;
              if(opcion !== ''){
                band = true;
                break;
              }
            }
            if(!band){
              banderaRequerido = false;
              
              break;
            }
          }
          if(tipo === 5){
            if(arrEtapas[indiceEtapa].configuracion[c].config.files === undefined || (requerido && arrEtapas[indiceEtapa].configuracion[c].config.files.length === 0)){
              banderaRequerido = false;
              
              break;
            }
          }
          if(tipo === 6){
            if(requerido && arrEtapas[indiceEtapa].configuracion[c].config.value === -1){
              banderaRequerido = false;
              
              break;
            }
          }
        }
      }
      
      if((IdEtapa !== -1 && !banderaRequerido))
        break;
      
    }
    
    try {
      for(let q=0; q<conf.length; q++){
        if(conf[q].tipoComponenteId === 5 && conf[q].config.files[0].url === undefined && conf[q].config.files.length > 0 && banderaRequerido){

          const {files} = conf[q].config;
          
          const arregloFiles = new FormData();
          arregloFiles.append('refId', 'tickets');
          for (let j = 0; j < files.length; j+=1) {
            arregloFiles.append('files', files[j], files[j].name);
          }

          const {
            status : estatusDos,
            data : file,
          } = yield call(postUploadFile, arregloFiles)

          if(estatusDos === 200){
            for (let k = 0; k < file.length; k+=1) {
              conf[q].config.files[k] = {
                url : file[k].url,
                value : file[k].name,
              };
            }
          }
        }
      }
    } catch (error) {
      yield put(
        enqueueSnackbar({
          message: 'Error, No se guardaron los archivos',
          options: {
            variant: 'warning',
          },
        })
      );
    }
    
    if(banderaRequerido){

      const datos = {
        IdEtapa,
        configuracion: conf,
      }
      
      const {
        status,
      // eslint-disable-next-line no-undef
      } = yield call(guardarEtapaApi, datos);
      
      if(status === 200){
        // nada
      }else{
        yield put(
          enqueueSnackbar({
            message: 'Error, No se guardo la configuracion de etapa',
            options: {
              variant: 'warning',
            },
          })
        );
      }
    }
  }

  if (dataBlop) {
    try {
      const {
        status,
        data = [],
      } = yield call(postUploadFileComentariosApi, dataBlop);
      
      const urls = data[0].url;
      
      urlss = urls;
      nomArchivo = data[0].name;
      if (status === 200) {
        //
      } else {
        yield put(
          enqueueSnackbar({
            message: 'Cuidado, no se subio el archivo',
            options: {
              variant: 'warning',
            },
          })
        );
      }
    } catch (error) {
      yield put(
        enqueueSnackbar({
          message: 'Error Al Subir Archivo Comentario',
          options: {
            variant: 'warning',
          },
        })
      );
    }
  }
  const {
    data: aliasBody,
    from,
    tipoJustificacion,
  } = action; 
  let idEtapaSeleccionada = ""
  let idTicketSelected2 = 0;

  if(etapas){
    const arrEtapas = etapas.toJS()
    
    arrEtapas.forEach((item,index) => {
      if(index=== action.data.indiceEtapa){
        idEtapaSeleccionada = item.IdEtapa
      }
    })
    
  }

  try {
    const dataMessage = {
      ...aliasBody,
      NomArchivo: nomArchivo,
      ArchivoAdjunto: urlss,
      Justificacion: from === 'modal' ? 1 : 0,
      IdEtapa: idEtapaSeleccionada,
    };
    idTicketSelected2 = dataMessage.IdTicket;

    socket.emit('nuevoMensajeChat',dataMessage)
    yield put({
      type: 'APP/CONTAINER/PLANDETRABAJO/REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION_SUCCESS',
    });

  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error Emit Nuevo Mensaje Chat');
  }

  if(banderaRequerido){

    if(etapas){
      const arrEtapas = etapas.toJS()
      arrEtapas.forEach((item,index) => {
        if(index=== action.data.indiceEtapa){
          idEtapaSeleccionada = item.IdEtapa
        }
      })    
    }

    const datosNotificacion = {
      IdUsuarioRecibe: 27023,
      IdDepartamentoRecibe: 29,
      IdUsuarioEnvia: 27422,
      IdDepartamentoEnvia: 29,
      Notificacion: "",
      Direccion: "",
    }
    
    const {
      data = [],
    } = yield call (getTicketEspecificoApi,  idTicket);
    
    try {
      if (from === 'modal') {   
        yield put({
          type: 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_ESTATUS_ACTION',
          ticketSelected: idTicketSelected2,
          tipo: tipoJustificacion,
        });
        // Aqui debe haber case dependiendo el nuevo estatus
        if (tipoJustificacion === 'Rechazar') {
          datosNotificacion.Notificacion= `¡Tú ticket ha sido rechazado \n#${idTicket} ${data[0].Nombre} `
          socket.emit('nuevaNotificacion',datosNotificacion);
        }else {
          datosNotificacion.Notificacion=`Aqui entra con el estatus:  ${ tipoJustificacion } del ticket: ${idTicket} ${data[0].Nombre}`
          socket.emit('nuevaNotificacion',datosNotificacion);
        }
      }else {
        datosNotificacion.Notificacion=`Aqui entra con el estatus:  ${ tipoJustificacion } del ticket: ${idTicket}`
        socket.emit('nuevaNotificacion',datosNotificacion);
        // yield call(getTicketsComentarios, { idTicket });
      }
  
    } catch (error) {
      yield put(
        enqueueSnackbar({
          message: 'Error al cambiar estatus',
          options: {
            variant: 'warning',
          },
        })
      );
    };
  }else{
    yield put(
      enqueueSnackbar({
        message: 'Error, Existe un campo requerido sin valor',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* lbCambiarDepartamentoInvitado (action){
  try {
    const {
      Departamento,
    } = action;
    const datos= {
      Tipo:'Departamento',
      Plaza: 0,
      Departamento,
      Puesto: 0,
    };

    const {
      data,
      status,
    } = yield call(obtenerEmpleadosDepartamentoApi,datos);

    if(status === 200){
      yield put({
        type: 'APP/CONTAINER/PLANDETRABAJO/SET_RECURSOS_A_INVITAR_ACTION',
        arreglo:data,
        Departamento,
      });
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al cambiar departamento',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* lbAsignarInvitarAmigo(){
  try {
    const Recurso = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','valorInvitarAmigo']));
    const IdPortafolio = yield select((state) => state.getIn(['planDeTrabajo','IdPortafolio']));
    const IdProyecto = yield select((state) => state.getIn(['planDeTrabajo','IdProyecto']));

   
    

    if(Recurso !== ''){

      const datos = {
        Recurso : Recurso.value,
        IdPortafolio,
        IdProyecto,
      };

      const {
        status,
      } = yield call (setInvitarAmigoApi, datos);

      if(status === 200){
        yield put({
          type: 'APP/CONTAINER/PLANDETRABAJO/ABRIR_INVITAR_AMIGO_ACTION',
        });

        yield put(
          enqueueSnackbar({
            message: 'Se envió la invitación',
            options: {
              variant: 'success',
            },
          })
        );

        let departamentoRecibe =""
        const {
          status:statusRecibe,
          data:usuarioRecibe,
        } = yield call (obtenerEmpleadosPorIdApi, Recurso.value);
        if(statusRecibe ===200){
          departamentoRecibe = usuarioRecibe.recordset[0].IdDepartamento
        }  

        const proyectos = yield select((state) => state.getIn(['planDeTrabajo','listadoProyectos','proyectos'])); 
        // console.log(proyectos,"PROYETOS");
        const Proyecto =  find(proyectos,['IdProyecto',IdProyecto])
        // console.log(IdProyecto,Proyecto);

        
        const datosNotificacion = {
          IdUsuarioRecibe: Recurso.value,
          IdDepartamentoRecibe: departamentoRecibe,
          IdUsuarioEnvia: 29623,
          IdDepartamentoEnvia: 29,
          Notificacion: `Usted esta invitado a visualizar el proyecto ${  Proyecto.NombreProyecto}`,
          Direccion: "",
        }
  
        // console.log(datos,datosNotificacion,"CR7");
        socket.emit('nuevaNotificacion',datosNotificacion);


      }else{
        yield put(
          enqueueSnackbar({
            message: 'No se pudó invitar al usuario',
            options: {
              variant: 'warning',
            },
          })
        );
      }
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al asignar invitado',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* getImagenAvatarAction() {
  const idUsuario = yield select((state) => state.getIn(['planDeTrabajo','numUsuarioLogeado']));
  const {
    status,
    data,
  } = yield call (getImagenAvatarApi, idUsuario);
  if(status === 200){
    yield put(
      Actions.get('SET_IMAGEN_AVATAR').fn(data)
    );
  }
}

// ------------------------------------------------------------ PROYECTOS PENDIENTES  --  <[(◕‿◕)]> 

export function* obttProyectosPendientes(){  
  const usuario = yield select((state) => state.getIn(['global', 'currentUser']).toJS());
  const IdUsuario = usuario.IdEmpleado
  
  const {
    data,
    status,
  } = yield call(obtenerProyectosPendientes,IdUsuario);
  
  
  if(status === 200){
    const proyectos = data.recordset
    // ASIGNANDO IMAGEN AL PROYECTO
    let imagen = ''
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < proyectos.length; index++) {
      if(proyectos[index].UsuarioDominio !== null){
        imagen =  yield call(getUsuarioImagen,proyectos[index].UsuarioDominio)
        if(imagen !==""){
          proyectos[index].imagen = imagen.data.imagen
        }
      }
    }

    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/SET_PROYECTOS',
      data: proyectos,
    });
  } 
}

export function* autorizarLineaBase(action) {
  const IdProyecto = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','idProyecto']));
  const IdLineaBase = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','IdLineaBase']));
  const IdUsuario = yield select((state) => state.getIn(['planDeTrabajo','numUsuarioLogeado']))
  const responsableId = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','Responsable']));

  let departamentoRecibe =""
  const {
    status:statusRecibe,
    data:usuarioRecibe,
  } = yield call (obtenerEmpleadosPorIdApi, IdUsuario);
  if(statusRecibe ===200){
    departamentoRecibe = usuarioRecibe.recordset[0].IdDepartamento
  }  
  
  const {
    status,
  } = yield call (cambiarProyectoEstatus, IdProyecto,IdLineaBase,action.event);
  
  if(status === 200){
    const datosNotificacion = {
      IdUsuarioRecibe: responsableId,
      IdDepartamentoRecibe: departamentoRecibe,
      IdUsuarioEnvia: IdUsuario,
      IdDepartamentoEnvia: 30,
      Notificacion: action.event === 2 ?"Se autorizo la linea base." : "Se rechazo la linea base",
      Direccion: "",
    }
    socket.emit('nuevaNotificacion',datosNotificacion);
  }

  yield put({
    type:'APP/CONTAINER/PLANDETRABAJO/ABRIR_AUTORIZACION_MODAL',
    event:false,
  });
  yield put(
    Actions.get('OBTENER_PR_PENDIENTES').fn()
  )
  yield put(
    Actions.get('CAMBIAR_STEPPER').fn(1)
  );
}

export function* filtrarProyectosPendientes(action){  
  const idUsuarioEnvia = yield select((state) => state.getIn(['planDeTrabajo','numUsuarioLogeado']));

  // formato de fecha inicio
  const dateString =action.data.fechas.fechaInicio !== null ? moment(action.data.fechas.fechaInicio.format('YYYY-MM-DD')).format("YYYY-MM-DD") : null
  const time = dateString !== null ? "00:00:00" : null 
  const fechaIniciox =  time !== null ? moment(`${dateString  } ${  time}`) : null
  // const fechaIniciox =  time !== null ? moment(dateString + ' ' + time) : null
    
  // formato de fecha Fin
  const dateString2 =action.data.fechas.fechaFin !== null ? moment(action.data.fechas.fechaFin.format('YYYY-MM-DD')).format("YYYY-MM-DD") : null
  const time2 = dateString2 !== null ? "23:59:59" : null 
  const fechaFinx =  time2 !== null ? moment(`${dateString2  } ${  time2}`) : null

  const datos ={
    IdPortafolio:action.data.idPortafolio,
    responsable:action.data.responsable === undefined ? null : action.data.responsable,
    estatus:action.data.estatus ? action.data.estatus : null,
    fechaInicio : fechaIniciox !== null ? moment(fechaIniciox).format('YYYY-MM-DD HH:mm:ss') : null,
    fechaFin : fechaFinx !== null ? moment(fechaFinx).format('YYYY-MM-DD HH:mm:ss') : null, 
    idUsuarioEnvia,
  }  

  const {
    data,
    status,
  } = yield call(obtenerProyectosPorFechaPendientes,datos);
    
  if(status === 200){
    const proyectos = data.recordset    
    // ASIGNANDO IMAGEN AL PROYECTO
    let imagen = ''
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < proyectos.length; index++) {
      if(proyectos[index].UsuarioDominio !== null){
        imagen =  yield call(getUsuarioImagen,proyectos[index].UsuarioDominio)
        if(imagen !==""){
          proyectos[index].imagen = imagen.data.imagen
        }
      }
    }
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/SET_PROYECTOS',
      data: proyectos,
    });
  } 
  
}

export function* insertarObservaciones(action){
  const idProyecto = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','idProyecto']));
  const IdLineaBase = yield select((state) => state.getIn(['planDeTrabajo','lineaBase','IdLineaBase']));
  const data = {idProyecto,observacion:action.observacion,IdLineaBase}
  const {
    status,
  } = yield call (postInsertarObservacion, data);
  
  if(status === 200){
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/AUTORIZAR_LINEA_BASE',
      event: 3,
      
    });
  }
}

export function* obtenerObservaciones(action){  
  const {
    status,
    data,
  } = yield call (obtenerObservacionesApi, action.idProyecto);
  if(status === 200){
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_OBSERVACIONES',
      event: data[0],
    });
  }  
}

export function* obtenerObservaciones2(action){ 
  const {
    status,
    data,
  } = yield call (obtenerObservacionesApi, action.idProyecto);
  if(status === 200){
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_OBSERVACIONES',
      event: data[0],
    });
  }  
}

export function* guardarImpactos(action){  
  const {
    status,
    data,
  } = yield call (obtenerObservacionesApi, action.idProyecto);
  if(status === 200){
    
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_OBSERVACIONES',
      event: data[0],
    });
  }  
}

export function* guardarImpactosDocumentos(action){
  // console.log(action,"guardarImpactosDocumentos ------------------------------");
  
  const ponderacionEnEdicion = yield select((state) => state.getIn(['planDeTrabajo','listadoProyectos','impactoEnEdicion']))
  
  const idProyecto = yield select((state) => state.getIn(['planDeTrabajo','IdProyecto']));
  const impactosDocumentos = yield select((state) => state.getIn(['planDeTrabajo','listadoProyectos','impactosDocumentos']));
  let ponderacionTotal = 0
 
  for (let i = 0; i < impactosDocumentos.length; i++) {
    // console.log(parseInt(impactosDocumentos[i].Ponderacion));
    
    ponderacionTotal += parseInt(impactosDocumentos[i].Ponderacion)
  }
  // console.log(ponderacionTotal,"ponderacionTotal");

  if(ponderacionEnEdicion !==""){
    ponderacionTotal = ponderacionTotal-ponderacionEnEdicion 
  }

  if(ponderacionTotal + action.datos.ponderacionDocumentos > 100){
    return yield put(
      enqueueSnackbar({
        message: 'La ponderación es mayor que 100',
        options: {
          variant: 'warning',
        },
      })
    );
  }

  action.datos.IdProyecto = idProyecto
  const {
    status,
  } = yield call (postInsertarDocumentosApi, action.datos);
  
  if(status ===200){
    
    const {
      status:status2,
      data:datos,
    } = yield call (obtenerImpactosDocumentosApi, idProyecto);
   
    if(status2 ===200){
      
      for (let i = 0; i < datos[0].length; i++) {
        if(datos[0][i].Calificacion === null){
          datos[0][i].Calificacion = 0
        }
      }

      yield put({
        type:  'APP/CONTAINER/PLANDETRABAJO/SET_IMPACTOS_DOCUMENTOS',
        event: datos,
      });
    }
  }
  return 0
}

export function* obtenerImpactosDocumentos(){
  const idProyecto = yield select((state) => state.getIn(['planDeTrabajo','IdProyecto']));
  
  const {
    status,
    data,
  } = yield call (obtenerImpactosDocumentosApi, idProyecto);
  
  if(status ===200){
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/SET_IMPACTOS_DOCUMENTOS',
      event: data,
    });
  }
}

export function* guardarImpactosRiesgos(action){
  const idProyecto = yield select((state) => state.getIn(['planDeTrabajo','IdProyecto']));
  action.datos.IdProyecto = idProyecto
  const {
    status,
  } = yield call (postInsertarImpactosRiesgosApi, action.datos);
  
  if(status ===200){
    const {
      status:status2,
      data:datos,
    } = yield call (obtenerImpactosRiesgosApi, idProyecto);
    
    if(status2 ===200){
      yield put({
        type:  'APP/CONTAINER/PLANDETRABAJO/SET_IMPACTOS_DOCUMENTOS',
        event: datos,
      });
    }
  }
}

export function* obtenerImpactosRiesgos(){
  const idProyecto = yield select((state) => state.getIn(['planDeTrabajo','IdProyecto']));
  
  const {
    status,
    data,
  } = yield call (obtenerImpactosRiesgosApi, idProyecto);
  
  if(status ===200){
    yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/SET_IMPACTOS_DOCUMENTOS',
      event: data,
    });
  }
}

export function* revisionImpactos(action){
  // -- DOCUMENTOS --------------------------------------------------------------
  const {
    status,
    data,
  } = yield call (obtenerImpactosDocumentosApi, action.IdProyecto);
  
  if(status === 200){
    const impactosD = data[0]
    console.log(impactosD);
    
    
    let impactosVacios = false
    for (let i = 0; i < impactosD.length; i++) {
      if(impactosD[i].Calificacion ===null || impactosD[i].Calificacion ==='0' || impactosD[i].Calificacion ==='' || impactosD[i].Calificacion ===0)   
        impactosVacios = true        
    }  

    // -------------------------------------------------------------
    // --RIESGOS -----------------------------------------------------------------------

    const {
      status : success,
      data: riesgos,
    } = yield call (obtenerImpactosRiesgosApi, action.IdProyecto);

    if(success ===200){
      const impactosR = riesgos[0]
      for (let i = 0; i < impactosR.length; i++) {
        if(impactosR[i].Calificacion ===null || impactosR[i].Calificacion ==='0' || impactosR[i].Calificacion ==='')   
          impactosVacios = true 
      }    
    } 

    // --------------------------------------------------------------
    
    if(impactosVacios){
      // eslint-disable-next-line no-unused-vars
      const cambioEstatus = yield call (cambiarEstatusImpactosApi, action.IdProyecto);
      return yield put({
        type:  'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_CERRADO_PROYECTO',
        event: true,
      });
    }

    const {
      status:estatusCambiado,
    } = yield call (cambiarEstatusApi, action.IdProyecto,4);

    if(estatusCambiado === 200){
      yield put(
        enqueueSnackbar({
          message: 'Proyecto cerrado con exito',
          options: {
            variant: 'success',
          },
        })
      );

      const IdUsuario = yield select((state) => state.getIn(['planDeTrabajo','numUsuarioLogeado']))

      const {
        data:dataRecibida,
        status:statusRecibido,
      } = yield call(obtenerProyectos,action.IdPortafolio,IdUsuario);

      if(statusRecibido === 200){
        const proyectos = dataRecibida.recordset
        // ASIGNANDO IMAGEN AL PROYECTO
        let imagen = ''
        let arreglo = []
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < proyectos.length; index++) {
          if(proyectos[index].UsuarioDominio !== null){
            // ASIGNADO IMAGEN A CADA PROYECTO
            imagen =  yield call(getUsuarioImagen,proyectos[index].UsuarioDominio)
            if(imagen !==""){
              proyectos[index].imagen = imagen.data.imagen
            }
          }
          // SACANDO EL NUMERO DE PORCENTAJE DEL PROGRESO DE CADA PROYECTO ---------
          const {
            data:lineasBase,
            status:exito,
          } =  yield call(obtenerLineasBasesPorApi,proyectos[index].IdProyecto,proyectos[index].LineaBaseActiva)
        
          if(exito === 200){
            // eslint-disable-next-line prefer-destructuring
            arreglo = lineasBase
            const conteoPadres = []
            let avg = 0;
            let sum = 0;
            let arrEstatus = [];
            let avance = '';
            const arrNums = arreglo[0].map(pos => pos.Padre ? pos.NumOrdenamiento : null)
            const maximo = max(arrNums);
        
            for(let m=0;m < maximo;m++){
              for(let x=0;x<arreglo[0].length;x++){
              
                arreglo[0][x].Orden = x+1;
              
                if(arreglo[0][x].Padre){
                  for(let y=x+1;y<arreglo[0].length;y++){   
                    if(arreglo[0][y].NumOrdenamiento === arreglo[0][x].NumOrdenamiento+1){
                      avance = parseInt(arreglo[0][y].Avance === null ? 0 : arreglo[0][y].Avance);
                      arrEstatus.push(avance)
                      if(y === arreglo[0].length-1){
                        sum = arrEstatus.reduce((previous, current) => current += previous);
                        avg = sum / arrEstatus.length;
                        arreglo[0][x].Avance = parseInt(avg.toFixed(0));
                        if(arreglo[0][0].Avance>= 1){
                          proyectos[index].Avance = arreglo[0][0].Avance
                        }
                        arrEstatus = [];
                      }
                    }else if(arreglo[0][x].NumOrdenamiento === arreglo[0][y].NumOrdenamiento){
                      if(arrEstatus.length > 0){
                        sum = arrEstatus.reduce((previous, current) => current += previous);
                        avg = sum / arrEstatus.length;
                        arreglo[0][x].Avance = parseInt(avg.toFixed(0));
                      }
                      arrEstatus = [];
                      break;
                    }else if(y === arreglo[0].length-1){
                      sum = arrEstatus.reduce((previous, current) => current += previous);
                      avg = sum / arrEstatus.length;
                      arreglo[0][x].Avance = parseInt(avg.toFixed(0));
                      proyectos[index].Avance = arreglo[0][0].Avance
                      // if(proyectos[index].Estatus ===5){
                      //   proyectos[index].Avance = 0
                      // }
                      arrEstatus = [];
                      // eslint-disable-next-line no-continue
                      continue;
                    }
                  }
                } else{
                  // eslint-disable-next-line no-continue
                  continue;
        
                }
                arrEstatus = [];
              }
            }
          
            if(arreglo[0][0].Avance === 100)
            {
              proyectos[index].Avance = 100
            }
          }
          
          if(proyectos[index].Avance === undefined){
            proyectos[index].Avance = 0
          }
        }
     
        yield put({
          type:  'APP/CONTAINER/PLANDETRABAJO/SET_PROYECTOS',
          data: proyectos,
        });
      } 
    }
  }
}

export function* cancelarProyecto(action){
  const {
    status,
    data,
  } = yield call (obtenerLineasBasesPorApi, action.IdProyecto,action.LineaBaseActiva);
  
  let arr =[] 

  if(status === 200){
    // eslint-disable-next-line prefer-destructuring
    arr = data[0] 
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].Padre === false){        
        // eslint-disable-next-line no-unused-vars
        const ticketEstatus  = yield call (cambiarEstatusTicket,arr[i].IdTicket,5);
      }
    }    
  }


  if(arr.length > 0){
  // cambio estatus proyecto
    const {
      status:estatusCambiado,
    } = yield call (cambiarEstatusApi, action.IdProyecto,5);

    if(estatusCambiado === 200){
      yield put({
        type:  'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_CANCELADO_PROYECTO',
        event: false,
      });

      yield put(
        enqueueSnackbar({
          message: 'Proyecto se ha cancelado',
          options: {
            variant: 'success',
          },
        })
      );
    }

    const IdUsuario = yield select((state) => state.getIn(['planDeTrabajo','numUsuarioLogeado']))

    const {
      data:dataRecibida,
      status:statusRecibido,
    } = yield call(obtenerProyectos,action.IdPortafolio,IdUsuario);

    if(statusRecibido === 200){
      const proyectos = dataRecibida.recordset
      // ASIGNANDO IMAGEN AL PROYECTO
      let imagen = ''
      let arreglo = []
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < proyectos.length; index++) {
        if(proyectos[index].UsuarioDominio !== null){
        // ASIGNADO IMAGEN A CADA PROYECTO
          imagen =  yield call(getUsuarioImagen,proyectos[index].UsuarioDominio)
          if(imagen !==""){
            proyectos[index].imagen = imagen.data.imagen
          }
        }
        // SACANDO EL NUMERO DE PORCENTAJE DEL PROGRESO DE CADA PROYECTO ---------
        const {
          data:lineasBase,
          status:exito,
        } =  yield call(obtenerLineasBasesPorApi,proyectos[index].IdProyecto,proyectos[index].LineaBaseActiva)
        
        if(exito === 200){
          // eslint-disable-next-line prefer-destructuring
          arreglo = lineasBase
          const conteoPadres = []
          let avg = 0;
          let sum = 0;
          let arrEstatus = [];
          let avance = '';
          const arrNums = arreglo[0].map(pos => pos.Padre ? pos.NumOrdenamiento : null)
          const maximo = max(arrNums);
        
          for(let m=0;m < maximo;m++){
            for(let x=0;x<arreglo[0].length;x++){
              
              arreglo[0][x].Orden = x+1;
              
              if(arreglo[0][x].Padre){
                for(let y=x+1;y<arreglo[0].length;y++){   
                  if(arreglo[0][y].NumOrdenamiento === arreglo[0][x].NumOrdenamiento+1){
                    avance = parseInt(arreglo[0][y].Avance === null ? 0 : arreglo[0][y].Avance);
                    arrEstatus.push(avance)
                    if(y === arreglo[0].length-1){
                      sum = arrEstatus.reduce((previous, current) => current += previous);
                      avg = sum / arrEstatus.length;
                      arreglo[0][x].Avance = parseInt(avg.toFixed(0));
                      if(arreglo[0][0].Avance>= 1){
                        proyectos[index].Avance = arreglo[0][0].Avance
                      }
                      arrEstatus = [];
                    }
                  }else if(arreglo[0][x].NumOrdenamiento === arreglo[0][y].NumOrdenamiento){
                    if(arrEstatus.length > 0){
                      sum = arrEstatus.reduce((previous, current) => current += previous);
                      avg = sum / arrEstatus.length;
                      arreglo[0][x].Avance = parseInt(avg.toFixed(0));
                    }
                    arrEstatus = [];
                    break;
                  }else if(y === arreglo[0].length-1){
                    sum = arrEstatus.reduce((previous, current) => current += previous);
                    avg = sum / arrEstatus.length;
                    arreglo[0][x].Avance = parseInt(avg.toFixed(0));
                    proyectos[index].Avance = arreglo[0][0].Avance
                    arrEstatus = [];
                    // if(proyectos[index].Estatus ===5){
                    //   proyectos[index].Avance = 0
                    // }
                    // eslint-disable-next-line no-continue
                    continue;
                  }
                }
              } else{
                // eslint-disable-next-line no-continue
                continue;
        
              }
              arrEstatus = [];
            }
          }
        
          if(arreglo[0][0].Avance === 100){
            proyectos[index].Avance = 100}}
        
        if(proyectos[index].Avance === undefined){
          proyectos[index].Avance = 0
        }
      }
     
      yield put({
        type:  'APP/CONTAINER/PLANDETRABAJO/SET_PROYECTOS',
        data: proyectos,
      });
    } 
  }
}

export function* cambiarEstatusImpactosDocumentos(action){
  const idImpactoSeleccionado = yield select((state) => state.getIn(['planDeTrabajo','listadoProyectos','idImpactoSeleccionado']));
  // cambio estatus proyecto

  const idProyecto = yield select((state) => state.getIn(['planDeTrabajo','IdProyecto']));    

  if(action.tipoImpacto === 'Documento'){
    const {
      status:estatusCambiado,
    } = yield call (cambiarEstatusImpactosDocumentosApi,idImpactoSeleccionado);

   
    
    if(estatusCambiado === 200){
      yield put(
        enqueueSnackbar({
          message: 'Registro Borrado',
          options: {
            variant: 'success',
          },
        })
      ) 
    
      // Obteniendo Impactos

      const {
        status,
        data,
      } = yield call (obtenerImpactosDocumentosApi, idProyecto);
        
      if(status ===200){
        return yield put({
          type:  'APP/CONTAINER/PLANDETRABAJO/SET_IMPACTOS_DOCUMENTOS',
          event: data,
        });
      }
    }
  }
    

  if(action.tipoImpacto === 'Riesgo'){
    const {
      status:estatusCambiado,
    } = yield call (cambiarEstatusImpactosRiesgosApi,idImpactoSeleccionado);

    if(estatusCambiado === 200){
      yield put(
        enqueueSnackbar({
          message: 'Registro Borrado',
          options: {
            variant: 'success',
          },
        })
      ) 


      const {
        status,
        data,
      } = yield call (obtenerImpactosRiesgosApi, idProyecto);
        
      if(status ===200){
        return yield put({
          type:  'APP/CONTAINER/PLANDETRABAJO/SET_IMPACTOS_DOCUMENTOS',
          event: data,
        });
      }
    }
  }
  
}

export function* obtenerTicketLineaBase(action){  
  const {
    status,
    data,
  } = yield call (obtenerTicketApi,action.IdTicket);
  if(status === 200){

    const arr =data[0][0]
    const configu = JSON.parse(JSON.stringify(data[0][0].tipoForma));
    return yield put({
      type:  'APP/CONTAINER/PLANDETRABAJO/SET_TICKET_SELECTED',
      data:arr,
      configuracion:configu,
    });
    
  }
}

export function* obtenerTicketsCancelacion(action){  
  
  // const {
  //   status,
  //   data,
  // } = yield call (obtenerTicketsCancelacionApi,action.IdProyecto);
  // if(status === 200){
  //   const tickets =data[0]
  //   return yield put({
  //     type:  'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_CANCELADO_PROYECTO',
  //     tickets,
  //     event:true,
  //   });
  // }
  
  return yield put({
    type:  'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_CANCELADO_PROYECTO',
    event:true,
  });
}

export default function* planDeTrabajoSaga() {
  //   takeLatest('APP/CONTAINER/PLANDETRABAJO/GENERAR_LINEA_BASE',generarLinea),
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/OBTENER_ARREGLO_COMPONENTES_LINEA_BASE_ACTION',obtenerPlantilla);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/LB_AGREGAR_REGISTRO_NUEVO_ACTION', lbAgregarNuevoRegistro);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/LB_BORRAR_REGISTRO_NUEVO_ACTION', lbBorrarNuevoRegistro);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/LB_ON_DRAG_END_ACTION',lbOnDragEnd);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/LB_ON_CLICK_BAJAR_NODO_ACTION',lbOnClickBajarNodo);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/LB_ON_CLICK_SUBIR_NODO_ACTION',lbOnClickSubirNodo);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/FILTRAR_RECURSO_ACTION',lbFiltrarRecurso);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/LB_CAMBIAR_VALOR_FECHAS_ACTION',lbCambiarFecha);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/AGREGAR_NUEVA_COLUMNA_ACTION',lbAgregarNuevaColumna);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_FECHAS_ACTION',lbReordenarFechas);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/OBTENER_CATALOGOS_RECURSO_ACTION',lbObtenerCatalogosRecurso);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/GUARDAR_LINEABASE_ACTION',lbGuardarLineaBase);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/AUTORIZAR_LINEA_BASE',autorizarLineaBase);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION',postInsertTicketsComentarios),
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/CAMBIAR_DEPARTAMENTO_INVITAR_AMIGO_ACTION',lbCambiarDepartamentoInvitado);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/ASIGNAR_INVITAR_AMIGO_ACTION',lbAsignarInvitarAmigo);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/ENVIAR_LINEA_BASE_ACTION',lbEnviarLineaBase);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/AGREGAR_COLUMNA_CAMPO_ACTION',lbAgregarColumnaComponente);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/AGREGAR_COLUMNA_ETAPA_CAMPO_ACTION',lbAgregarColumnaEtapa);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/GUARDAR_OBSERVACIONES', insertarObservaciones);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/EDITAR_LINEABASE_ACTION', editarLineaBase);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/CAMBIAR_LINEABASE_ACTION', cambiarLineaBase);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/CANCELAR_COPIA_LINEABASE_ACTION', cancelarCopiaLineaBase);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_PADRE_ACTION', lbReordenarPadres);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/LB_REORDENAR_AVANCE_ACTION', lbReodenarAvance);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/LB_ONCHANGE_VALUE_DEPENDENCIA_ACTION', validarOnChangeDependencia);
  
  // yield takeLatest('APP/CONTAINER/PLANDETRABAJO/GUARDAR_IMPACTOS_DOCUMENTOS', guardarImpactosDocumentos);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/GUARDAR_IMPACTOS_DOCUMENTOS', guardarImpactosDocumentos);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/OBTENER_IMPACTOS_DOCUMENTOS',obtenerImpactosDocumentos);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/GUARDAR_IMPACTOS_RIESGOS', guardarImpactosRiesgos);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/OBTENER_IMPACTOS_RIESGOS',obtenerImpactosRiesgos);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_CERRADO_PROYECTO',revisionImpactos);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/CANCELAR_PROYECTO',cancelarProyecto);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/CAMBIAR_ESTATUS_IMPACTOS',cambiarEstatusImpactosDocumentos)
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/OBTENER_TICKET',obtenerTicketLineaBase)
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/OBTENER_OBSERVACIONES', obtenerObservaciones2);
  yield takeLatest('APP/CONTAINER/PLANDETRABAJO/OBTENER_TICKETS_CANCELACION', obtenerTicketsCancelacion);
  
  
  
  
  // ACTIONS -----------------------------------------------------------------------------------------------------
  

  yield takeLatest(ACTION('GUARDAR_PORTAFOLIO'), insertarPortafolios);
  yield takeLatest(ACTION('OBTENER_PORTAFOLIOS'), obtenerPortafolios);
  yield takeLatest(ACTION('OBTENER_PLANTILLAS'), obtPlantillas);
  yield takeLatest(ACTION('OBTENER_EMPLEADOS'), obtEmpleados);
  yield takeLatest(ACTION('GUARDAR_PROYECTO'), insertarProyectos);
  yield takeLatest(ACTION('OBTENER_PROYECTOS'), obtProyectos);
  yield takeLatest(ACTION('ON_CLICK_FILTRAR'), filtrarProyectos);
  yield takeLatest(ACTION('ON_CLICK_FILTRAR_PENDIENTES'), filtrarProyectosPendientes);
  yield takeLatest(ACTION('ABRIR_EDICION_PROYECTO'), abrirEdicion);
  yield takeLatest(ACTION('OBTENER_PR_PENDIENTES'), obttProyectosPendientes);
  yield takeLatest(ACTION('GET_IMAGEN_AVATAR'), getImagenAvatarAction);
  yield takeLatest(ACTION('OBTENER_OBSERVACIONES'), obtenerObservaciones);
}