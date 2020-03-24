/*
 *
 * Transformacion actions
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

Actions.name('GET_MOVIMIENTOS_TRANSFORMACIONES').set(
  type =>
    function getMovimientosTransformacionesAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_MOVIMIENTO_TRANSFORMACION_DETALLE').set(
  type =>
    function getMovimientoTransformacionDetalleAction(idTransformacion) {
      return {
        type,
        idTransformacion,
      };
    },
);

Actions.name('SET_MOVIMIENTO_TRANSFORMACION_DETALLE').set(
  type =>
    function setMovimientoTransformacionDetalleAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('SET_MOVIMIENTOS_TRANSFORMACIONES').set(
  type =>
    function setMovimientosTransformacionesAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('NUEVA_TRANSFORMACION').set(
  type =>
    function nuevaTransformacionAction() {
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

Actions.name('ON_CHANGE_SECCION_TAB').set(
  type =>
    function onChangeSeccionTabAction(_e, id) {
      return {
        type,
        id,
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

Actions.name('GET_TRANSFORMACIONES').set(
  type =>
    function getTransformacionesAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_TRANSFORMACIONES').set(
  type =>
    function setTransformacionesAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('GET_TRANSFORMACIONES').set(
  type =>
    function getTransformacionesAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_TRANSFORMACIONES').set(
  type =>
    function setTransformacionesAction(data) {
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
Actions.name('REGRESAR_STEPPER').set(
  type =>
    function regresarStepperAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_MOLDES_DESTINO').set(
  type =>
    function getMoldesDestinoAction(idMolde, idConfiguracionMolde, plantas) {
      return {
        type,
        idMolde,
        idConfiguracionMolde,
        plantas,
      };
    },
);

Actions.name('SET_MOLDES_DESTINO').set(
  type =>
    function setMoldesDestinoAction(idMolde, idConfiguracionMolde, data, plantas) {
      return {
        type,
        idMolde,
        idConfiguracionMolde,
        data,
        plantas,
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

Actions.name('SET_MOLDE_SELECCIONADO').set(
  type =>
    function setMoldeSeleccionadoAction(data, planta) {
      return {
        type,
        data,
        planta,
      };
    },
);

Actions.name('SET_INSUMOS').set(
  type =>
    function setInsumosAction(seleccionados, piezas, accesorios) {
      return {
        type,
        seleccionados,
        piezas,
        accesorios,
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

Actions.name('DEVOLVER').set(
  type =>
    function devolverAction() {
      return {
        type,
      };
    },
);
export default Actions;