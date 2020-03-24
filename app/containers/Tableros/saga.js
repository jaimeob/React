/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable no-cond-assign */
import { takeLatest, put, call, select, takeEvery  } from 'redux-saga/effects';

import { assign, compact } from 'lodash';
import config from 'config/config.development';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import socketIOClient from "socket.io-client";
// import config from 'config/config.development';
// import { isNumber } from 'util';
import {
  getDepartamentos,
  getDepartamentosPlantillas, 
  getTicketsComentariosApi,
  // postInsertTicketsComentariosApi,
  postTicket,
  postUploadFileComentariosApi,
  getTickets,
  postCambiarEstatusApi,
  getObtejerEmpleadosAsignarApi,
  getObtenerPrioridadesAsignarApi,
  postAsignarEmpleadoApi,
  getDownloadedTicketFile,
  getDifusionesApi,
  getTicketsPorDepartamento,
  getTicketsById,
  getImagenAvatarApi,
  getDatosCatalogoApi,
  getRelacionesApi,
  getDatosCatalogoApi2,
  //  obtenerFecha,
  obtenerTicketEtapas,
  autorizarTicketApi,
  getTicketEspecificoApi,
  obtenerTicketEtapasEstatus,

  obtenerPlazasUsuarioApi,
  guardarEtapaApi,
  postUploadFile,
  getDownloadedFile,
// eslint-disable-next-line import/named
} from './api';
import Actions from './actions';

const endpoint = config.api.socketURL;
const socket = socketIOClient(endpoint);
const pref = 'APP/CONTAINER/TABLEROS/';
const prefDif = 'APP/CONTAINER/BANDEJADIFUSIONES/';

const ACTION = (name = '') => Actions.get(name).id || '';

export function* getDepartamentosAction(){
  try{
    const departamentos = yield call (getDepartamentos);
    yield put(Actions.get('REQUEST_DEPARTAMENTOS').fn(departamentos));
  } catch( err ) {
    yield put(Actions.get('REQUEST_DEPARTAMENTOS').fn(err));
  }
}

export function* getDepartamentosPlantillasAction(datos){
  try{
    const plantillas = yield call (getDepartamentosPlantillas, 
      datos.event.idDepartamento);
    yield put(Actions.get('REQUEST_DEPARTAMENTOS_PLANTILLAS').fn(plantillas));
  } catch( err ) {
    yield put(Actions.get('REQUEST_DEPARTAMENTOS_PLANTILLAS').fn(err));
  }
}

export function* getTicketsComentarios(action) {
  
  const {
    idTicket,
  } = action;
  try {
    const {
      status,
      data = [],
      request,
    } = yield call(getTicketsComentariosApi, idTicket);
    if (status === 200) {
      yield put(
        Actions.get('REQ_TICKETS_COMENTARIOS_SUCCESS').fn(data),
      );
    } else {
      yield put(Actions.get('REQ_TICKETS_COMENTARIOS_FAILED').fn(request));
    }
  } catch (error) {
    yield put(Actions.get('REQ_TICKETS_COMENTARIOS_FAILED').fn(error))
  }
}

// export function* postCambiarEstatus(action){
//   const {
//     data: aliasBody,
//     // actionId,
//   } = action;
//   const pestaña = aliasBody.IdEstatus === 3 ? 2 : 1;
//   try {

//     // const {
//     //   IdEstatus,
//     //   IdTicket,
//     // } = aliasBody;
   
    
    
//     const {
//       status,
//       data,
//       // request,
//     } = yield call(postCambiarEstatusApi, aliasBody);
//     if (status === 200) {
//       socket.emit('obtenerTotalesTicketsDifusiones', 29, 27133);
      
//       yield put (
//         Actions.get('GET_TICKETS').fn(pestaña, data)
//       );
//     }
//   } catch (error) {
//     yield put(
//       enqueueSnackbar({
//         message: 'Error Al Cambiar Estatus',
//         options: {
//           variant: 'warning',
//         },
//       })
//     );
//   }
// };

