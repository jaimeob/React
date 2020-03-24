/*
 *
 * Roles actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';
// import toSafeInteger from 'lodash/toSafeInteger';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/PUESTOROL/',
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

Actions.name('GET_LISTADO').set(
  type =>
    function getListadoAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('GET_PUESTOS').set(
  type =>
    function getPuestosAction() {
      return {
        type,
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

Actions.name('SET_ROLES').set(
  type =>
    function setRolesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('GET_ROLES').set(
  type =>
    function getRolesAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_CHANGE_PARAMETROS').set(
  type =>
    function onChangeParametros(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);

Actions.name('ON_CHANGE_PUESTO').set(
  type =>
    function onChangePuestoAction(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);

Actions.name('HANDLE_CLICK_LISTA').set(
  type =>
    function handleClickListaAction(id) {
      return {
        type,
        id,
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

Actions.name('HANDLE_CLICK_LISTA_ARCHIVO').set(
  type =>
    function handleClickListaArchivoAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_GUARDAR_CONFIGURACION').set(
  type =>
    function onGuardarConfiguracionAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_CONFIGURACION').set(
  type =>
    function getConfiguracionAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('SET_CONFIGURACION').set(
  type =>
    function setConfiguracionAction(id, datos) {
      return {
        type,
        id,
        datos,
      };
    },
);

Actions.name('ON_CANCELAR_CONFIGURACION').set(
  type =>
    function onCancelarConfiguracionAction(band) {
      return {
        type,
        band,
      };
    },
);

Actions.name('ON_DESCARGAR_FORMATO').set(
  type =>
    function onDescargarFormatoAction() {
      return {
        type,
      };
    },
);

Actions.name('SUBIR_ARCHIVOS').set(
  type =>
    function subirArchivosAction(arreglo, formData, archivos) {
      return {
        type,
        arreglo, 
        formData,
        archivos,
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

Actions.name('ON_CANCELAR_ARCHIVO').set(
  type =>
    function onCancelarArchivoAction(band) {
      return {
        type,
        band,
      };
    },
);

Actions.name('SET_MODULOS').set(
  type =>
    function setModulosAction(id, datos) {
      return {
        type,
        id,
        datos,
      };
    },
);

Actions.name('SET_LISTADO').set(
  type =>
    function setListadoAction(datos, usuario) {
      return {
        type,
        datos,
        usuario,
      };
    },
);

Actions.name('SET_LISTADO_GUARDAR').set(
  type =>
    function setListadoGuardarAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_LISTADO_FILTER').set(
  type =>
    function setListadoFilterAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_SELECTED').set(
  type =>
    function setSelectedAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_OPEN_SEARCH').set(
  type =>
    function setOpenSearchAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_SEARCH_TEXT').set(
  type =>
    function setSearchTextAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_OPEN_FILTER').set(
  type =>
    function setOpenFilterAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_OPEN_MENU_CONTEXTUAL').set(
  type =>
    function setOpenMenuContextualAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_OPEN_MODAL').set(
  type =>
    function setOpenModalAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ORDER').set(
  type =>
    function setOrderAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ORDER_BY').set(
  type =>
    function setOrderByAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_PAGE').set(
  type =>
    function setPageAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ROWS_PER_PAGE').set(
  type =>
    function setRowsPerPageAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_STEPPER').set(
  type =>
    function setStepperAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_LISTADO_ACTIVAR').set(
  type =>
    function setListadoActivarAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_LISTADO_DESACTIVAR').set(
  type =>
    function setListadoDesactivarAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ACTIVAR_REGISTROS').set(
  type =>
    function setActivarRegistrosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('GET_DOWNLOAD_FILE').set(
  type =>
    function getDownloadFileAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('GET_DOWNLOAD_FILES').set(
  type =>
    function getDownloadFilesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_LOADING').set(
  type =>
    function setLoadingAction(datos) {
      return {
        type,
        datos,
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

Actions.name('SET_MOUNTED').set(
  type =>
    function setMountedAction() {
      return {
        type,
      };
    },
);

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

export default Actions;