/*
 *
 * Transformacion actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/ASIGNACIONENCUESTAS/',
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

Actions.name('GET_DATOS_GENERALES').set(
  type =>
    function getDatosGenaralesAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_DATOS_GENERALES').set(
  type =>
    function setDatosGenaralesAction(datosGenerales) {
      return {
        type,
        datosGenerales,
      };
    },
);

Actions.name('ON_CHANGE_COMBO').set(
  type =>
    function onChangeComboAction(index, seleccionado) {
      return {
        type,
        index,
        seleccionado,
      };
    },
);

Actions.name('CHECK_USER').set(
  type =>
    function checkUserAction(IdAsignacion, bandera) {
      return {
        type,
        IdAsignacion,
        bandera,
      };
    },
);

Actions.name('ON_CHANGE_COMBO_USUARIO').set(
  type =>
    function onChangeComboUsuarioAction(index, seleccionado) {
      return {
        type,
        index,
        seleccionado,
      };
    },
);

Actions.name('ON_CHANGE_PUESTOS_USUARIO').set(
  type =>
    function onChangePuestosUsuarioAction(index, seleccionado) {
      return {
        type,
        index,
        seleccionado,
      };
    },
);

Actions.name('ON_CHANGE_PUESTOS').set(
  type =>
    function onChangePuestosAction(index, seleccionado) {
      return {
        type,
        index,
        seleccionado,
      };
    },
);

Actions.name('ON_CHANGE_DEPARTAMENTOS_USUARIO').set(
  type =>
    function onChangeDepartamentosUsuarioAction(index, seleccionado) {
      return {
        type,
        index,
        seleccionado,
      };
    },
);


Actions.name('ON_CHANGE_DEPARTAMENTOS').set(
  type =>
    function onChangeDepartamentosAction(index, seleccionado) {
      return {
        type,
        index,
        seleccionado,
      };
    },
);

Actions.name('GET_ASIGNACION_DETALLE').set(
  type =>
    function getAsignacionDetalleAction(idAsignacion) {
      return {
        type,
        idAsignacion,
      };
    },
);

Actions.name('SET_ASIGNACION_DETALLE').set(
  type =>
    function setAsignacionDetalleAction(idAsignacion, data) {
      return {
        type,
        idAsignacion,
        data,
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

Actions.name('REGRESAR_NUEVO').set(
  type =>
    function regresarNuevoAction() {
      return {
        type,
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

Actions.name('NUEVA_ASIGNACION').set(
  type =>
    function nuevaAsignacionAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_INPUT_CHANGE').set(
  type =>
    function onInputChangeAction(campo, e) {
      let valor
      if(campo === 2 || campo === 3 || campo === 4 || campo === 7)
        valor = e;
      else
        valor = e.target.value;
        
      return {
        type,
        campo,
        valor,
      };
    },
);

Actions.name('ON_INPUT_CHANGE_USUARIO').set(
  type =>
    function onInputChangeUsuarioAction(campo, valor) {
      return {
        type,
        campo,
        valor,
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

Actions.name('ASIGNAR_USUARIOS').set(
  type =>
    function asignarUsuariosAction(idAsignacion) {
      return {
        type,
        idAsignacion,
      };
    },
);

Actions.name('AGREGAR_REGISTRO').set(
  type =>
    function agregarRegistroAction() {
      return {
        type,
      };
    },
);

Actions.name('AGREGAR_REGISTRO_USUARIO').set(
  type =>
    function agregarRegistroUsuarioAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_USUARIOS_SELECCIONADOS').set(
  type =>
    function setUsuariosSeleccionadosAction(seleccionados) {
      return {
        type,
        seleccionados,
      };
    },
);

Actions.name('SET_USUARIOS_SELECCIONADOS_USUARIOS').set(
  type =>
    function setUsuariosSeleccionadosUsuariosAction(seleccionados) {
      return {
        type,
        seleccionados,
      };
    },
);

Actions.name('POST_ASIGNACION').set(
  type =>
    function postAsignacionAction() {
      return {
        type,
      };
    },
);

Actions.name('UPDATE_ASIGNACION').set(
  type =>
    function updateAsignacionAction() {
      return {
        type,
      };
    },
);

Actions.name('REMOVE_ROW').set(
  type =>
    function removeRowAction(row, data, bandera) {
      return {
        type,
        row,
        data,
        bandera,
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

Actions.name('REMOVE_ROW_USUARIOS').set(
  type =>
    function removeRowUsuariosAction(row) {
      return {
        type,
        row,
      };
    },
);

Actions.name('SHOW_COLLAPSE').set(
  type =>
    function showCollapseAction() {
      return {
        type,
      };
    },
);

export default Actions;