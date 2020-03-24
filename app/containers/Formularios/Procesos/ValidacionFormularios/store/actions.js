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
    function setEncuestaDetalle(data, idAsignacion) {
      return {
        type,
        data,
        idAsignacion,
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

Actions.name('GET_USUARIOS').set(
  type =>
    function getUsuariosAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_USUARIOS').set(
  type =>
    function setUsuariosAction(usuarios) {
      return {
        type,
        usuarios,
      };
    },
);

Actions.name('OPEN_MODAL').set(
  type =>
    function openModalAction(referencia) {
      return {
        type,
        referencia,
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

Actions.name('POST_VALIDACION').set(
  type => 
    function postValidacionAction(){
      return {
        type,
      }
    }
)

Actions.name('SET_USUARIOS_ASIGNADOS').set(
  type =>
    function setUsuariosAsignados(usuariosAsignados = []) {
      return {
        type,
        usuariosAsignados, 
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

Actions.name('ON_CHANGE_COMBO').set(
  type => 
    function onChangeComboAction(index, selected){
      return {
        type,
        index,
        selected,
      }
    }
)

export default Actions;
