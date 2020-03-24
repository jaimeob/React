/*
 *
 * Pedidos actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/USUARIOSALMACENES/',
  subfix: '_ACTION',
});

Actions.name('DEFAULT').set(
  type =>
    function defaultAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_PLAZAS').set(
  type =>
    function getPlazasAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_PLAZAS').set(
  type =>
    function setPlazasAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('GET_ALMACENES').set(
  type =>
    function getAlmacenesAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_ALMACENES').set(
  type =>
    function setAlmacenesAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('GET_ALMACENES_PLAZAS').set(
  type =>
    function getAlmacenesPlazasAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_ALMACENES_PLAZAS').set(
  type =>
    function setAlmacenesPlazasAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('GET_USUARIOS').set(
  type =>
    function getUsuariosAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_USUARIOS').set(
  type =>
    function setUsuariosAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('ON_INPUT_CHANGE').set(
  type =>
    function onInputChangeAction(campo, e, tipo) {
      let valor =''
      if (campo === 2 ){
        valor = e;
      }else{
        valor = e.target.value;
      }
      
      return {
        type,
        campo,
        valor,
        tipo,
      };
    },
);

Actions.name('POST_AP').set(
  type =>
    function postApAction(tipo) {
      return {
        type,
        tipo,
      };
    },
);

Actions.name('GET_DETALLE_AP').set(
  type =>
    function getDetalleApAction(idRegistro) {
      return {
        type,
        idRegistro,
      };
    },
);

Actions.name('UPDATE_AP').set(
  type =>
    function updateApAction() {
      return {
        type,
      };
    },
);

Actions.name('LIMPIAR_AP').set(
  type =>
    function limpiarApAction() {
      return {
        type,
      };
    },
);

Actions.name('ELIMINAR_AP').set(
  type =>
    function eliminarApAction() {
      return {
        type,
      };
    },
);

Actions.name('OPEN_MODAL').set(
  type =>
    function openModalAction(data, stepper) {
      return {
        type,
        data,
        stepper,
      };
    },
);

Actions.name('CLOSE_MODAL').set(
  type =>
    function closeModalAction() {
      return {
        type,
      };
    },
);


Actions.name('POST_AU').set(
  type =>
    function postAuAction(tipo) {
      return {
        type,
        tipo,
      };
    },
);

Actions.name('GET_DETALLE_AU').set(
  type =>
    function getDetalleAuAction(idRegistro) {
      return {
        type,
        idRegistro,
      };
    },
);

Actions.name('UPDATE_AU').set(
  type =>
    function updateAuAction() {
      return {
        type,
      };
    },
);

Actions.name('LIMPIAR_AU').set(
  type =>
    function limpiarAuAction() {
      return {
        type,
      };
    },
);

Actions.name('ELIMINAR_AU').set(
  type =>
    function eliminarAuAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_USUARIOS_ALMACENES').set(
  type =>
    function getUsuariosAlmacenesAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_USUARIOS_ALMACENES').set(
  type =>
    function setUsuariosAlmacenesAction(data) {
      return {
        type,
        data,
      };
    },
);
export default Actions;