export function* postCambiarEstatus(action){
  
  try {
    const {
      ticketSelected, 
    } = action;

    let{
      tipo,
    } = action
    const pestana = yield select((state) => state
      .getIn(
        ['tableros', 'bandejaTickets', 'tabSelected']
      ));
    const idSolicitante = yield select((state) => state
      .getIn(
        ['tableros', 'bandejaTickets', 'ticketSelected','IdUsuarioEnvia']
      ));
    
    const ticketSeleccionado = yield select((state) => state
      .getIn(
        ['tableros', 'bandejaTickets', 'ticketSelected']
      ).toJS());
    let datos = {
      ticketSelected,
      tipo,
      usuarioAsignado: 0,
    }

    if(tipo === 'Asignar'){
      const usuarioAsignado = yield select((state) => state
        .getIn(
          ['tableros', 'bandejaTickets', 'empleadoAsignado']
        ));
      datos = {
        ticketSelected,
        tipo,
        usuarioAsignado,
      }
    }
    if(tipo === 'IniciarSeguimiento' || tipo === 'Aceptar'){
      const usuarioAsignado = yield select((state) => state
        .getIn(
          ['tableros','numUsuarioLogeado']
        ));
      datos = {
        ticketSelected,
        tipo,
        usuarioAsignado,
      }
    }
    
    const {
      status,
    } = yield call(postCambiarEstatusApi, datos );

    if (status === 200) {
      const usuarioLogeado = yield select((state) => state
        .getIn(
          ['tableros','numUsuarioLogeado']
        ));

      const departamentoLogeado = yield select((state) => state
        .getIn(
          ['tableros','idDepartamentoLogeado']
        ));
      const rolLogeado = yield select((state) => state
        .getIn(
          ['tableros','idRolUsuarioLogeado']
        ));

      const {
        status:statusTicket,
        data:datosTicket,
      } = yield call (getTicketEspecificoApi,  ticketSelected);

      const datosNotificacion = {
        IdUsuarioRecibe: idSolicitante,
        IdDepartamentoRecibe: null,
        IdUsuarioEnvia: usuarioLogeado,
        IdDepartamentoEnvia: departamentoLogeado,
        Notificacion: "",
        Direccion: "/tableros",
        IdPuesto:null,
        ticket:ticketSelected,
      }
      // }
      
      socket.emit('obtenerTotalesTicketsDifusiones', departamentoLogeado, rolLogeado, usuarioLogeado);


      if(ticketSeleccionado.etapas.length >0){
        const etapaSiguiente = ticketSeleccionado.etapas.filter(etapa => etapa.IdEtapa === ticketSeleccionado.EtapaSiguiente)
        if(etapaSiguiente.length>0){
          if(etapaSiguiente[0].IdDependencia === 0 && tipo === 'IniciarSeguimiento'){
            datosNotificacion.Notificacion=`¡Se ha iniciado el seguimiento de tu ticket! Folio ticket: ${ticketSelected} ${ticketSeleccionado.Nombre}`
            socket.emit('nuevaNotificacion',datosNotificacion)
          }
        }
      }
    
      if (ticketSeleccionado.etapas.length === 0){
        if (tipo === 'IniciarSeguimiento'){
          datosNotificacion.Notificacion=`¡Se ha iniciado el seguimiento de tu ticket! Folio ticket: ${ticketSelected} ${ticketSeleccionado.Nombre}`
          socket.emit('nuevaNotificacion',datosNotificacion)
        }
        
        if (tipo === 'Rechazar'){
          datosNotificacion.Notificacion=`¡Tú ticket ha sido rechazado! Folio ticket: ${ticketSelected} ${ticketSeleccionado.Nombre}`
          socket.emit('nuevaNotificacion',datosNotificacion)
        }
        
        if (tipo === 'Asignar'){
          const usuarioAsignado = yield select((state) => state
            .getIn(
              ['tableros', 'bandejaTickets', 'empleadoAsignado']
            ));
          datosNotificacion.IdUsuarioRecibe=usuarioAsignado
          datosNotificacion.Notificacion=`¡Se te ha asignado un ticket! Folio ticket: ${ticketSelected} ${ticketSeleccionado.Nombre}`
          socket.emit('nuevaNotificacion',datosNotificacion)
        }
        if (tipo === 'Cerrar' ) {
          datosNotificacion.Notificacion= `¡Tú ticket ha sido solucionado! Folio ticket: ${ticketSelected} ${ticketSeleccionado.Nombre} `
          socket.emit('nuevaNotificacion',datosNotificacion);
        }
        if (tipo === 'Cancelar' ) {
          datosNotificacion.Notificacion= `¡Tú ticket ha sido cancelado! Folio ticket: ${ticketSelected} ${ticketSeleccionado.Nombre} `
          socket.emit('nuevaNotificacion',datosNotificacion);
        }
      }else{
        if (tipo === 'Aceptar'){
          // recorrer las etapas y la anterior sacar su id (creo)
          let cambiarIndice = true
          let usuarioEtapaAnterior = 0
          ticketSeleccionado.etapas.forEach((etapa) => {
            if (ticketSeleccionado.EtapaSiguiente === etapa.IdEtapa){
              cambiarIndice = false
            }
            if(cambiarIndice && ticketSeleccionado.EtapaSiguiente !== etapa.IdEtapa){
              usuarioEtapaAnterior = etapa.IdUsuario
            }

          })
          datosNotificacion.IdUsuarioRecibe = usuarioEtapaAnterior
          datosNotificacion.Notificacion =`¡Se ha aceptado tu solución! Folio ticket: ${ticketSelected} ${ticketSeleccionado.Nombre}`
          socket.emit('nuevaNotificacion',datosNotificacion)
        }
        if (tipo === 'Regresar'&& statusTicket===200){
          datosNotificacion.IdUsuarioRecibe = datosTicket[0].IdUsuarioAsignado
          datosNotificacion.Notificacion=`¡Tú solución ha sido rechazada! Folio ticket: ${ticketSelected} ${ticketSeleccionado.Nombre}`
          socket.emit('nuevaNotificacion',datosNotificacion)
        }
        if (tipo === 'Cancelar' ) {
          datosNotificacion.Notificacion= `¡Tú ticket ha sido cancelado! Folio ticket: ${ticketSelected} ${ticketSeleccionado.Nombre} `
          socket.emit('nuevaNotificacion',datosNotificacion);
        }
        if (tipo === 'Rechazar'){
          datosNotificacion.Notificacion=`¡Tú ticket ha sido rechazado! Folio ticket: ${ticketSelected} ${ticketSeleccionado.Nombre}`
          socket.emit('nuevaNotificacion',datosNotificacion)
        }
        if (tipo === 'Cerrar' && statusTicket===200 ) {
          if(datosTicket[0].IdEstatus === 4){
            datosNotificacion.Notificacion= `¡Tú ticket ha sido solucionado! Folio ticket ${ticketSelected} ${ticketSeleccionado.Nombre} `
            socket.emit('nuevaNotificacion',datosNotificacion);
          }else{
            datosNotificacion.Notificacion=`¡Se te ha asignado un ticket! Folio ticket: #${ticketSelected} ${ticketSeleccionado.Nombre}`
            if(datosTicket[0].IdRolAsignado){
              datosNotificacion.IdPuesto = datosTicket[0].IdRolAsignado
              socket.emit('nuevaNotificacionPorPuesto',datosNotificacion)
            }else{
              datosNotificacion.IdUsuarioRecibe = datosTicket[0].IdUsuarioAsignado
              socket.emit('nuevaNotificacion',datosNotificacion)
            }
          }

        }
      }
      tipo = pestana === 0 ? 1 : pestana;
      yield put (
        Actions.get('GET_TICKETS').fn(tipo)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error Al Cambiar Estatus',
        options: {
          variant: 'warning',
        },
      })
    );
  }
};

