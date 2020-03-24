/*
 *
 * ReporteEncuestas actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/REPORTE_ENCUESTAS/',
  subfix: '_ACTION',
});

Actions.name('REQUEST_GET_ENCUESTAS').set(
  type =>
    function requestGetEncuestas(tipoFormulario = '') {
      return {
        type,
        tipoFormulario,
      };
    },
);

Actions.name('SET_STEPPER').set(
  type =>
    function setStepper(stepper = 0) {
      return {
        type,
        stepper,
      };
    },
);

Actions.name('SET_ENCUESTAS').set(
  type =>
    function setEncuestas(data = []) {
      return {
        type,
        data,
      };
    },
);

Actions.name('REQUEST_GET_DEPARTAMENTOS_PUESTOS').set(
  type =>
    function requestGetDepartamentosPuestos() {
      return {
        type,
      };
    },
);

Actions.name('SET_DEPARTAMENTOS_PUESTOS').set(
  type =>
    function setDepartamentosPuestos(departamentos = [], puestos = []) {
      return {
        type,
        departamentos, 
        puestos,
      };
    },
);

Actions.name('REQUEST_SHOW_ENCUESTA').set(
  type =>
    function requestShowEncuesta(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('SET_ENCUESTA_DETALLE').set(
  type =>
    function setEncuestaDetalle(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('ON_CHANGE_COMBO').set(
  type => 
    function onChangeCombo(index, selected){
      return {
        type,
        index,
        selected,
      }
    }
)

Actions.name('SET_MODAL_BACK').set(
  type =>
    function setModalBack() {
      return {
        type,
      };
    },
);

Actions.name('SET_USUARIOS_EVALUADOS').set(
  type =>
    function setUsuariosEvaluados(usuariosEvaluados = []) {
      return {
        type,
        usuariosEvaluados, 
      };
    },
);


Actions.name('SET_USUARIOS_EVALUADORES').set(
  type =>
    function setUsuariosEvaluadores(usuariosEvaluadores = []) {
      return {
        type,
        usuariosEvaluadores, 
      };
    },
);

Actions.name('SET_USUARIOS_AUTORIZADOS').set(
  type =>
    function setUsuariosAutorizados(usuariosAutorizados = []) {
      return {
        type,
        usuariosAutorizados, 
      };
    },
);

Actions.name('LIMPIAR_ESTADO').set(
  type =>
    function limpiarEstado() {
      return {
        type,
      };
    },
);

export default Actions;
