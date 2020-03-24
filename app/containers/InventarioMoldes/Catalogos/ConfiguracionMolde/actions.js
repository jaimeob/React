/*
 *
 * ConfiguracionMolde actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/INVENTARIOMOLDES/CATALOGOS/CONFIGURACIONMOLDE/',
  subfix: '_ACTION',
});

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

Actions.name('GUARDAR_MOLDE').set(
  type =>
    function guardarMoldeAction() {
      return {
        type,
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

Actions.name('DESACTIVAR_GUARDAR_MOLDE').set(
  type =>
    function desactivarGuardarMolde() {
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

Actions.name('ON_INPUT_CHANGE').set(
  type =>
    function onInputChangeAction(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);

Actions.name('ON_INPUT_CHANGE_SECCION').set(
  type =>
    function onInputChangeSeccionAction(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);

Actions.name('ON_INPUT_CHANGE_ACCESORIO').set(
  type =>
    function onInputChangeAccesorioAction(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);

Actions.name('ON_INPUT_CHANGE_PIEZA').set(
  type =>
    function onInputChangePiezaAction(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);

Actions.name('UPLOAD_PLANO').set(
  type =>
    function uploadPlanoAction(file, formData) {
      return {
        type,
        file,
        formData,
      };
    },
);

Actions.name('SET_ARCHIVOS_GUARDADOS').set(
  type =>
    function setArchivosGuardados(archivos) {
      return {
        type,
        archivos,
      };
    },
);

Actions.name('HANDLE_CHANGE_ARCHIVO').set(
  type =>
    function handleChangeArchivoAction(file, formData) {
      return {
        type,
        file,
        formData,
      };
    },
);

Actions.name('HANDLE_CHANGE_ARCHIVO_PLANO').set(
  type =>
    function handleChangeArchivoPlanoAction(file, formData,indice) {
      return {
        type,
        file,
        formData,
        indice,
      };
    },
);
 
Actions.name('HANDLE_DELETE_ARCHIVO_PLANO').set(
  type =>
    function handleDeleteArchivoPlanoAction(tipoInsumo,indice) {
      return {
        type,
        tipoInsumo,
        indice,
      };
    },
);

Actions.name('HANDLE_DOWNLOAD_ARCHIVO_PLANO').set(
  type =>
    function handleDownloadArchivoPlanoAction(tipoInsumo,indice) {
      return {
        type,
        tipoInsumo,
        indice,
      };
    },
);

Actions.name('HANDLE_CHANGE_ARCHIVO_EDITAR').set(
  type =>
    function handleChangeArchivoEditarAction(file, formData) {
      return {
        type,
        file,
        formData,
      };
    },
);

Actions.name('GET_COMBOS').set(
  type =>
    function getCombosAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_MOLDES').set(
  type =>
    function getMoldesAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_MOLDES').set(
  type =>
    function setMoldesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_COMBOS').set(
  type =>
    function setCombosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('ON_CLICK_DETALLE').set(
  type =>
    function onClickDetalleAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_CLICK_AGREGAR').set(
  type =>
    function onClickAgregarAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_CLICK_AGREGAR_MOLDE').set(
  type =>
    function onClickAgregarMoldeAction(cancelar = false) {
      return {
        type,
        cancelar,
      };
    },
);

Actions.name('ON_CLICK_AGREGAR_ACCESORIO').set(
  type =>
    function onClickAgregarAccesorioAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_CLICK_AGREGAR_PIEZA').set(
  type =>
    function onClickAgregarPiezaAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_CLICK_GUARDAR_ACCESORIO').set(
  type =>
    function onClickGuardarAccesorioAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_CLICK_GUARDAR_PIEZA').set(
  type =>
    function onClickGuardarPiezaAction() {
      return {
        type,
      };
    },
);
Actions.name('ON_ACTIVAR_MODAL_AVISO').set(
  type =>
    function onActivarModalAvisoAction(bandera,datos) {
      return {
        type,
        bandera,
        datos,
      };
    },
);


Actions.name('DESACTIVAR_GUARDAR_PIEZA').set(
  type =>
    function desactivarGuardarPieza(){
      return {
        type,
      };
    },
)

Actions.name('ON_CLICK_GUARDAR_PIEZA_VALIDADA').set(
  type =>
    function onClickGuardarPiezaValidadaAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_CLICK_CERRAR').set(
  type =>
    function onClickCerrarAction(cancelar) {
      return {
        type,
        cancelar,
      };
    },
);

Actions.name('ON_CLICK_CANCELAR_ACCESORIO').set(
  type =>
    function onClickCancelarAccesorioAction(cancelar) {
      return {
        type,
        cancelar,
      };
    },
);

Actions.name('ON_EDITAR_ACCESORIO').set(
  type =>
    function onEditarAccesorioAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_EDITAR_PIEZA').set(
  type =>
    function onEditarPiezaAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_EDITAR_MOLDE').set(
  type =>
    function onEditarMoldeAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_ELIMINAR_ACCESORIO').set(
  type =>
    function onEliminarAccesorioAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_ELIMINAR_MOLDE_MODAL').set(
  type =>
    function onEliminarMoldeModalAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_ELIMINAR_MOLDE').set(
  type =>
    function onEliminarMoldeAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_CHANGE_SECCION_TAB').set(
  type =>
    function onChangeSeccionTabAction(_e, id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('HANDLE_DOWNLOAD_ARCHIVO').set(
  type =>
    function handleDownloadArchivoAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('HANDLE_DELETE_ARCHIVO').set(
  type =>
    function handleDeleteArchivoAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_ELIMINAR_ARCHIVO_DOCUMENTACION').set(
  type =>
    function onEliminarArchivoDocumentacionAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('HANDLE_DELETE_ARCHIVO_EDICION').set(
  type =>
    function handleDeleteArchivoEdicionAction(archivos) {
      return {
        type,
        archivos,
      };
    },
);

Actions.name('VER_PLANO').set(
  type =>
    function verPlanoAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_HANDLE_CLICK_LIST').set(
  type =>
    function onHandleClickListAction(band) {
      return {
        type,
        band,
      };
    },
);

Actions.name('ON_AGREGAR_SECCIONES').set(
  type =>
    function onAgregarSeccionesAction(secciones) {
      return {
        type,
        secciones,
      };
    },
);

Actions.name('ON_CHANGE_CONFIGURACION_TAB').set(
  type =>
    function onChangeConfiguracionTabAction(_e, id) {
      return {
        type,
        id,
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

Actions.name('ON_CLICK_AGREGAR').set(
  type =>
    function onClickAgregarAction(cancelar) {
      return {
        type,
        cancelar,
      };
    },
);

Actions.name('HANDLE_IMPORTAR_EXCEL').set(
  type =>
    function handleImportarExcelAction(event) {
      return {
        type,
        event,
      };
    },
);



export default Actions;