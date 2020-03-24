/*
 *
 * Pedidos actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/MATERIALES/',
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
    function getMaterialesAction() {
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

Actions.name('SET_MATERIALES').set(
  type =>
    function setMaterialesAction(datos) {
      return {
        type,
        datos,
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

Actions.name('POST_MATERIALES').set(
  type =>
    function postMaterialesAction(datos) {
      datos.persist();
      return {
        type,
        datos,
      };
    },
);

Actions.name('ACTUALIZAR_MATERIAL').set(
  type =>
    function actualizarMaterialAction(datos) {
      datos.persist();
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

Actions.name('GET_MATERIAL_DETALLE').set(
  type =>
    function getMaterialDetalleAction(idArticulo) {
      return {
        type,
        idArticulo,
      };
    },
);

Actions.name('SET_MATERIAL_DETALLE').set(
  type =>
    function setMaterialDetalleAction(datos) {
      return {
        type,
        datos,
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

Actions.name('SET_ERROR_AGRUPADOR').set(
  type =>
    function setErrorAgrupadorAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ERROR_NOMBRE').set(
  type =>
    function setErrorNombreAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ERROR_PRECIO').set(
  type =>
    function setErrorPrecioAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ERROR_STOCK_MINIMO').set(
  type =>
    function setErrorStockMinimoAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ERROR_STOCK_MAXIMO').set(
  type =>
    function setErrorStockMinimoAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_AGRUPADOR').set(
  type =>
    function setAgrupadorAction(datos, agrupador) {
      return {
        type,
        datos,
        agrupador,
      };
    },
);

Actions.name('SET_NOMBRE').set(
  type =>
    function setNombreAction(e) {
      const nombre = e.target.value;
      return {
        type,
        nombre,
      };
    },
);

Actions.name('SET_PRECIO').set(
  type =>
    function setPrecioAction(e) {
      const precio = e.target.value;
      return {
        type,
        precio,
      };
    },
);

Actions.name('SET_STOCK_MINIMO').set(
  type =>
    function setStockMinimoAction(e) {
      const stockMinimo = e.target.value;
      return {
        type,
        stockMinimo,
      };
    },
);

Actions.name('SET_STOCK_MAXIMO').set(
  type =>
    function setStockMaximoAction(e) {
      const stockMaximo = e.target.value;
      return {
        type,
        stockMaximo,
      };
    },
);

Actions.name('DELETE_MATERIAL').set(
  type =>
    function deleteMaterialAction(idArticulo) {
      return {
        type,
        idArticulo,
      };
    },
);

export default Actions;
