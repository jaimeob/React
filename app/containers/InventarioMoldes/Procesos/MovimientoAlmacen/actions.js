/*
 *
 * MovimientoAlmacen actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/MOVIMIENTOALMACEN/',
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

Actions.name('REGRESAR_STEPPER').set(
  type =>
    function regresarStepperAction() {
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

Actions.name('GET_MOVIMIENTOS').set(
  type =>
    function getMovimientosAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_MOVIMIENTOS').set(
  type =>
    function setMovimientosAction(datos) {
      return {
        type,
        datos,
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

Actions.name('DELETE_MOVIMIENTO').set(
  type =>
    function deleteMovimientoAction(idMovimiento) {
      return {
        type,
        idMovimiento,
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

Actions.name('GET_MOVIMIENTO_DETALLE').set(
  type =>
    function getMovimientoDetalleAction(idMovimientoAlmacen) {
      return {
        type,
        idMovimientoAlmacen,
      };
    },
);

Actions.name('SET_MOVIMIENTO_DETALLE').set(
  type =>
    function setMovimientoDetalleAction(data) {
      return {
        type,
        data,
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
    function setMoldesAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('GET_INSUMOS').set(
  type =>
    function getInsumosAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_INSUMOS').set(
  type =>
    function setInsumosAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('SET_INSUMOS_SLC').set(
  type =>
    function setInsumosSlcAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('GET_INSUMOS_MOLDES').set(
  type =>
    function getInsumosMoldesAction(IdConfiguracionMolde, IdAlmacen, IdPlaza, Plantas, IdMolde, IdInventario) {
      
      return {
        type,
        IdConfiguracionMolde,
        IdAlmacen,
        IdPlaza,
        Plantas,
        IdMolde,
        IdInventario,
      };
    },
);

Actions.name('SET_PIEZAS').set(
  type =>
    function setPiezasAction(data, IdMolde) {
      return {
        type,
        data,
        IdMolde,
      };
    },
);

Actions.name('SET_PLANTAS').set(
  type =>
    function setPlantasAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('PLANTA_FILTER').set(
  type =>
    function plantaFilterAction(planta, tipo) {
      const idPlanta = planta.target.value;
      return {
        type,
        idPlanta,
        tipo,
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

Actions.name('SET_INSUMOS_SELECCIONADOS').set(
  type =>
    function setInsumosSeleccionadosAction(seleccionados, IdMolde, pestana) {
      return {
        type,
        seleccionados,
        IdMolde,
        pestana,
      };
    },
);

Actions.name('SET_ACCESORIOS').set(
  type =>
    function setAccesoriosAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('ON_INPUT_CHANGE').set(
  type =>
    function onInputChangeAction(campo, e) {
      const valor = e.target.value;
      return {
        type,
        campo,
        valor,
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
    function getPlazasAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_ALMACENES').set(
  type =>
    function setPlazasAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('GET_UBICACIONES').set(
  type =>
    function getUbicacionesAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_UBICACIONES').set(
  type =>
    function setUbicacionesAction(data) {
      return {
        type,
        data,
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

Actions.name('ON_INPUT_CANTIDAD_ACCESORIO').set(
  type =>
    function onInputCantidadAccesorioAction(cantidad, index) {
      return {
        type,
        cantidad,
        index,
      };
    },
);

Actions.name('POST_MOVIMIENTO').set(
  type =>
    function postMovimientoAction() {
      return {
        type,
      };
    },
);

export default Actions;