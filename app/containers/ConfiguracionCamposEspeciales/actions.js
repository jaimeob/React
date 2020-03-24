/*
 *
 * ConfiguracionCamposEspeciales actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';
import toSafeInteger from 'lodash/toSafeInteger';
import { DEFAULT_ACTION } from './constants';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/',
  subfix: '_ACTION',
});

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
// ETAPAS - JAVIER ----------------------------------------------------------------------------

Actions.name('GET_ETAPAS').set(
  type =>
    function getEtapasAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('SET_ETAPAS').set(
  type =>
    function setEtapasAction(data, idPlaza) {
      return {
        type,
        data,
        idPlaza,
      };
    },
);

Actions.name('GET_PLAZAS').set(
  type =>
    function getPlazasAction(data) {
      return {
        type,
        IdPlantilla: data.IdPlantilla !== undefined ? data.IdPlantilla : 0,
        array: data.Etapas,
      };
    },
);

Actions.name('SET_PLAZAS').set(
  type =>
    function setPlazasAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('DELETE_ETAPA').set(
  type =>
    function deleteEtapaAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('DELETE_PLAZA').set(
  type =>
    function deletePlazaAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('CHANGE_STEPPER').set(
  type =>
    function changeStepperAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('CANCELAR_ETAPA').set(
  type =>
    function cancelarEtapaAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('CHANGE_REDIRECT').set(
  type =>
    function changeRedirectAction() {
      return {
        type,
      };
    },
);

Actions.name('INICIALIZAR_ESTADO').set(
  type =>
    function inicializarEstadoAction() {
      return {
        type,
      };
    },
);

Actions.name('CHANGE_ETAPA').set(
  type =>
    function changeEtapaAction() {
      return {
        type,
      };
    },
);


// CONFIGURACIÓN - ALEXIS ----------------------------------------------------------------------------
 
// Actions.name('REDIRECCIONAR_CONF').set(
//   type =>
//     function redireccionarConfEtapasAction () {   
//       console.log("Zombie");
      
//       return {
//         type,
//       };
//     },
// );




// CONF ETAPAS - JAIME ----------------------------------------------------------------------------
 
Actions.name('GET_PLAZAS_HABILITADAS').set(
  type =>
    function getPlazasHabilitadasAction() {
      return {
        type,
      };
    },
);

Actions.name('HANDLE_CHANGE_PLAZA').set(
  type =>
    function handleChangePlazaAction(event) {
      return {
        type,
        event : {
          id: toSafeInteger(event.target.value),
          nombre: event.currentTarget.textContent,
        },
      };
    },
);

Actions.name('HANDLE_CHANGE_PLAZA_DESTINO').set(
  type =>
    function handleChangePlazaDestinoAction(event) {
      return {
        type,
        event : {
          id: toSafeInteger(event.target.value),
          nombre: event.currentTarget.textContent,
        },
      };
    },
);
// ----------------------------------------------------------------------------------- 

Actions.name('HANDLE_CHANGE_TIPO').set(
  type =>
    function handleChangeTipoAction (event) {  
      console.log(event,"LO QUE LLEGA PAPA");
      if(event.value !==undefined){
        return {
          type,
          event : {
            id: event.value,  
            nombre: event.label,
          },
        };
      }
      return {
        type,
        event : {
          id: toSafeInteger(event.target.value),
          nombre: event.currentTarget.textContent,
        },
      };
    },
);

// ----------------------------------------------------------------------------------------

Actions.name('CHECK_SEGUIMIENTO').set(
  type =>
    function checkSeguimientoAction(event) {
      return {
        type,
        event : event.target.checked,
      };
    },
);
Actions.name('CHANGE_NOMBRE_ETAPA').set(
  type =>
    function changeNombreEtapaAction(event) {
      return {
        type,
        event : event.target.value,
      };
    },
);

Actions.name('SELECCIONAR_USARIOS_ROLES').set(
  type =>
    function seleccionarTipoBusquedaAction(event) {
      return {
        type,
        event : event.target.value,
      };
    },
);

Actions.name('PERMITIR_CANCELACION').set(
  type =>
    function permitirCancelacionAction(event) {
      return {
        type,
        event : event.target.value,
      };
    },
);

Actions.name('HANDLE_CHANGE_DEPENDENCIA').set(
  type =>
    function handleChangeDependenciaAction (event) {   
      return {
        type,
        event : {
          id: toSafeInteger(event.target.value),
          nombre: event.currentTarget.textContent,
        },
      };
    },
);

Actions.name('REDIRECCIONAR_CAMPOS').set(
  type =>
    function redireccionarCamposAction () {   
      return {
        type,
      };
    },
);

Actions.name('REDIRECCIONAR_ETAPAS').set(
  type =>
    function redireccionarEtapas () {   
      return {
        type,
      };
    },
);

Actions.name('CHANGE_HORA_INICIO').set(
  type =>
    function changeHoraInicio (event) {         
      return {
        type,
        event:event.target.value,
      };
    },
);
Actions.name('CHANGE_HORA_INICIO_2').set(
  type =>
    function changeHoraInicio2 (event) {         
      return {
        type,
        event:event.target.value,
      };
    },
);
Actions.name('CHANGE_HORA_FIN').set(
  type =>
    function changeHoraFin (event) {         
      return {
        type,
        event:event.target.value,
      };
    },
);
Actions.name('CHANGE_HORA_FIN_2').set(
  type =>
    function changeHoraFin2 (event) {         
      return {
        type,
        event:event.target.value,
      };
    },
);


Actions.name('VACIAR_PLAZAS').set(
  type =>
    function vaciasrPlazas() {
      return {
        type,
      };
    },
);

Actions.name('REDIRIGIR_CONF_TICKETS').set(
  type =>
    function redirectConfEtapas() {
      // console.log("entra aqui")
      return {
        type,
      };
    },
);


Actions.name('AGREGAR_ETAPA_PLAZA').set(
  type =>
    function agregarEtapaPlaza() {
      return {
        type,
      };
    },
);

Actions.name('AGREGAR_CAMPOS_ESPECIALES_ETAPA').set(
  type =>
    function agregarCamposEspecialesEtapa() {
      return {
        type,
      };
    },
);

Actions.name('EDITAR_ETAPA').set(
  type =>
    function editarEtapaAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ACTUALIZAR_ETAPA_TEMPORAL').set(
  type =>
    function actualizarEtapaTemporal() {
      return {
        type,
      };
    },
);

Actions.name('INSERTAR_TIEMPO_SLA1').set(
  type =>
    function insertarTiempoSLA1(event) {
      return {
        type,
        event:event.target.value,
      };
    },
);

Actions.name('INSERTAR_TIEMPO_SLA2').set(
  type =>
    function insertarTiempoSLA2(event) {
      return {
        type,
        event:event.target.value,
      };
    },
);

Actions.name('HANDLE_CHANGE_PLAZA_CLON').set(
  type =>
    function handleChangePlazaClon(event) {
      return {
        type,
        event : {
          id: toSafeInteger(event.target.value),
          nombre: event.currentTarget.textContent,
        },
      };
    },
);


Actions.name('VALIDAR_ETAPAS').set(
  type =>
    function validarEtapasAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_COMPONENTES_CONFIGURACION').set(
  type =>
    function setComponentesAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('VACIAR_ESTADO').set(
  type =>
    function vaciarEstadoAction() {
      return {
        type,
      };
    },
);


Actions.name('AJUSTAR_CAMPO_ETAPAS').set(
  type =>
    function ajustarCampoAction() {      
      return {
        type,
      };
    },
);

Actions.name('CERRAR_MODAL_BORRADO').set(
  type =>
    function cerrarModalBorradoAction() {      
      return {
        type,
      };
    },
);

Actions.name('ABRIR_MODAL_BORRADO').set(
  type =>
    function abrirModalBorradoAction(id) {      
      return {
        type,
        id,
      };
    },
);

export default Actions; 