/*
 *
 * PlanDeTrabajo actions
 *
 */

/*
 *
 * BandejaDifusiones actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/PLANDETRABAJO/',
  subfix: '_ACTION',
});

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

Actions.name('ABRIR_MODAL_FORMULARIO').set(
  type =>
    function abrirModalFormularioAction(event) {
      return {
        type,
        event,
      };
    },
);
Actions.name('CERRAR_MODAL_FORMULARIO').set(
  type =>
    function cerrarModalFormularioAction(event) {
      return {
        type,
        event,
      };
    },
);

Actions.name('MOSTRAR_FORM_COLOR').set(
  type =>
    function mostrarFormColorAction(event) {
      return {
        type,
        event,
      };
    },
);

Actions.name('CHANGE_COLOR_PORTAFOLIO').set(
  type =>
    function changeColorPortafolioAction(event) {
      return {
        type,
        event,
      };
    },
);
Actions.name('GUARDAR_PORTAFOLIO').set(
  type =>
    function guardarPortafolioAction(event) {
      return {
        type,
        event,
      };
    },
);

Actions.name('SET_COLOR_PORTAFOLIO').set(
  type =>
    function setColorPortafolioAction(event) {
      return {
        type,
        event,
      };
    },
);

Actions.name('AJUSTAR_NOMBRE').set(
  type =>
    function ajustarNombreAction(event) {
    
      return {
        type,
        event: event.target.value,
      };
    },
);

Actions.name('ERROR_NOMBREPORTFOLIO').set(
  type =>
    function errorNombrePortafolioAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('OBTENER_PORTAFOLIOS').set(
  type =>
    function obtenerPortafoliosAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('MOSTRAR_OPCIONES_PORTAFOLIOS').set(
  type =>
    function mostrarOpcionesPortafoliosAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_ABRIR_POP').set(
  type =>
    function onAbrirPopAction(bandera) {
      return {
        type,
        bandera,
      };
    },
);


Actions.name('ABRIR_EDICION_PORTAFOLIO').set(
  type =>
    function abrirEdicionPortafolioAction(item) {
      return {
        type,
        item,
      };
    },
);

Actions.name('CHANGE_STEPPER').set(
  type =>
    function changeStepperAction(obt) {      
      return {
        type,
        obt,
      };
    },
);

Actions.name('ABRIR_MODAL_PROYECTOS').set(
  type =>
    function abrirModalProyectosAction() { 
      return {
        type,
      };
    },
);

Actions.name('OBTENER_PLANTILLAS').set(
  type =>
    function obtenerPlantillasAction(IdDepartamento) { 
      return {
        type,
        IdDepartamento,
      };
    },
);

Actions.name('ON_CHANGE_PLANTILLA').set(
  type =>
    function onChangePlantillaAction(event) {       
      return {
        type,
        event,
      };
    },
);

Actions.name('HANDLE_CHANGE_PRIORIDAD').set(
  type =>
    function handleChangePrioridadAction(event) { 
      return {
        type,
        event: event.target.value,
      };
    },
);

Actions.name('SET_NOMBRE_PROYECTO').set(
  type =>
    function setNombreProyectoAction(event) { 
      return {
        type,
        event:event.target.value,
      };
    },
);

Actions.name('CERRAR_MODAL_PROYECTOS').set(
  type =>
    function cerrarModalProyectosAction(event) {
      return {
        type,
        event,
      };
    },
);

Actions.name('OBTENER_EMPLEADOS').set(
  type =>
    function obtenerEmpleadosAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_CHANGE_EMPLEADO').set(
  type =>
    function onChangeEmpleadoAction(event) { 
      return {
        type,
        event,
      };
    },
);

Actions.name('CHANGE_COLOR_PROYECTO').set(
  type =>
    function changeColorProyectoAtion(event) {
      return {
        type,
        event,
      };
    },
);

Actions.name('GUARDAR_PROYECTO').set(
  type =>
    function guardarProyectoAction(event) {
      return {
        type,
        event,
      };
    },
);

Actions.name('OBTENER_PROYECTOS').set(
  type =>
    function obtenerProyectosAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ABRIR_EDICION_PROYECTO').set(
  type =>
    function abrirEdicionProyectoAction(event) {
      return {
        type,
        event,
      };
    },
);

Actions.name('REDIRECCIONAR_PORTAFOLIOS').set(
  type =>
    function redireccionarPortafoliosAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_FECHA_INPUT').set(
  type =>
    function onFechaInputAction(id,event) {
      return {
        type,
        id,
        event,
      };
    },
)

Actions.name('ON_FECHA_INPUT_RES').set(
  type =>
    function onFechaInputResAction(id,event) {
      return {
        type,
        id,
        event,
      };
    },
)

Actions.name('ON_CHANGE_ESTATUS').set(
  type =>
    function onChangeEstatusAction(event) {
      return {
        type,
        event:event.target.value,
      };
    },
)

Actions.name('CHANGE_FECHA').set(
  type =>
    function changeFechaAction(fechaIni, fechaFin) {
      return {
        type,
        fechaIni,
        fechaFin,
      };
    },
);

Actions.name('CHANGE_FECHA_RESPONSABLE').set(
  type =>
    function changeFechaResponsableAction(fechaIni, fechaFin) {
      return {
        type,
        fechaIni,
        fechaFin,
      };
    },
);

Actions.name('ON_CHANGE_RESPONSABLE').set(
  type =>
    function onChangeResponsableAction(event) {
      return {
        type,
        event,
      };
    },
)

Actions.name('ON_CLICK_LIMPIAR').set(
  type =>
    function onClickLimpiarAction(event) {
      return {
        type,
        event,
      };
    },
)

Actions.name('ON_CLICK_FILTRAR').set(
  type =>
    function onClickFiltrarAction(data) {
      return {
        type,
        data,
      };
    },
)

Actions.name('ON_CLICK_FILTRAR_PENDIENTES').set(
  type =>
    function onClickFiltrarPendientesAction(data) {
      return {
        type,
        data,
      };
    },
)

Actions.name('CAMBIAR_STEPPER').set(
  type =>
    function cambiarStepperAction(data,IdPortafolio,IdProyecto,IdPlantilla,Estatus) {
      return {
        type,
        data,
        IdPortafolio,
        IdProyecto,
        IdPlantilla,
        Estatus,
      };
    },
)

Actions.name('HANDLE_CHANGE_TAB_DETAILS').set(
  type =>
    function handleChangeTabDetailsAction(event) {
      return {
        type,
        id: event.currentTarget.id,
      };
    },
);

Actions.name('SET_MENSAJES_CHAT').set(
  type =>
    function setMensajesChatAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('ON_CHANGE_TEXT_FIELD_ESCRIBIR_MENSAJE').set(
  type =>
    function onChangeTextFieldEscribirMensajeAction(event) {
      return {
        type,
        mensaje: event.target.value,
      };
    },
);

Actions.name('ABRIR_MODAL_OBSERVACIONES').set(
  type =>
    function abrirModalObservacionesAction() {
      return {
        type,
      };
    },
);

Actions.name('CERRAR_MODAL_OBSERVACIONES').set(
  type =>
    function cerrarModalObservacionesAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_IMAGEN_AVATAR').set(
  type =>
    function getImagenAvatarAction() {
      return {
        type,
      }
    },
);

Actions.name('SET_IMAGEN_AVATAR').set(
  type =>
    function setImagenAvatar(data) {
      return {
        type,
        data,
      };
    },
);

// ------------------------------------------------------------ PROYECTOS PENDIENTES  --  <[(◕‿◕)]> 

Actions.name('OBTENER_PR_PENDIENTES').set(
  type =>
    function obtenerPrPendientesAction() {

      return {
        type,
      };
    },
);

Actions.name('ASIGNAR_PROYECTO').set(
  type =>
    function asignarProyectoAction(event) {
      return {
        type,
        event,
      };
    },
);

Actions.name('SET_AUTORIZADOR').set(
  type =>
    function setAutorizadorAction(event) {
      return {
        type,
        event,
      };
    },
);

Actions.name('ABRIR_MODAL_DOCUMENTOS').set(
  type =>
    function abrirModalDocumentosAction(event) {
      return {
        type,
        event,
      };
    },
);

Actions.name('LIMPIAR_STATE_PROYECTOS_PENDIENTES').set(
  type =>
    function limpiarProyectosPendientesAction(event) {
      return {
        type,
        event,
      };
    },
);


Actions.name('OBTENER_OBSERVACIONES').set(
  type =>
    function obtenerObservacionesAction(idProyecto) {
      return {
        type,
        idProyecto,
      };
    },
);

Actions.name('ABRIR_GUARDAR_MODAL').set(
  type =>
    function abrirGuardarModalAction(event) {
      return {
        type,
        event,
      };
    },
);

export default Actions;



