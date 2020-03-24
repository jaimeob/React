/*
 *
 * MovimientosInventario actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';
// import { debug } from 'util';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/MOVIMIENTOSINVENTARIO/',
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
Actions.name('LIMPIAR_STATE').set(
  type =>
    function limpiarStateAction() {
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

Actions.name('NUEVO_MOVIMIENTO').set(
  type =>
    function nuevoMovimientoAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_MOSTRAR_MOLDE').set(
  type =>
    function setMostrarMoldeAction() {
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

Actions.name('GET_PLAZAS').set(
  type =>
    function getPlazasAction(usuarioId) {
      return {
        type,
        usuarioId,
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

Actions.name('SET_PLAZAS_DETALLE').set(
  type =>
    function setPlazasDetalleAction(datos) {
      return {
        type,
        datos,
      };
    },
);


Actions.name('GET_TIPOS_MOVIMIENTOS').set(
  type =>
    function getTiposMovimientosAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_TIPOS_MOVIMIENTOS').set(
  type =>
    function setTiposMovimientosAction(datos) {
      return {
        type,
        datos,
      };
    },
);



Actions.name('GET_TABLA_MOVIMIENTOS').set(
  type =>
    function getTablaMovimientosAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_TABLA_MOVIMIENTOS').set(
  type =>
    function setTablaMovimientosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_PLAZAS_DESTINO').set(
  type =>
    function setPlazasDestinoAction(plazas,plazaSeleccionada) {
      return {
        type,
        plazas,
        plazaSeleccionada,
      };
    },
);


Actions.name('SET_TABLA_MOLDE').set(
  type =>
    function setTablaMoldeAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_INSUMOS_MOLDE').set(
  type =>
    function setInsumosMoldeAction(datos) {
      return {
        type,
        datos,
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

Actions.name('ON_INPUT_FOLIO_CHANGE').set(
  type =>
    function onInputFolioChangeAction(valor) {
      return {
        type,
        valor,
      };
    },
);

Actions.name('ON_TIPO_MOVIMIENTO_CHANGE').set(
  type =>
    function onTipoMovimientoChangeAction(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);

Actions.name('ON_MOLDE_SELECCIONADO_CHANGE').set(
  type =>
    function onMoldeSeleccionadoChangeAction(rowSeleccionados, idMolde,pestañaSeleccionada) {
      return {
        type,
        rowSeleccionados,
        idMolde,
        pestañaSeleccionada,
      };
    },
);

Actions.name('SET_ROW_MOLDE_SELECCIONADO').set(
  type =>
    function setRowMoldeSeleccionadoAction(rowSeleccionados,pestañaSeleccionada,idMolde) {
      return {
        type,
        rowSeleccionados,
        pestañaSeleccionada,
        idMolde,
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

Actions.name('SET_INPUT_CHANGE_SECCION').set(
  type =>
    function setInputChangeSeccionAction(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);

Actions.name('SET_PIEZAS_MOLDE').set(
  type =>
    function setInputChangeSeccionAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ACCESORIOS_MOLDE').set(
  type =>
    function setInputChangeSeccionAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('ON_INPUT_MONTO_MOLDE').set(
  type =>
    function onInputMontoMoldeAction(index, value) {
      return {
        type,
        index,
        value,
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
    function onEliminarArchivoDocumentacionAction() {
      return {
        type,
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
Actions.name('HANDLE_DOWNLOAD_ARCHIVO').set(
  type =>
    function handleDownloadArchivoAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_CLICK_CANCELAR_MOVIMIENTO').set(
  type =>
    function onClickCancelarMovimientoAction(cancelar = false) {
      return {
        type,
        cancelar,
      };
    },
);

Actions.name('ON_CLICK_AGREGAR_MOVIMIENTO').set(
  type =>
    function onClickAgregarMovimientoAction(agregar = false) {
      return {
        type,
        agregar,
      };
    },
);

Actions.name('HANDLE_ABRIR_MODAL_AGREGAR').set(
  type =>
    function handleAbrirModalAgregarAction(abrir = false) {
      return {
        type,
        abrir,
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

Actions.name('SET_MOVIMIENTO_GUARDADO').set(
  type =>
    function setMovimientoGuardado(datos) {
      return {
        type,
        datos,
      };
    },
);


Actions.name('ON_SELECT_MOVIMIENTO').set(
  type =>
    function onSelectMovimientoAction(IdMovimiento) {
      return {
        type,
        IdMovimiento,
      };
    },
);

Actions.name('SET_DETALLE_MOVIMIENTO').set(
  type =>
    function setDetalleMovimiento(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_DETALLE_TABLAS_MOVIMIENTO').set(
  type =>
    function setDetalleTablasMovimiento(datos,idMolde) {
      return {
        type,
        datos,
        idMolde,
      };
    },
);

Actions.name('OBTENER_MOLDES_FOLIO').set(
  type =>
    function obtenerMoldesFolioAction(folio) {
      return {
        type,
        folio,
      };
    },
);

Actions.name('ON_INPUT_PLAZA_CHANGE').set(
  type =>
    function onInputPlazaChangeAction(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);

Actions.name('ON_INPUT_PLAZA_DESTINO_CHANGE').set(
  type =>
    function onInputPlazaDestinoChangeAction(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);

Actions.name('SET_ALMACENES').set(
  type =>
    function setAlmacenesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ALMACENES_DESTINO').set(
  type =>
    function setAlmacenesDestinoAction(datos) {
      return {
        type,
        datos,
      };
    },
);



Actions.name('SET_ALMACENES_VALOR').set(
  type =>
    function setAlmacenesValorAction(valor) {
      return {
        type,
        valor,
      };
    },
);

Actions.name('SET_ALMACENES_DESTINO_VALOR').set(
  type =>
    function setAlmacenesDestinoValorAction(valor) {
      return {
        type,
        valor,
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

Actions.name('ON_SEARCH_CHANGE').set(
  type =>
    function onSearchChangeAction(tipo,textoBusqueda) {
      return {
        type,
        tipo,
        textoBusqueda,
      };
    },
);

export default Actions;