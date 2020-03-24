/*
 *
 * EntregaIndicador actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/CONFIGURACIONBONO/',
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

Actions.name('GET_ENTREGA_INDICADOR').set(
  type =>
    function getEntregaIndicador(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ENTREGA_INDICADOR').set(
  type =>
    function setEntregaIndicador(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('POST_ENTREGA_INDICADOR').set(
  type =>
    function postEntregaIndicador(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_SELECTED').set(
  type =>
    function setSelected(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('GET_VALORES_ETIQUETAS').set(
  type =>
    function getValoresEtiquetas(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_VALORES_ETIQUETAS').set(
  type =>
    function setValoresEtiquetas(totalEvaluados,aplicaBono,pendienteEntrega) {
      return {
        type,
        totalEvaluados,
        aplicaBono,
        pendienteEntrega,
      };
    },
);

Actions.name('GET_COMBOS_FILTROS').set(
  type =>
    function getCombosFiltros(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_SELECTED_DIRECCION').set(
  type =>
    function setSelectedDireccion(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_COMBOS_FILTROS').set(
  type =>
    function setCombosFiltros(datos) {
      return {
        type,
        datos,
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


export default Actions 
