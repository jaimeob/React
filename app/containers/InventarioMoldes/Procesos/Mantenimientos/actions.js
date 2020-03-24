/*
 *
 * Mantenimientos actions
 *
 */

/*
 *
 * Reportes actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/INVENTARIOMOLDES/PROCESOS/MANTENIMIENTOS/',
  subfix: '_ACTION',
});


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

Actions.name('GET_MANTENIMIENTOS').set(
  type =>
    function getMantenimientosAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_DATOS_MANTENIMIENTOS').set(
  type =>
    function setDatosMantenimientosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_USUARIO').set(
  type =>
    function setUsuarioAction(usuarioId) {
      return {
        type,
        usuarioId,
      };
    },
);
Actions.name('LIMPIAR_STATE').set(
  type =>
    function limpiarStateAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_ROW_SELECCIONADO').set(
  type =>
    function setRowSeleccionadoAction(idMolde,idInventario,idPlanta) {
      return {
        type,
        idMolde,
        idInventario,
        idPlanta,
      };
    },
);
Actions.name('SET_DATOS_DETALLE').set(
  type =>
    function setDatosDetalleAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_SELECCIONADO').set(
  type =>
    function setSeleccionadoAction(rowSeleccionado) {
      return {
        type,
        rowSeleccionado,
      };
    },
);



export default Actions;
