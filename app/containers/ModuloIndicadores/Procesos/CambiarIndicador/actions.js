/*
 *
 * Indicador actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/PROCESOCAMBIARINDICADOR/',
  subfix: '_ACTION',
});

Actions.name('QUITA_IMAGEN_ESTATUS').set(
  type =>
    function quitaImagenEstatusAction() {
      return {
        type,
      };
    },
);

Actions.name('SUBIR_ARCHIVOS_TEMP').set(
  type =>
    function subirArchivosTempAction(archivos, archivosTemp) {
      return {
        type,
        archivos,
        archivosTemp,
      };
    },
);

Actions.name('PONE_IMAGEN_ESTATUS').set(
  type =>
    function poneImagenEstatusAction(event) {
      return {
        type,
        event: event.currentTarget,
      };
    },
);

Actions.name('ABRIR_MODAL').set(
  type =>
    function abrirModalAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ABRIR_MODAL_GUARDAR').set(
  type =>
    function abrirModalGuardarAction() {
      return {
        type,
      };
    },
);

Actions.name('DESACTIVAR_ACEPTAR').set(
  type =>
    function desactivarAceptarAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_INDICADORES').set(
  type =>
    function getIndicadoresAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_DEPARTAMENTOS').set(
  type =>
    function getDepartamentosAction() {
      return {
        type,
      };
    },
)

Actions.name('SET_INDICADORES').set(
  type =>
    function setIndicadoresAction(datos) {
      return {
        type,
        datos,
      };
    },
);


Actions.name('SET_DEPARTAMENTOS').set(
  type =>
    function setDepartamentosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_PUESTOS').set(
  type =>
    function setPuestosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_EMPLEADOS').set(
  type =>
    function setEmpleadosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('ON_CHANGE_RESULTADO').set(
  type =>
    function onChangeResultadoAction(opcion, id, valor) {
      return {
        type,
        opcion,
        id,
        valor,
      };
    },
);

Actions.name('ON_CHANGE_COMBO').set(
  type =>
    function onChangeComboAction(id, valor) {
      return {
        type,
        id,
        valor,
      };
    },
);

Actions.name('ON_CHANGE_DEPARTAMENTO').set(
  type =>
    function onChangeDepartamentoAction(idDepartamento) {
      return {
        type,
        idDepartamento,
      };
    },
);

Actions.name('ON_CHANGE_PUESTO').set(
  type =>
    function onChangePuestoAction(idPuesto) {
      return {
        type,
        idPuesto,
      };
    },
);


Actions.name('ON_CLICK_CERRAR_VENTANA').set(
  type =>
    function onClickCerrarVentanaAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_CLICK_ACEPTAR_VENTANA').set(
  type =>
    function onClickAceptarVentanaAction() {
      return {
        type,
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

Actions.name('MODAL_CERRAR').set(
  type =>
    function modalCerrarAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_ELIMINAR_ARCHIVO').set(
  type =>
    function onEliminarArchivoAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_DESCARGAR_ARCHIVO').set(
  type =>
    function onDescargarArchivoAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('OBTENER_ARCHIVOS').set(
  type =>
    function obtenerArchivosAction(id) {
      return {
        type,
        id,
      };
    },
);

export default Actions;
