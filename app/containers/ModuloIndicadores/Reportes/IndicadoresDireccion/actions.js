/*
 *
 * IndicadoresDireccion actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/PROCESOINDICADOR/REPORTES/',
  subfix: '_ACTION',
});

Actions.name('GET_FILTROS').set(
  type =>
    function getFiltrosAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_FILTROS').set(
  type =>
    function setFiltrosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('GET_DATOS').set(
  type =>
    function getDatosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_DATOS').set(
  type =>
    function setDatosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_HEIGHT').set(
  type =>
    function setHeightAction(height, tableHeight) {
      return {
        type,
        height,
        tableHeight,
      };
    },
);

Actions.name('ON_CHANGE_FILTRO').set(
  type =>
    function onChangeFiltroAction(id, valor) {
      return {
        type,
        id,
        valor,
      };
    },
);

Actions.name('GET_DEPARTAMENTO_PUESTOS').set(
  type =>
    function getDepartamentoPuestosAction(idDepartamento) {
      return {
        type,
        idDepartamento,
      };
    },
);

Actions.name('SET_DEPARTAMENTO_PUESTOS').set(
  type =>
    function setDepartamentoPuestosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('ON_CLICK_FILTRAR').set(
  type =>
    function onClickFiltrarAction() {
      return {
        type,
      };
    },
);

export default Actions;