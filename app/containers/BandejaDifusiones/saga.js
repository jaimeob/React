// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { takeLatest, put, call, select  } from 'redux-saga/effects';
import socketIOClient from "socket.io-client";
// import { degrees } from 'style-value-types';
import _ from 'lodash'// eslint-disable-line
import config from 'config/config.development';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import Actions from './actions';

import {

  postUploadFileComentariosApi,
  postInsertDifusionsApi,
  getDepartamentos,
  getDifusionSelectedApi,
  cambiarEstatusApi,
  getDifusionesApi,
} from './api';


const endpoint = config.api.socketURL;
const socket = socketIOClient(endpoint);



const ACTION = (name = '') => Actions.get(name).id || '';


// export function* funcSockets(params){

//   yield put({
//     type: 'POST_EMIT_SOCKETS',
//     params,
//   });
  
// }

export function* postInsertDifusions(action){
  // VALIDAR SI TIENE ASUNTO MENSAJE Y DEPARTAMENTO
  if(action.mensaje.arregloDepartamentos.length !== 0 && action.mensaje.asunto !== '' && action.mensaje.comentarios !== ''){
    const dataBlop = yield select((state) => state.getIn(['bandejaDifusiones', 'mensaje','dataBlop']));
    let urlss = "";
    let nomArchivo = ""; // eslint-disable-line

 
    if (dataBlop) {
      try {
        const {
          status,
          data = [],
          request,
        } = yield call(postUploadFileComentariosApi, dataBlop);

        const urls = data[0].url;
  
        urlss = urls;
        nomArchivo = data[0].name;  
      
        if (status !== 200) {
          yield put({
            type: 'POST_INSERT_FILES_COMENTARIOS_ACTION_FAILED',
            request,
          });

        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error Al Subir Archivo!',error);
      }
    }
    
    // VALIDAR EXTENSIONS DE IMAGEN
    const urlssMinus = urlss.toLowerCase()
    const imagen =  urlssMinus.includes('.jpeg')  || urlssMinus.includes('.png') || urlssMinus.includes('.jpg')
    if(!imagen && urlss !== ''){
      yield put(
        enqueueSnackbar({
          message: 'Imagen no valida',
          options: {
            variant: 'error',
          },
        })
      ); 
      return 
    }     
   
    const departamentos = yield call (getDepartamentos);
    // const checkDepartamentos = _.find(action.mensaje.arregloDepartamentos, {nombre:'Todos'});
    try {
      // Validar Maximo de caracteres
      if(action.mensaje.comentarios.length < 1500){
        const asunto = action.mensaje.asunto.trim();
        const mensaje = action.mensaje.comentarios.trim();
        const datos ={
          Asunto:asunto,
          Mensaje:mensaje,
          UrlArchivo:urlss,
          EmpleadoEnvia:27023, 
          DepartamentoId :action.mensaje.arregloDepartamentos = mensaje.checked ? departamentos.data : action.mensaje.arregloDepartamentos,
          Tipo  :0,
        }
        
        const datosNotificacion = {
          IdUsuarioEnvia: 27023,
          IdDepartamentoEnvia: 29,
          Notificacion: mensaje,
          Direccion: "",
          Departamentos :action.mensaje.arregloDepartamentos = mensaje.checked ? departamentos.data : action.mensaje.arregloDepartamentos,
        }   

        socket.emit('nuevaNotificacionPorDepartamento',datosNotificacion);

        const {
          status,
          request,
        } = yield call(postInsertDifusionsApi,datos);

        if (status === 200) {
          
          yield put(
            enqueueSnackbar({
              message: 'Exito',
              options: {
                variant: 'success',
              },
            })
          );

          const numUsuarioLogeado = yield select((state) => state.getIn(['tableros','numUsuarioLogeado']));
          const idDepartamentoLogeado = yield select((state) => state.getIn(['tableros','idDepartamentoLogeado']));
          socket.emit('obtenerTotalesTicketsDifusiones', idDepartamentoLogeado, numUsuarioLogeado);

      
          yield put({ 
          // type: `${actionId}_SUCCESS`,
            type: ('APP/CONTAINER/BANDEJADIFUSIONES/POST_INSERT_DIFUSIONS_SUCCESS'),
          });
          const datosDif ={
            Asunto:asunto,
            Mensaje:mensaje,
            UrlArchivo: urlss,
            EmpleadoId: 27023,
            DepartamentoId : 29,
            Tipo  :0,
          }

          const difusiones = yield call (getDifusionesApi,datosDif);
          yield put({
            type: 'APP/CONTAINER/BANDEJADIFUSIONES/GET_DIFUSIONES_SUCCESS', difusiones,
          });

          yield put({
            type: 'APP/CONTAINER/BANDEJADIFUSIONES/HIDE_FORM',
          });


        } else {
          yield put({
            // type: `${actionId}_FAILED`,
            request,
          });
          // yield put(Actions.get(`${actionId}_FAILED`).fn(request));
        }
      }else{
        yield put(
          enqueueSnackbar({
            message: 'excediste el número máximo de caracteres',
            options: {
              variant: 'error',
            },
          })
        );

      }

      
    } catch (error) {
      yield put({
      // type: `${actionId}_FAILED`,
        error,
      });
    }
  }else{
    yield put(
      enqueueSnackbar({
        message: 'Existen datos obligatorios en blanco. Favor de ingresarlos',
        options: {
          variant: 'warning',
        },
      })
    );
  }
};

export function* openDifusionAction(params){
  // console.log(params,"Parametros");
  
  try{
      
    const difusionSeleccionada = yield call (getDifusionSelectedApi,params.data.IdDifusion);
    yield put({
      type: 'APP/CONTAINER/BANDEJADIFUSIONES/RELOAD_DIFUSION_SUCCESS', difusionSeleccionada,
    });
    
    const datos = {
      DepartamentoId: 29,
      IdDifusion: params.data.IdDifusion,
      IdEmpleado: 27023,
    };
    if(params.data.Leido === false){
      const {
        status: statusCambiar,
      } = yield call (cambiarEstatusApi,datos); // eslint-disable-line
  
      if (statusCambiar === 200) {
          
        const numUsuarioLogeado = yield select((state) => state.getIn(['tableros','numUsuarioLogeado']));
        const idDepartamentoLogeado = yield select((state) => state.getIn(['tableros','idDepartamentoLogeado']));
        socket.emit('obtenerTotalesTicketsDifusiones', idDepartamentoLogeado, numUsuarioLogeado);
        
      }
  
      const datosDif ={
        Asunto:params.data.Asunto,
        Mensaje:params.data.Mensaje,
        UrlArchivo: params.data.UrlArchivo,
        EmpleadoId:27023,
        DepartamentoId : 29,
        Tipo  :0,
      }
  
      const difusiones = yield call (getDifusionesApi,datosDif);
      yield put({
        type: 'APP/CONTAINER/BANDEJADIFUSIONES/GET_DIFUSIONES_SUCCESS', difusiones,
      });
      // Refrescar listado
      
    }
      
  } catch( err ) {
    yield put({
      type: ('APP/CONTAINER/BANDEJADIFUSIONES/RELOAD_DIFUSION_FAILED', err),
    })
  }
}

export function* getDepartamentosAction(){
  yield put({
    
    type: 'APP/CONTAINER/BANDEJADIFUSIONES/SHOW_FORM_SUCCESS',
  });
  try{
    const departamentos = yield call (getDepartamentos);
    yield put({
    
      type: 'APP/CONTAINER/BANDEJADIFUSIONES/REQUEST_DEPARTAMENTOS_SUCCESS', departamentos,
    });

    // boleano mostrar formulario
    
  } catch( err ) {
    yield put({
    
      type: ('APP/CONTAINER/BANDEJADIFUSIONES/REQUEST_DEPARTAMENTOS_FAILED', err),
    })
  }
}



export default function* bandejaDifusionesSaga() {
  yield takeLatest(ACTION('POST_INSERT_DIFUSIONS'), postInsertDifusions);
  yield takeLatest(ACTION('GET_DEPARTAMENTOS'), getDepartamentosAction);
  yield takeLatest(ACTION('OPEN_DIFUSION'), openDifusionAction);
  
  


 
}