/*
 *
 * Tableros reducer
 *
 */

// import { stat } from 'fs';
import { fromJS } from 'immutable';
import { orderBy} from 'lodash';
import Actions from './actions';
import STATE from './state';
// import { log } from 'util';

const ACTION = (name = '') => Actions.get(name).id;

export const initialState = fromJS(STATE);

export const {
  DEFAULT,
  SET_IMPRIME_NOTIFICACIONES,
  OBTENER_NOTIFICACIONES,
  CAMBIAR_ANIMACION_NOTIFICACION,
  LIMIPAR_NOTIFICACIONES,
} = Actions.getConstants();

function notificacionesReducer(state = initialState, action) {
  
  switch (action.type) {
    // case DEFAULT: {
    //   return initialState;
    // }

    // case 'APP/CONTAINER/NOTIFICACIONES/SET_IMPRIME_NOTIFICACIONES': {
    //   // return state.updateIn(['notificaciones'],(notificaciones) => notificaciones.merge({
    //   //   notificaciones : action.notificaciones.data,
       
    //   // }));
    //   return state.setIn(['notificaciones' ], action.notificaciones.data);

    //   // const updatedBandeja = state
    //   //   .updateIn(['bandejaTickets', 'ticketsDetails'], (detail) => 
    //   //     detail.merge(
    //   //       fromJS({
    //   //         chatMounted: true,
    //   //         mensajes: isArray(data) ? data.slice() : data,
    //   //       })
    //   //     )
    //   //   );
    //   // return updatedBandeja;
    // }
    case ACTION('CAMBIAR_ANIMACION_NOTIFICACION'): {
      return state.setIn(['animarNotificacion' ], action.estatus);
    }
    case ACTION('SET_USUARIO'): {
      return state.setIn(['numUsuarioLogeado' ], action.usuarioId)
        .setIn(['idDepartamentoLogeado' ],action.departamentoId);
    }

    case ACTION('OBTENER_NOTIFICACIONES'): {
      const notificacionesArray = state.getIn(['notificaciones']);
      const notificaciones = JSON.parse(JSON.stringify(notificacionesArray)); 
      const usuarioLogeado = state.getIn(['numUsuarioLogeado']);
      const idDepartamentoLogeado = state.getIn(['idDepartamentoLogeado']);
      let agregarNotificacion = false;

      // Falta probar mas casos
      // console.log("Que datos trae aqui",action.data)
      if (action.data.length>0){
        if (notificaciones.length>0){
          action.data.forEach((not) => {
            agregarNotificacion = true
            notificaciones.forEach((notActual,index) => {    
              if(not.IdUsuarioRecibe === usuarioLogeado && not.IdDepartamentoRecibe && notActual.NotificacionId === not.NotificacionId){
                agregarNotificacion=false
                notificaciones[index]=not
              }
            })
            if (agregarNotificacion && not.IdUsuarioRecibe === usuarioLogeado && not.IdDepartamentoRecibe === idDepartamentoLogeado) {
              notificaciones.push(not)
            }
          })
        }else{
          action.data.forEach((not) => {
            if(not.IdUsuarioRecibe === usuarioLogeado && not.IdDepartamentoRecibe === idDepartamentoLogeado){
              notificaciones.push(not)
            }
          })
        }
        // }else{
        //   notificaciones = action.data
        //   notificaciones.forEach((not,index) => {
        //     if(not.IdUsuarioRecibe !== usuarioLogeado || not.IdDepartamentoRecibe !== idDepartamentoLogeado ){
        //       notificaciones.splice(index,1)
        //     }
        //   });
        // }
      }

      // console.log("Como quedan las notificaciones",notificaciones)

      return state.setIn(['notificaciones'], fromJS(orderBy(notificaciones, ['Fecha'], ['desc'])));
      
    }
    
    case ACTION('CAMBIAR_ESTATUS_NOTIFICACION'): {
      return state
    }
    // case CERRAR_MODAL : {
    //   return state.set('modal', !state.get('modal'))
    // }
    case LIMIPAR_NOTIFICACIONES: {
      return state.setIn(['notificaciones'], fromJS([]))
    }
    default:
      return state;
  }

  
}

export default notificacionesReducer;






// import {
//   MARK_NOTIFICATIONS_READ
// } from './types';

// const initialState = {
//   authenticated: false,
//   loading: false,
//   credentials: {},
//   likes: [],
//   notifications: []
// };

// export default function(state = initialState, action) {
//   switch (action.type) {
//     case MARK_NOTIFICATIONS_READ:
//       state.notifications.forEach((not) => (not.read = true));
//       return {
//         ...state
//       };
//     default:
//       return state;
//   }
// }
