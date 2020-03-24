/*
 *
 * PedidosReporte actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/PEDIDOSREPORTE/',
  subfix: '_ACTION',
});

Actions.name('GET_REPORTE_COORPORATIVO').set(
  type =>
    function getReporteCoorporativoAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_REPORTE_PEDIDOS').set(
  type =>
    function getReportePedidosAction() {
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

Actions.name('GET_AGRUPADORES').set(
  type =>
    function getAgrupadoresAction() {
      return {
        type,
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

Actions.name('SET_MOUNTED').set(
  type =>
    function setMountedAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_REPORTE_COORPORATIVO').set(
  type =>
    function setReporteCoorporativoAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_REPORTE_PEDIDOS').set(
  type =>
    function setReportePedidosoAction(datos) {
      return {
        type,
        datos,
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

Actions.name('SET_AGRUPADORES').set(
  type =>
    function setAgrupadoresAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('CHANGE_PLAZA').set(
  type =>
    function changePlazaAction(event, band = false) {
      return {
        type,
        value : event.target.value,
        band,
      };
    },
);

Actions.name('CHANGE_AGRUPADOR').set(
  type =>
    function changeAgrupadorAction(event, band = false) {
      return {
        type,
        value : event.target.value,
        band,
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

Actions.name('LIMPIAR_FILTROS').set(
  type =>
    function limpiarFiltrosAction() {
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

Actions.name('ON_CLICK_LIMPIAR_FILTROS').set(
  type =>
    function onClickLimpiarFiltrosAction() {
      return {
        type,
      };
    },
);


export default Actions;