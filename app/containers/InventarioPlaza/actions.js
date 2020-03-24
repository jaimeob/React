/*
 *
 * InventarioPlanza actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/INVENTARIOPLAZA/',
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

Actions.name('GET_MATERIALES').set(
  type =>
    function getMaterialesAction(idAgrupador) {
      return {
        type,
        idAgrupador,
      };
    },
);

Actions.name('GET_EXISTENCIAS').set(
  type =>
    function getExistenciaAction(idArticulo) {
      return {
        type,
        idArticulo,
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

Actions.name('GET_AGRUPADORES').set(
  type =>
    function getAgrupadoresAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_REPORTES').set(
  type =>
    function getReportesAction(idPlaza) {
      return {
        type,
        idPlaza,
      };
    },
);

Actions.name('SET_MATERIALES').set(
  type =>
    function setMaterialesAction(datos, agrupador) {
      return {
        type,
        datos,
        agrupador,
      };
    },
);

Actions.name('SET_EXISTENCIA').set(
  type =>
    function setMaterialesAction(datos, existencia) {
      return {
        type,
        datos,
        existencia,
      };
    },
);

Actions.name('SET_AGRUPADORES').set(
  type =>
    function setAgrupadoresAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_REPORTES').set(
  type =>
    function setReportesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_MOVIMIENTOS').set(
  type =>
    function setMovimientosAction(datos, usuario) {
      return {
        type,
        datos,
        usuario,
      };
    },
);

Actions.name('SET_ROW').set(
  type =>
    function setRowAction(row) {
      return {
        type,
        row,
      };
    },
);

Actions.name('AGREGAR_ARTICULO').set(
  type =>
    function agregarArticuloAction(row) {
      return {
        type,
        row,
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

Actions.name('POST_MOVIMIENTOS').set(
  type =>
    function postMovimientoAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('CLEAR_ID').set(
  type =>
    function clearIdAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_MOVIMIENTO_DETALLE').set(
  type =>
    function getMovimientoDetalleAction(idMovimiento) {
      return {
        type,
        idMovimiento,
      };
    },
);

Actions.name('SET_MOVIMIENTO_DETALLE').set(
  type =>
    function setMovimientoDetalleAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ROW_EMPTY').set(
  type =>
    function setRowEmptyAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('AGREGAR_NUEVO').set(
  type =>
    function agregarNuevoAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('ADD_BY_ID').set(
  type =>
    function addByIdAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('SET_ARTICULO_DETALLE').set(
  type =>
    function setArticuloDetalleAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ID').set(
  type =>
    function setIdAction(e) {
      const id = e.target.value;
      return {
        type,
        id,
      };
    },
);

Actions.name('SET_MODULO').set(
  type =>
    function setModuloAction(e) {
      const idModulo = e.target.value;
      return {
        type,
        idModulo,
      };
    },
);

Actions.name('SET_ARTICULO').set(
  type =>
    function setArticuloAction(e) {
      const idArticulo = e.target.value;
      return {
        type,
        idArticulo,
      };
    },
);

Actions.name('SET_CANTIDAD').set(
  type =>
    function setArticuloAction(e) {
      const cantidad = e.target.value;
      return {
        type,
        cantidad,
      };
    },
);

Actions.name('SET_COMENTARIO').set(
  type =>
    function setArticuloAction(e) {
      const comentario = e.target.value;
      return {
        type,
        comentario,
      };
    },
);

Actions.name('REGRESAR').set(
  type =>
    function regresarAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('OPEN_MODAL').set(
  type =>
    function openModalAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('CLOSE_MODAL').set(
  type =>
    function closeModalAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('OPEN_MODAL2').set(
  type =>
    function openModal2Action(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('CLOSE_MODAL2').set(
  type =>
    function closeModal2Action(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('OPEN_MODAL3').set(
  type =>
    function openModal3Action(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('CLOSE_MODAL3').set(
  type =>
    function closeModal3Action(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('OPEN_MODAL4').set(
  type =>
    function openModal4Action(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('CLOSE_MODAL4').set(
  type =>
    function closeModal4Action(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('CLEAR_MODAL').set(
  type =>
    function clearModalAction(datos) {
      return {
        type,
        datos,
      };
    },
);

export default Actions;