export function* postInsertTicketsComentarios(action){
  const dataBlop = yield select((state) => state
    .getIn(
      ['tableros', 'bandejaTickets', 'ticketsDetails','dataBlop']
    ));
  
  const etapas = yield select((state) => state
    .getIn(
      ['tableros', 'bandejaTickets', 'ticketSelected','etapas']
    ));

  const etapaSiguiente = yield select((state) => state
    .getIn(
      ['tableros', 'bandejaTickets', 'ticketSelected','EtapaSiguiente']
    ));
  let urlss = "";
  let nomArchivo = "";
  let banderaRequerido = true;

  if(etapas && action.from === 'modal'){
    
    const numUsuarioLogeado = yield select((state) => state
      .getIn(
        ['tableros', 'numUsuarioLogeado']
      ));

    const idRolUsuarioLogeado = yield select((state) => state
      .getIn(
        ['tableros', 'idRolUsuarioLogeado']
      ));

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

          const files = conf[q].config.files;
          
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
      type: `${pref}REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION_SUCCESS`,
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

    try {
      if (from === 'modal') {   
        yield put({
          type: `${pref}CAMBIAR_ESTATUS_ACTION`,
          ticketSelected: idTicketSelected2,
          tipo: tipoJustificacion,
        });
      }
      // if(statusTicket === 200) {
      //   datosNotificacion.Notificacion=`Aqui entra con el estatus:  ${ tipoJustificacion } del ticket: ${idTicket}`
      //   socket.emit('nuevaNotificacion',datosNotificacion);
      //   // yield call(getTicketsComentarios, { idTicket });
      // }
  
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

export function* postTicketAction(){
  try{

    const state = yield select();
    const usuarioLogeado = yield select((state2) => state2.getIn(['tableros', 'numUsuarioLogeado']));
    const departamentoLogeado = yield select((state2) => state2.getIn(['tableros', 'idDepartamentoLogeado']));
    const rolLogeado = yield select((state2) => state2.getIn(['tableros', 'idRolUsuarioLogeado']));

    const rutaForma = [
      'tableros', 
      'bandejaTickets', 
      'ticketsDetails', 
      'plantilla', 
      'tipoForma',
    ];
    const datos = assign(
      JSON.parse(
        JSON.stringify(
          state
            .getIn(
              ['tableros', 'bandejaTickets', 'ticketsDetails', 'plantilla']
            )
        )
      ), {'idUsuario' : usuarioLogeado});
    
    let band= false;
    let statusFile = 200;
    const requerido = state.getIn(rutaForma).map((plantilla) => {
      band = false;
      const data = JSON.parse(JSON.stringify(plantilla));
      
      if(data.tipoComponenteId !== 6 && data.config.requerido && 
          (data.config.valor === '' || 
            (Array.isArray(data.config.valor) 
              && data.config.valor.every(valor => valor === '')
            )
            
          )
      ){
        band = true;
      } 
      if(data.config.requerido && data.tipoComponenteId === 6 && (data.config.value === '' || data.config.value === undefined)){
        band = true;
      }
      return band;
    });
    
    if(JSON.parse(JSON.stringify(requerido)).some((data) => data)) {
      
      yield put(
        enqueueSnackbar({
          message: 'Existen datos obligatorios en blanco. Favor de ingresarlos',
          options: {
            variant: 'warning',
          },
        })
      );
      yield put (
        Actions.get('DISABLED_SEND_TICKET').fn(requerido)
      );
    } else {
      let components = yield select((stt) => stt.getIn(rutaForma));
      components = JSON.parse(JSON.stringify(components));
      let componenteFile = components.map((ele, index) => 
        ele.tipoComponenteId === 5 ? index + 1 : null
      )
      
      componenteFile = compact(componenteFile);
      if(componenteFile){
        for (let i = 0; i < componenteFile.length; i+=1) {
          const files = yield select((stt) => stt
            .getIn([
              'tableros', 
              'bandejaTickets', 
              'ticketsDetails',
              'plantilla', 
              'tipoForma', 
              componenteFile[i]-1, 
              'config', 
              'files',
            ])
          );

          if(files){
            const {
              status : statusF,
              data : dataF,
            } = yield call(postUploadFileComentariosApi, files);
            if(statusF === 200){
              for (let j = 0; j < dataF.length; j+=1) {
                datos.tipoForma[componenteFile[i]-1].config.opciones
                  .push({'value' : dataF[j].name, 'url' : dataF[j].url})
              }
            }
            statusFile = statusF;
            datos.tipoForma[componenteFile[i]-1].config.opciones.shift();
          }
        }
      } 
 
      if(statusFile === 200){

        const PlazaUsuario = yield select((state3) => state3.getIn(['tableros','plazaUsuarioLogeado']));
    
        const datosTicket = {
          datos,
          PlazaUsuario,
        }
    
        const {
          status,
          data = [],
        } = yield call (postTicket, datosTicket);
    debugger
        if (status === 200) {
          yield put(
            enqueueSnackbar({
              message: data.message,
              options: {
                variant: 'success',
              }, 
            })
          );
          const datosNotificacion = {
            IdUsuarioRecibe: null,
            IdDepartamentoRecibe: null,
            IdUsuarioEnvia: usuarioLogeado,
            IdDepartamentoEnvia: departamentoLogeado,
            IdPuesto: null,
            Notificacion: `¡Tienes un ticket asignado! Folio ticket:${data.ticket} ${datos.Nombre}`,
            Direccion: "/tableros",
          }

          if(datos.IdRolAsignado){
            // datosNotificacion.Notificacion= `¡Tienes un ticket asignado! Folio ticket:${data.ticket} ${datos.Nombre}`
            datosNotificacion.IdPuesto=datos.IdRolAsignado
            socket.emit('nuevaNotificacionPorPuesto',datosNotificacion);
          }else{
            // datosNotificacion.Notificacion= "¡Tienes un ticket asignado!"
            datosNotificacion.IdUsuarioRecibe=datos.IdPriorizador
            socket.emit('nuevaNotificacion',datosNotificacion);
          }
          // En esta parte se tienen que enviar tambien la notificación
          socket.emit('obtenerTotalesTicketsDifusiones', departamentoLogeado, rolLogeado, usuarioLogeado);
          yield put (
            Actions.get('GET_TICKETS').fn(1)
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
    }
  } catch( err ) {
    yield put(
      enqueueSnackbar({
        message: "Hubo un error al enviar el ticket",
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getTicketsAction(action) {
  let {
    tipo,
  } = action;
  
  
  tipo = tipo.currentTarget ? 1 : tipo;
  
  const usuarioLogeado = yield select((state) => state.getIn(['tableros', 'numUsuarioLogeado']));
  const IdPuesto = yield select((state) => state.getIn(['tableros', 'idRolUsuarioLogeado']));
  
  const datos = {
    IdEmpleado: usuarioLogeado,
    IdPuesto,
    IdTipo: tipo,
  };

  const {
    status,
    data,
  } = yield call (getTickets, datos);
  // const etapasTicket = yield call (obtenerTicketEtapas, data.IdPlantilla);  
  if(status === 200){
    yield put(
      Actions.get('SET_TICKETS').fn(data, tipo - 1, action.ticket)
    );
  } else {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al refrescar la página.',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getObtenerDatosPorAsignar(){
  try {
    const idDepartamentoLogeado = yield select((state) => state.getIn(['tableros', 'idDepartamentoLogeado']));
    const {
      status: statusEmpleados,
      data: dataEmpleados =[],
    } = yield call (getObtejerEmpleadosAsignarApi, idDepartamentoLogeado);
    
    if(statusEmpleados === 200){
      yield put({
        // type: `${actionId}_SUCCESS`,
        type: `APP/CONTAINER/TABLEROS/SET_OBTENER_EMPLEADOS_ASIGNAR_A_SUCCESS_ACTION`,
        dataApi: dataEmpleados,
      });

      try {
        const {
          status: statusPrioridades,
          data: dataPrioridades = [],
        } = yield call (getObtenerPrioridadesAsignarApi);

        if(statusPrioridades === 200){
          yield put({
            // type: `${actionId}_SUCCESS`,
            type: `APP/CONTAINER/TABLEROS/SET_OBTENER_PRIORIDADES_ASIGNAR_A_SUCCESS_ACTION`,
            dataApi: dataPrioridades,
          });
          
        }

      } catch (error) {
        yield put(
          enqueueSnackbar({
            message: 'Error al Obtener Prioridades',
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
        message: 'Error al Obtener Prioridades',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* postAsignarEmpleado(){
  const idTicket = yield select((state) => state
    .getIn(
      ['tableros', 'bandejaTickets', 'idTicketSelected']
    )
  );
  const idEmpleado = yield select((state) => state
    .getIn(
      ['tableros', 'bandejaTickets', 'empleadoAsignado']
    )
  );
  const idPrioridad = yield select((state) => state
    .getIn(
      ['tableros', 'bandejaTickets', 'prioridadAsignada']
    )
  );
  const usuarioLogeado = yield select((state) => state
    .getIn(['tableros', 'numUsuarioLogeado']
    )
  );
  const departamentoLogeado = yield select((state) => state
    .getIn(['tableros', 'idDepartamentoLogeado']
    )
  );
  const rolLogeado = yield select((state) => state
    .getIn(['tableros', 'idRolUsuarioLogeado']
    )
  );

  try {
    const body ={
      idTicket,
      idEmpleado,
      idPrioridad,
    }
    
    // const {
    //   status:statusTicket,
    //   data = [],
    // } = yield call (getTicketEspecificoApi,  idTicket);

    // let datosNotificacion = []

    // if (statusTicket === 200){
    // }
    const {
      status: statusAsignar,
    } = yield call (postAsignarEmpleadoApi,body);

    if (statusAsignar === 200) {
      socket.emit('obtenerTotalesTicketsDifusiones', departamentoLogeado, rolLogeado, usuarioLogeado);

      // datosNotificacion.Notificacion=`¡Tienes un ticket asignado!`
      // setTimeout(socket.emit('nuevaNotificacion',datosNotificacion),1000)

      const bodyEstatus = {
        IdTicket: idTicket,
        IdEstatus: 2,
      };
      
      const {
        status: statusEstatus,
      } = yield call(postCambiarEstatusApi, bodyEstatus)

      if (statusEstatus === 200) {
        const tipo = 3;
        const {
          status: statusTickets,
          data: dataTickets,
        } = yield call (getTickets, tipo, usuarioLogeado);
  
        if (statusTickets === 200) {
          yield put(
            Actions.get('SET_TICKETS').fn(dataTickets, tipo - 1, [])
          );
        }
      }
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Error al Asignar Empleado',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}

export function* downloadTicketFileAction(action) {


  const {
    status,
    data,
  } = yield call (getDownloadedTicketFile, action);

  
  if(status === 200){
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', action.nomArchivo);
    document.body.appendChild(link);
    link.click();
    
    
    yield put(
      enqueueSnackbar({
        message: 'Se ha descargado el archivo correctamente.',
        options: {
          variant: 'success',
        },
      })
    );
  } else {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al descargar el archivo.',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* downloadFileFormData(action) {
  try {

    const {
      file,
    } = action;

    let url = '';

    if(file.url !== undefined){

      const {
        data,
      } = yield call (getDownloadedFile, file.url);
      url = window.URL.createObjectURL(new Blob([data]));
    }else{
      url = window.URL.createObjectURL(new Blob([file]));
    }
    


    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file.url !== undefined ? file.value : file.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    yield put(
      enqueueSnackbar({
        message: 'Se ha descargado el archivo correctamente.',
        options: {
          variant: 'success',
        },
      })
    );
    
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al descargar el archivo',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* deteleFile(action){
  try {
    const{
      indiceEtapa,
      fileIndex,
      indice,
    } = action;

    const files = yield select((state) => state
      .getIn(['tableros', 'bandejaTickets','ticketSelected','etapas',indiceEtapa,'configuracion',indice,'config','files']
      ).toJS()
    );

    files.splice(fileIndex,1);
    
    yield put({
      type:'APP/CONTAINER/TABLEROS/SET_FILES_ACTION', 
      files,
      indiceEtapa,
      fileIndex,
      indice,
    });

  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al borrar el archivo',
        options: {
          variant: 'error',
        },
      })
    );
  }
}
export function* getDifusionesAction(){
  try{
    const datos = {EmpleadoId : 27023,
      DepartamentoId:29}
    const difusiones = yield call (getDifusionesApi,datos);
    yield put({
      type: `${prefDif}GET_DIFUSIONES_SUCCESS`, 
      difusiones,
    });
  } catch( err ) {
    yield put({
      type: (`${prefDif}GET_DIFUSIONES_FAILED`, err),
    })
  }
}

export function* getTicketsPorDepartamentoAction(action) {
  const {
    idDepartamento,
  } = action;
  
  const IdPuesto = yield select((state) => state
    .getIn(
      ['global','currentUser','IdPuesto']
    ));

  const IdEmpleado = yield select((state) => state
    .getIn(
      ['global','currentUser','IdEmpleado']
    ));
  const datos = {
    idDepartamento,
    IdPuesto,
    IdEmpleado,
  }
  const {
    status,
    data,
  } = yield call (getTicketsPorDepartamento, datos);
  
  if(status === 200){
    yield put(
      Actions.get('SET_TICKETS_TABLA').fn(data)
    );
  } else {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cargar los datos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getImagenAvatarAction(action) {
  const {
    idUsuario,
  } = action;
  
  const {
    status,
    data,
  } = yield call (getImagenAvatarApi, idUsuario);
  if(status === 200){
    yield put(
      
      Actions.get('SET_IMAGEN_AVATAR').fn(data)
    );
  }
  //  else {
  //   yield put(
  //     enqueueSnackbar({
  //       message: 'Hubo un error al cargar los datos del AVATAR',
  //       options: {
  //         variant: 'error',
  //       },
  //     })
  //   );
  // }
}
export function* getActualDate() {
  try{

  
    // const fechaServidor = yield call (obtenerFecha);
    

  } catch(err) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cargar los datos',
        
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getTicketByIdAction(action) {
  try{
    const {
      id,
    } = action;
    yield call(getTicketsAction, {tipo: 1, ticket: []});
  
    const {
      status,
      data,
    } = yield call (getTicketsById, id);
  
    if(status === 200){
      yield put(
        Actions.get('SET_TICKET').fn(data),
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al cargar los datos',
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch(err) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cargar los datos',
        options: {
          variant: 'error',
        },
      })
    );
  }
};

export function* getDatosCatalogo (action){
  const {
    datos,
    idxCatalogo,
    cambioA,
    // paraNombre,
    IdCatalogo,
    // para,
  } = action;

  const {
    status,
    data,
  } = yield call(getDatosCatalogoApi, datos);
  
  let indice = -1;

  if(status === 200){

    if(cambioA === 'propio'){

      indice = idxCatalogo;

      yield put({
        type: ('APP/CONTAINER/TABLEROS/SET_ITEMS_CATALOGOS_ACTION'),
        data,
        indice,
        cambioA,
        IdCatalogo,
      },
      );
    }
    
  } else {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cargar los datos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getDatosCatalogo2 (action){
  
  const {
    procedimiento,
    parametros,
    cambioA,
    idxCatalogo,
    IdCatalogo,
    value,
    idxCatalogoPadre,
    from,
    indiceEtapa,
  } = action;

  const datos = {
    procedimiento,
    parametros,
  }

  const {
    status,
    data,
  } = yield call(getDatosCatalogoApi2, datos);

  let indice = -1;
  if(status === 200){

    if(cambioA === 'propio'){

      indice = idxCatalogo;
      
      if(from === 'DPE'){
        yield put({
          type: ('APP/CONTAINER/TABLEROS/SET_ITEMS_CATALOGOS_ACTION'),
          data,
          indice,
          cambioA,
          IdCatalogo,
          idxCatalogo,
          idxCatalogoPadre,
          value,
          indiceEtapa,
          from,
        },
        );
      }else{
        
        yield put({
          type: ('APP/CONTAINER/TABLEROS/SET_ITEMS_CATALOGOS_ACTION'),
          data,
          indice,
          cambioA,
          IdCatalogo,
          idxCatalogoPadre,
          value,
        },
        );
      }


    }
    
  } else {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cargar los datos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getRelacionesAction (action){
  const {
    IdCatalogo,
    idxCatalogo,
  } = action;

  const {
    status,
    data,
  } = yield call(getRelacionesApi, IdCatalogo);
  
  if(status === 200){
    yield put({
      type: ('APP/CONTAINER/TABLEROS/SET_RELACIONES_CATALOGOS_ACTION'),
      data,
      idxCatalogo,
    },
    );
    
  } else {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cargar las relaciones de catalogos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getDatosCatalogoRelacion (action){
  
  const {
    IdCatalogo,
    idxCatalogo,
    value,
    name,
    indiceEtapa,
    from,
  } = action;

  const {
    status,
    data,
  } = yield call(getRelacionesApi, IdCatalogo);

  if(status === 200){
    const procedimiento = data[0].SP
    let parametros = data[0].Parametros
    const cambioA ='propio';
    // const para = data[0].Para;

    const arrParametros = [];
    
    const arrParams = data[0].Parametros
    const arrParametrosJS = JSON.parse(arrParams)
    const jsonDataPar = arrParametrosJS

    for(const i in jsonDataPar){
      arrParametros.push({
        parametro: i,
        valor:jsonDataPar[i],
      })
    }
    let formas = null;

    if(from === 'DPE'){
      formas = yield select((state) => state
        .getIn(['tableros','bandejaTickets','ticketSelected','etapas',indiceEtapa,'configuracion']))
      // .getIn(['tableros','bandejaTickets','ticketSelected','etapas',indiceEtapa,'configuracion',0,0,idxCatalogo,'config','itemsCatalogo']));
    }else{
      formas = yield select((state) => state
        .getIn(
          ['tableros','bandejaTickets','ticketsDetails','plantilla','tipoForma']
        ));
    }
    
    
    const arr = JSON.parse(JSON.stringify(formas))
    let ubicacion = '';

    let bandera = false;
    for(let a=0; a<arrParametros.length;a++){
      
      if(arrParametros[a].parametro === name){
        arrParametros[a].valor = value;
        bandera = true;
      }
      for(let t=0; t < arr.length;t++){
        if(arr[t].tipoComponenteId === 6 && arrParametros[a].parametro === arr[t].config.relaciones[0].Nombre && arrParametros[a].parametro !== name){
          arrParametros[a].valor = arr[t].config.value;
          
        }
      }
      
    }

    let nomPar = '';
    let valPar = '';
    if(bandera){
      const params = {};
      for(let m=0;m<arrParametros.length;m++){
        nomPar = arrParametros[m].parametro;
        valPar = arrParametros[m].valor;
        params[nomPar] = valPar;
      }
      parametros = JSON.stringify(params);
    }
    for(let j=0; j < arr.length; j++){
      if(arr[j].tipoComponenteId === 6){
        if(arr[j].config.relaciones[0].IdCatalogo === IdCatalogo){
          ubicacion = j;
        }
      }
    }
    
    yield put({
      type: ('APP/CONTAINER/TABLEROS/CARGAR_DATOS_CATALOGO2_ACTION'),
      procedimiento,
      parametros,
      cambioA,
      idxCatalogo: ubicacion,
      idxCatalogoPadre: idxCatalogo,
      value,
      indiceEtapa,
      from,
    },
    
    );

  } else {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cargar las relaciones de catalogos',
        options: {
          variant: 'error',
        },
      }))}
}

export function* getTicketEtapas(action) {
  try{
    
    const {
      status,
      data,
    }  = yield call (obtenerTicketEtapas, action.id);

    if(status === 200){
      yield put ({
        type: 'APP/CONTAINER/TABLEROS/SET_ETAPAS', data,
      });

    }

  } catch(err) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cargar los datos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* autorizarTicket (action) {
  try {
    const{
      ticketSelected,
    } = action;

    const datos = {
      ticketSelected,
    }
    const dataTickets = {
      tipo: 1,
    }
    const usuarioLogeado = yield select((state) => state
      .getIn(
        ['tableros','numUsuarioLogeado']
      ));
    const departamentoLogeado = yield select((state) => state
      .getIn(
        ['tableros','idDepartamentoLogeado']
      ));
    const idSolicitante = yield select((state) => state
      .getIn(
        ['tableros', 'bandejaTickets', 'ticketSelected','IdUsuarioEnvia']
      ));
    const datosTicket =yield select((state) => state
      .getIn(
        ['tableros', 'bandejaTickets', 'ticketSelected']
      ).toJS());
    const datosNotificacion = {
      IdUsuarioRecibe: idSolicitante,
      IdDepartamentoRecibe: null,
      IdUsuarioEnvia: usuarioLogeado,
      IdDepartamentoEnvia: departamentoLogeado,
      Notificacion: "",
      IdPuesto:null,
      Direccion:"/tableros",
    }
    const pestaña = yield select((state) => state
      .getIn(['tableros','bandejaTickets','tabSelected']))

    const {
      status,
    }  = yield call (autorizarTicketApi, datos);

    if(status === 200){
      yield put (
        Actions.get('GET_TICKETS').fn(pestaña, dataTickets)
      );

      datosNotificacion.Notificacion=`¡Se ha autorizado un ticket! Folio ticket: #${ticketSelected} ${datosTicket.Nombre}`
      socket.emit('nuevaNotificacion',datosNotificacion)
      const etapaSiguiente = datosTicket.etapas.filter(etapa => etapa.IdEtapa === datosTicket.EtapaSiguiente)
      datosNotificacion.Notificacion=`¡Se te ha asignado un ticket! Folio ticket: #${ticketSelected} ${datosTicket.Nombre}`
      if(etapaSiguiente.length>0){
        if(etapaSiguiente[0].rolUsuarioSelected){
          datosNotificacion.IdPuesto=etapaSiguiente[0].rolUsuarioSelected
          setTimeout(socket.emit('nuevaNotificacionPorPuesto',datosNotificacion),5000)
        }else{
          datosNotificacion.IdUsuarioRecibe=etapaSiguiente[0].IdUsuario
          setTimeout(socket.emit('nuevaNotificacion',datosNotificacion),5000)
        }
      }
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al autorizar ticket',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getTicketEtapasEstatus(action) {
  //
  try{ 
    const {
      status,
      data,
    }  = yield call (obtenerTicketEtapasEstatus, action.id);

    if(status === 200){      
      yield put ({
        type: 'APP/CONTAINER/TABLEROS/SET_ETAPAS_ESTATUS', data,
      });

    }

  } catch(err) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al cargar los datos',
      })
    );
  }
}

  
export function* getPlazasAutorizadas (action) {

  try {
    const {
      Usuario,
    } = action;
  
    const IdTicket = yield select((state) => state
      .getIn(['tableros','bandejaTickets','idTicketSelected']))

    const datos = {
      Usuario,
      IdTicket,
    }
    const {
      status,
      data,
    } = yield call(obtenerPlazasUsuarioApi, datos);

    if(status === 200){
      yield put ({
        type: 'APP/CONTAINER/TABLEROS/SET_PLAZAS_AUTORIZADAS_ACTION',
        data,
      });
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener plazas autorizadas',
        options: {
          variant: 'error',
        },
      })
    );
  }
}



export default function* tablerosSaga() {
  yield [
    takeLatest(
      ACTION('GET_DEPARTAMENTOS'), 
      getDepartamentosAction
    ),
    takeLatest(
      ACTION('HANDLE_CHANGE_DEPARTAMENTO'),
      getDepartamentosPlantillasAction
    ),
    takeLatest(
      ACTION('REQ_TICKETS_COMENTARIOS'),
      getTicketsComentarios
    ),
    takeLatest(
      `${pref}REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION`,
      postInsertTicketsComentarios
    ),
    takeLatest(
      ACTION('HANDLE_SEND_TICKET'),
      postTicketAction
    ),
    takeLatest(
      ACTION('GET_TICKETS'),
      getTicketsAction
    ),
    takeLatest(
      `${pref}CAMBIAR_ESTATUS_ACTION`,
      postCambiarEstatus
    ),
    takeLatest(
      `APP/CONTAINER/TABLEROS/OBTENER_DATO_POR_ASIGNAR_ACTION`,
      getObtenerDatosPorAsignar
    ),
    takeLatest(
      `APP/CONTAINER/TABLEROS/ASIGNAR_TICKET_A_EMPLEADO_ACTION`,
      postAsignarEmpleado
    ),
    takeLatest(
      ACTION('DOWNLOAD_TICKET_FILE'),
      downloadTicketFileAction
    ),
    takeLatest(
      'APP/CONTAINER/TABLEROS/DOWNLOAD_TICKET_FILE_FORMDATA_ACTION',
      downloadFileFormData
    ),
    takeLatest(
      ACTION('GET_TICKETS_POR_DEPARTAMENTO'),
      getTicketsPorDepartamentoAction
    ),
    takeLatest(
      ACTION('GET_TICKET_BY_ID'),
      getTicketByIdAction
    ),
    takeLatest(
      ACTION('GET_DIFUSIONES'),
      getDifusionesAction
    ),
    takeLatest(
      ACTION('GET_IMAGEN_AVATAR'), 
      getImagenAvatarAction
    ),
    takeEvery (
      `APP/CONTAINER/TABLEROS/CARGAR_RELACIONES_ACTION`,
      getRelacionesAction
    ),
    takeEvery (
      'APP/CONTAINER/TABLEROS/CARGAR_DATOS_CATALOGO_ACTION',
      getDatosCatalogo,
    ),
    takeEvery (
      'APP/CONTAINER/TABLEROS/CARGAR_DATOS_CATALOGO2_ACTION',
      getDatosCatalogo2,
    ),
    takeLatest (
      'APP/CONTAINER/TABLEROS/CARGAR_DATOS_CATALOGO_RELACION_ACTION',
      getDatosCatalogoRelacion,
    ),
    takeLatest(
      ACTION('GET_TIME'), 
      getActualDate
    ),
    takeLatest(
      ACTION('GET_ETAPAS'), 
      getTicketEtapas
    ),
    takeLatest(
      'APP/CONTAINER/TABLEROS/AUTORIZAR_TICKET_ACTION', 
      autorizarTicket,
    ),
    takeLatest(
      ACTION('GET_ETAPAS_ESTATUS'), 
      getTicketEtapasEstatus
    ),
    takeLatest(
      'APP/CONTAINER/TABLEROS/OBTENER_PLAZAS_AUTORIZADAS_ACTION', 
      getPlazasAutorizadas,
    ),
    takeLatest(
      'APP/CONTAINER/TABLEROS/DELETE_TICKET_FILE_ACTION', 
      deteleFile,
    ),
  ]
}
