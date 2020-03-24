/*
 *
 * Indicador actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/PROCESOINDICADOR/',
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

Actions.name('PONE_IMAGEN_ESTATUS').set(
  type =>
    function poneImagenEstatusAction(event) {
      return {
        type,
        event: event.currentTarget,
      };
    },
);

Actions.name('GET_INDICADORES').set(
  type =>
    function getIndicadoresAction(indice) {
      return {
        type,
        indice,
      };
    },
);

Actions.name('SET_INDICADORES').set(
  type =>
    function setIndicadoresAction(datos, entregado, usuarioIndicador, idPeriodo) {
      return {
        type,
        datos,
        entregado,
        usuarioIndicador,
        idPeriodo,
      };
    },
);

Actions.name('GET_HISTORIAL').set(
  type =>
    function getHistorialAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_HISTORIAL').set(
  type =>
    function setHistorialAction(datos, usuarioLogeado) {
      return {
        type,
        datos,
        usuarioLogeado,
      };
    },
);

Actions.name('ON_CLICK_REGRESAR').set(
  type =>
    function onClickRegresarAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_CLICK_RESULTADO').set(
  type =>
    function onClickResultadoAction(tipo, indice) {
      return {
        type,
        tipo,
        indice,
      };
    },
);

Actions.name('ON_CLICK_DESCARGAR_DETALLE').set(
  type =>
    function onClickDescargarDetalleAction(idBitacoraCambio) {
      return {
        type,
        idBitacoraCambio,
      };
    },
);

Actions.name('ON_CLICK_AUTORIZAR').set(
  type =>
    function onClickAutorizarAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_PUESTOS_USUARIOS_INDICADORES').set(
  type =>
    function getPuestosUsuariosIndicadoresAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_PUESTOS_USUARIOS_INDICADORES').set(
  type =>
    function setPuestosUsuariosIndicadoresAction(data) {
      return {
        type,
        data,
      };
    },
);

export default Actions;
