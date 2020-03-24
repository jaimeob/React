/*
 *
 * Transformacion actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/PRESTAMO/',
  subfix: '_ACTION',
});

Actions.name('OBTENER_PERMISOS').set(
  type =>
    function obtenerPermisos() {
      return {
        type,
      };
    },
);

Actions.name('SET_PERMISOS').set(
  type =>
    function setPermisos(payload) {
      return {
        type,
        payload,
      };
    },
);

Actions.name('DEFAULT').set(
  type =>
    function defaultAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_DATOS_GENERALES').set(
  type =>
    function getDatosGeneralesAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_PRESTAMO_DETALLE').set(
  type =>
    function getPrestamoDetalleAction(idPrestamo) {
      return {
        type,
        idPrestamo,
      };
    },
);

Actions.name('SET_PRESTAMO_DETALLE').set(
  type =>
    function setPrestamoDetalleAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('SET_DATOS_GENERALES').set(
  type =>
    function setDatosGeneralesAction(datos) {
      return {
        type,
        datos,
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

Actions.name('NUEVO_PRESTAMO').set(
  type =>
    function nuevoPrestamoAction() {
      return {
        type,
      };
    },
);

Actions.name('AGREGAR_PRESTAMO').set(
  type =>
    function agregarPrestamoAction() {
      return {
        type,
      };
    },
);

Actions.name('REGRESAR').set(
  type =>
    function regresarAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_INPUT_CHANGE').set(
  type =>
    function onInputChangeAction(campo, e, tipo) {
      const valor = e.target.value;
      return {
        type,
        campo,
        valor,
        tipo,
      };
    },
);

Actions.name('POST_PRESTAMO').set(
  type =>
    function postPrestamoAction() {
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

Actions.name('SET_SNACKBAR').set(
  type =>
    function setSnackbarAction(snack) {
      return {
        type,
        snack,
      };
    },
);

Actions.name('CLEAR_SNACKBAR').set(
  type =>
    function clearSnackbarAction(snack) {
      return {
        type,
        snack,
      };
    },
);

Actions.name('REMOVE_ROW').set(
  type =>
    function removeRowAction(row) {
      return {
        type,
        row,
      };
    },
);

Actions.name('POST_PRESTAMOS').set(
  type =>
    function postPrestamosAction() {
      return {
        type,
      };
    },
);

Actions.name('EDITAR_PRESTAMO').set(
  type =>
    function editarPrestamoAction(idxRegistro) {
      return {
        type,
        idxRegistro,
      };
    },
);

Actions.name('EDIT_ROW').set(
  type =>
    function editRowAction(row) {
      return {
        type,
        row,
      };
    },
);

Actions.name('DEVOLVER_PRESTAMO').set(
  type =>
    function devolverPrestamoAction(idPrestamoDetalle) {
      return {
        type,
        idPrestamoDetalle,
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

export default Actions;