/*
 *
 * Notificaciones actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';
// import _ from 'lodash';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/NOTIFICACIONES/',
  subfix: '_ACTION',
});

Actions.name('SET_IMPRIME_NOTIFICACIONES').set(
  type =>
    function setImprimeNotificaciones(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('SET_USUARIO').set(
  type =>
    function setUsuarioAction(usuarioId,departamentoId) {
      return {
        type,
        usuarioId,
        departamentoId,
      };
    },
);

Actions.name('OBTENER_NOTIFICACIONES').set(
  type =>
    function obtenerNotificacionesAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('CAMBIAR_ANIMACION_NOTIFICACION').set(
  type =>
    function cambiarAnimacionNotificacion(estatus) {
      return {
        type,
        estatus,
      };
    },
);

Actions.name('CAMBIAR_ESTATUS_NOTIFICACION').set(
  type =>
    function cambiarEstatusNotificaciones(idUsuario,idDepartamento) {
      return {
        type,
        idUsuario,
        idDepartamento,
      };
    },
);

Actions.name('LIMIPAR_NOTIFICACIONES').set(
  type =>
    function limpiarNotificaciones() {
      return {
        type,
      };
    },
);

// import {
//   MARK_NOTIFICATIONS_READ
// } from './types';
// import axios from 'axios';

// export const markNotificationsRead = (notificationIds) => (dispatch) => {
//   axios
//     .post('/notifications', notificationIds)
//     .then((res) => {
//       dispatch({
//         type: MARK_NOTIFICATIONS_READ
//       });
//     })
//     .catch((err) => console.log(err));
// };
export default Actions; 