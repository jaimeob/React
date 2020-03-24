/*
 *
 * Pedidos actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';
import toSafeInteger from 'lodash/toSafeInteger';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/PEDIDOS/',
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

Actions.name('GET_PEDIDOS').set(
  type =>
    function getPedidosAction() {
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

Actions.name('GET_ESTATUS').set(
  type =>
    function getEstatusAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_PEDIDO_DETALLE').set(
  type =>
    function getPedidoDetalleAction(idPedido) {
      return {
        type,
        idPedido,
      };
    },
);


Actions.name('SET_PLAZAS').set(
  type =>
    function setPlazasAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_PEDIDOS').set(
  type =>
    function getPedidosAction(datos, idPlaza) {
      return {
        type,
        datos,
        idPlaza,
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

Actions.name('CAMBIAR_PLAZA').set(
  type =>
    function cambiarPlazaAction() {
      return {
        type,
      };
    },
);


Actions.name('SET_ESTATUS').set(
  type =>
    function setEstatusAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_PEDIDO_DETALLE').set(
  type =>
    function setPedidoDetalleAction(datos, indice = 1) {
      return {
        type,
        datos,
        indice,
      };
    },
);

Actions.name('SET_UPLOAD_FILE').set(
  type =>
    function setUploadFile(datos, arreglo, id, file) {
      return {
        type,
        datos,
        arreglo,
        id,
        file,
      };
    },
);

Actions.name('ON_FECHA_INPUT').set(
  type =>
    function onFechaInputAction(id, event) {
      return {
        type,
        id,
        event,
      };
    },
);

Actions.name('ON_CLICK_SIGUIENTE').set(
  type =>
    function onClickSiguienteAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_INPUT_AUTORIZACION').set(
  type =>
    function onInputAutorizacionAction(id, cadena) {
      return {
        type,
        id,
        cadena,
      };
    },
);

Actions.name('ON_CLICK_MODAL').set(
  type =>
    function onClickModalAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_INPUT_COMENTARIOS').set(
  type =>
    function onInputComentariosAction(id, cadena) {
      return {
        type,
        id,
        cadena,
      };
    },
);

Actions.name('ON_INPUT_GUIA').set(
  type =>
    function onInputGuiaAction(id, cadena) {
      return {
        type,
        id,
        cadena,
      };
    },
);

Actions.name('ON_INPUT_PAQUETERIA').set(
  type =>
    function onInputPaqueteriaAction(id, cadena) {
      return {
        type,
        id,
        cadena,
      };
    },
);

Actions.name('ON_INPUT_IMPORTE').set(
  type =>
    function onInputImporteAction(id, cadena) {
      return {
        type,
        id,
        cadena,
      };
    },
);

Actions.name('ON_INPUT_COM_RECEPCION').set(
  type =>
    function onInputComRecepcionAction(id, cadena) {
      return {
        type,
        id,
        cadena,
      };
    },
);

Actions.name('ON_RECIBIR').set(
  type =>
    function onRecibirAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_INPUT_RECIBIDO').set(
  type =>
    function onInputRecibidoAction(id, cadena) {
      return {
        type,
        id,
        cadena,
      };
    },
);

Actions.name('ON_UPLOAD_FILE').set(
  type =>
    function onUploadFileAction(id, formData, arreglo, file, band) {
      return {
        type,
        id,
        formData,
        arreglo,
        file,
        band,
      };
    },
);

Actions.name('ON_UPLOAD_RECEPCION').set(
  type =>
    function onUploadRecepcionAction(id, formData, arreglo, file) {
      return {
        type,
        id,
        formData,
        arreglo,
        file,
      };
    },
);

Actions.name('ON_UPLOAD_COTIZACION').set(
  type =>
    function onUploadCotizacionAction(formData, arreglo) {
      return {
        type,
        formData,
        arreglo,
      };
    },
);

Actions.name('ON_DELETE_FILE').set(
  type =>
    function onDeleteFileAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_DELETE_COTIZACION_FILE').set(
  type =>
    function onDeleteCotizacionFileAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_DELETE_RECEPCION_FILE').set(
  type =>
    function onDeleteRecepcionFileAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_INPUT_COMENTARIOS_GENERAL').set(
  type =>
    function onInputComentariosGeneralAction(cadena) {
      return {
        type,
        cadena,
      };
    },
);

Actions.name('CHANGE_FECHA_AUTORIZACION').set(
  type =>
    function changeFechaAutorizacionAction(fechaIni, fechaFin) {
      return {
        type,
        fechaIni,
        fechaFin,
      };
    },
);

Actions.name('CHANGE_FECHA_INICIO').set(
  type =>
    function changeFechaInicioAction(fechaIni, fechaFin) {
      return {
        type,
        fechaIni,
        fechaFin,
      };
    },
);


Actions.name('CHANGE_PLAZA').set(
  type =>
    function changePlazaAction(event) {
      return {
        type,
        plaza: {
          id: toSafeInteger(event.target.value),
          nombre: event.currentTarget.textContent,
        },
      };
    },
);

Actions.name('CHANGE_ESTATUS').set(
  type =>
    function changeEstatusAction(event) {
      return {
        type,
        estatus: {
          id: toSafeInteger(event.target.value),
          nombre: event.currentTarget.textContent,
        },
      };
    },
);

Actions.name('AGREGAR_PEDIDO').set(
  type =>
    function agregarPedidoAction() {
      return {
        type,
      };
    },
);

Actions.name('AUTORIZAR_PEDIDO').set(
  type =>
    function autorizarPedidoAction() {
      return {
        type,
      };
    },
);

Actions.name('OBTENER_COTIZACION').set(
  type =>
    function obtenerCotizacionAction(id) {
      return {
        type,
        id,
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


Actions.name('RECIBIR_PEDIDO').set(
  type =>
    function recibirPedidoAction() {
      return {
        type,
      };
    },
);

Actions.name('AUTORIZAR_MULTIPLE').set(
  type =>
    function autorizarMultipleAction(ids) {
      return {
        type,
        ids,
      };
    },
);

Actions.name('DOWNLOAD_FILE').set(
  type =>
    function downloadFileAction(url, name, id) {
      return {
        type,
        url,
        name,
        id,
      };
    },
);

Actions.name('DOWNLOAD_FILE_RECEPCION').set(
  type =>
    function downloadFileRecepcionAction(url, name, id) {
      return {
        type,
        url,
        name,
        id,
      };
    },
);

Actions.name('DOWNLOAD_COTIZACION').set(
  type =>
    function downloadCotizacionAction(url, name, id) {
      return {
        type,
        url,
        name,
        id,
      };
    },
);

Actions.name('LIMPIAR_FILTROS').set(
  type =>
    function limpiarFiltrosAction() {
      return {
        type,
      };
    },
);

Actions.name('DESACTIVAR_GUARDAR').set(
  type =>
    function desactivarGuardarAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('DELETE_FILE_STATE').set(
  type =>
    function deleteFileState(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('CHANGE_PAGINA').set(
  type =>
    function changePaginaAction(indice) {
      return {
        type,
        indice,
      };
    },
);

Actions.name('SET_TABLA_MOUNTED').set(
  type =>
    function setTablaMountedAction() {
      return {
        type,
      };
    },
);


export default Actions;
