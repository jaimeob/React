/*
 *
 * ConfiguracionTransformacion actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/CONFIGUARACIONTRANSFORMACION/',
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

Actions.name('GET_TRANSFORMACION_DETALLE').set(
  type =>
    function getTransformacionDetalleAction(idTransformacion) {
      return {
        type,
        idTransformacion,
      };
    },
);

Actions.name('SET_TRANSFORMACION_DETALLE').set(
  type =>
    function setTransformacionDetalleAction(datos) {
      return {
        type,
        datos,
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

Actions.name('GET_MOLDES').set(
  type =>
    function getMoldesAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_MOLDES_ORIGEN').set(
  type =>
    function setMoldesOrigenAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_MOLDES_DESTINO').set(
  type =>
    function setMoldesDestinoAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_TRANSFORMACIONES').set(
  type =>
    function setTransformacionesAction(datos) {
      return {
        type,
        datos,
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

Actions.name('REGRESAR_STEPPER').set(
  type =>
    function regresarStepperAction() {
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

Actions.name('SECCION_FILTER').set(
  type =>
    function seccionFilterAction(seccion, tipo) {
      const idSeccion = seccion.target.value;
      return {
        type,
        idSeccion,
        tipo,
      };
    },
);

Actions.name('SET_SNACKBAR').set(
  type =>
    function setSnackbarAction(snack) {
      return {
        type,
        snack,
      };
    },
);

Actions.name('CLEAN_SNACKBAR').set(
  type =>
    function cleanSnackbarAction() {
      return {
        type,
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

Actions.name('DELETE_TRANSFORMACION').set(
  type =>
    function deleteTransformacionAction(idTransformacion) {
      return {
        type,
        idTransformacion,
      };
    },
);

Actions.name('GET_MOLDE_ID').set(
  type =>
    function getMoldeIdAction(event, tipo) {
      const IdConfiguracionMolde = event.target.value;
      return {
        type,
        IdConfiguracionMolde,
        tipo,
      };
    },
);

Actions.name('LOCK_MOLDES').set(
  type =>
    function lockMoldesAction() {
      return {
        type,
      };
    },
);

Actions.name('UNLOCK_MOLDES').set(
  type =>
    function unlockMoldesAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_SECCIONES_ORIGEN').set(
  type =>
    function setSeccionesOrigenAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('SET_PLANTAS_ORIGEN').set(
  type =>
    function setPlantasOrigenAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('SET_PLANTAS_DESTINO').set(
  type =>
    function setPlantasOrigenAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('SET_SECCIONES_DESTINO').set(
  type =>
    function setSeccionesDestinoAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('SET_PIEZAS_ORIGEN').set(
  type =>
    function setPiezasOrigenAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('SET_PIEZAS_DESTINO').set(
  type =>
    function setPiezasDestinoAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('REMOVE_TASK').set(
  type =>
    function removeTaskAction(pieza,task) {
      return {
        type,
        task,
        pieza,
      };
    },
);

Actions.name('DRAG_END').set(
  type =>
    function dragEndAction(result) {
      return {
        type,
        result,
      };
    },
);

Actions.name('POST_TRANSFORMACION').set(
  type =>
    function postTransformacionAction(datos) {
      datos.persist();
      return {
        type,
        datos,
      };
    },
);

Actions.name('UPDATE_TRANSFORMACION').set(
  type =>
    function updateTransformacionAction(datos) {
      datos.persist();
      return {
        type,
        datos,
      };
    },
);

export default Actions;