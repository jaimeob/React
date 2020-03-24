/*
 *
 * Tableros actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';
// import _ from 'lodash';
import toSafeInteger from 'lodash/toSafeInteger';

// import { Action } from 'popmotion';
// import STATE from '../../components/Layout/state';



const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/TABLEROS/',
  subfix: '_ACTION',
});

// app/container/Tableros/ADD_OPTION_ACTION

export function addOptionAction(key, value) {
  return {
    type: 'APP/TABLEROS/ADD_OPTION',
    key,
    value,
  };
}
Actions.name('DEFAULT').set(
  type =>
    function defaultAction() {
      return {
        type,
      };
    },
);

Actions.name('CHANGE_MENU').set(
  type =>
    function changeMenuAction(id) {
      // const opc = event.currentTarget.name;
      return {
        type,
        id,
      };
      
    },
    
);

Actions.name('TOGGLE_TIPO_TICKET').set(
  type =>
    function toggleTipoTicketAction(event) {
      const [
        id,
        indice,
      ]  = event.currentTarget.id.split('_');

      return {
        type,
        id,
        indice,
      };
    },
);
Actions.name('HANDLE_CHANGE_TAB').set(
  type =>
    function handleChangeTabAction(event) {
      return {
        type,
        id : event.currentTarget ? event.currentTarget.id - 1 : event,
      };
    },
);

Actions.name('HANDLE_CHANGE_TAB_DETAILS').set(
  type =>
    function handleChangeTabDetailsAction(event) {
      return {
        type,
        id: event.currentTarget.id,
      };
    },
);



Actions.name('ON_CLICKED_TICKET_SELECTED').set(
  type =>
    function onClickedTicketSelectedAction(idx, cIndex, idTicket, IdTipoEstatus,IdPlantilla) {
      return {
        type,
        index: idx,
        cIndex,
        idTicket,
        idConteiner: 2,
        IdTipoEstatus,
        IdPlantilla,
      };
    },
);

Actions.name('TICKET_SELECT').set(
  type =>
    function ticketSelectAction(event) {
      return {
        type,
        id: event.currentTarget.id,
      };
    },
);

Actions.name('HANDLE_CHANGE_DEPARTAMENTO').set(
  type =>
    function handleChangeDepartamentoAction(event) {
      return {
        type,
        event : {
          id: toSafeInteger(event.target.value),
          nombre: event.currentTarget.textContent,
          idDepartamento: event.currentTarget.id.split('_')[1],
        },
      };
    },
);

Actions.name('GENERAR_TICKET').set(
  type =>
    function generarTicketAction(event) {
      return {
        type,
        id: event.currentTarget.id,
      };
    },
);

Actions.name('GET_DEPARTAMENTOS').set(
  type =>
    function getDepartamentosAction() {
      return {
        type,
      };
    },
);
Actions.name('REQUEST_DEPARTAMENTOS').set(
  type =>
    function requestDepartamentosAction(datos) {
      return {
        type,
        datos : datos.data,
      };
    },
);

Actions.name('GET_DEPARTAMENTOS_PLANTILLAS').set(
  type =>
    function getDepartamentosPlantillasAction(idDepartamento) {
      return {
        type,
        idDepartamento,
      };
    },
);
Actions.name('REQUEST_DEPARTAMENTOS_PLANTILLAS').set(
  type =>
    function requestDepartamentosPlantillasAction(datos) {
      return {
        type,
        datos : datos.data,
      };
    },
);

Actions.name('HANDLE_CHANGE_PLANTILLA').set(
  type =>
    function handleChangePlantillaAction(event) {
      return {
        type,
        event : {
          id: toSafeInteger(event.target.value),
          nombre: event.currentTarget.textContent,
          idPlantilla: event.currentTarget.id.split('_')[1],
        },
      };
    },
);

Actions.name('GET_DEPARTAMENTOS').set(
  type =>
    function getDepartamentosAction() {
      return {
        type,
      };
    },
);
Actions.name('REQUEST_DEPARTAMENTOS').set(
  type =>
    function requestDepartamentosAction(datos) {
      return {
        type,
        datos : datos.data,
      };
    },
);

Actions.name('REQUEST_DEPARTAMENTOS_PLANTILLAS').set(
  type =>
    function requestDepartamentosPlantillasAction(datos) {
      return {
        type,
        datos : datos.data,
      };
    },
);

Actions.name('HANDLE_CHANGE_PLANTILLA').set(
  type =>
    function handleChangePlantillaAction(event) {
      return {
        type,
        event : {
          id: toSafeInteger(event.target.value),
          nombre: event.currentTarget.textContent,
          idPlantilla: event.currentTarget.id.split('_')[1],
        },
      };
    },
);

Actions.name('REQ_TICKETS_COMENTARIOS').set(
  type =>
    function reqTicketsComentariosAction(idTicket) {
      return {
        type,
        idTicket,
      };
    },
);

Actions.name('HANDLE_CHANGE_COMPONENT').set(
  type =>
    function handleChangeComponentAction(index, valor, campoIndex = -1) {
      return {
        type,
        index,
        valor,
        campoIndex,
      };
    },
);

Actions.name('REQ_TICKETS_COMENTARIOS_SUCCESS').set(
  type =>
    function reqTicketsComentariosSuccesAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('HANDLE_SEND_TICKET').set(
  type =>
    function handleSendTicketAction() {
      return {
        type,
      };
    },
);

Actions.name('REQ_TICKETS_COMENTARIOS_FAILED').set(
  type =>
    function reqTicketsComentariosFailedAction(error) {
      return {
        type,
        error,
      };
    },
);

Actions.name('HANDLE_CHANGE_INPUT_FILE').set(
  type =>
    function handleChangeInputFileAction(index, arreglo, formData) {
      return {
        type,
        index,
        arreglo,
        formData,
      };
    },
);

Actions.name('POST_INSERT_TICKETS_COMENTARIOS_SUCCESS').set(
  type =>
    function postInsertTicketsComentariosSuccesAction(data) {
      return {
        type,
        data,
        valuecero: "",
      };
    },
);

Actions.name('POST_INSERT_TICKETS_COMENTARIOS_FAILED').set(
  type =>
    function postInsertTicketsComentariosFailedAction(error) {
      return {
        type,
        error,
      };
    },
);

// ACTUALIZA LA VARIABLE QUE SE ENVIARÁ COMO MENSAJE DEL CHAT
Actions.name('ON_CHANGE_TEXT_FIELD_ESCRIBIR_MENSAJE').set(
  type =>
    function onChangeTextFieldEscribirMensajeAction(event) {
      return {
        type,
        mensaje: event.target.value,
      };
    },
);

Actions.name('SET_TICKETS').set(
  type =>
    function setTickets(data, tipo, ticket) {
      return {
        type,
        data,
        tipo,
        ticket,
      };
    },
);

Actions.name('DISABLED_SEND_TICKET').set(
  type =>
    function disabledSendTicket() {
      return {
        type,
      };
    },
);

Actions.name('DELETE_FILE').set(
  type =>
    function deleteFileaction(id, cIndex) {
      return {
        type,
        id,
        cIndex,
      };
    },
);

Actions.name('DOWNLOAD_TICKET_FILE').set(
  type =>
    // function downloadTicketFileAction(indiceEtapa,fileIndex,indiceComponente, file) {
    //   return {
    //     type,
    //     indiceEtapa,
    //     fileIndex,
    //     indiceComponente,
    //     file,
    //   };
    // },
    function downloadTicketFileAction (fileUrl,nomArchivo){
      return{
        type,
        fileUrl,
        nomArchivo,
      }
    },
    
);

Actions.name('GET_DIFUSIONES').set(
  type =>
    function getDifusionesAction() {
      return {
        type,
      }
    },
);
Actions.name('GET_TICKETS_POR_DEPARTAMENTO').set(
  type =>
    function getTicketsPorDepartamento(idDepartamento) {
      return {
        type,
        idDepartamento,
      };
    },
);

Actions.name('GET_TICKETS').set(
  type =>
    function getTicketsAction(tipo, ticket = []) {
      return {
        type,
        tipo,
        ticket,
      };
    },
);

Actions.name('ASIGNAR_TOTAL_TICKETS_DIFUSIONES').set(
  type =>
    function asignarTotalTicketsDifusionesAction(TotalTickets,TotalDifusiones) {
      return {
        type,
        TotalTickets,
        TotalDifusiones,
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


Actions.name('SET_TICKETS_TABLA').set(
  type =>
    function setTickets(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('SET_TABLA_MOUNTED').set(
  type =>
    function setTablaMounted() {
      return {
        type,
      };
    },
);

Actions.name('SET_COMPONENT_MOUNTED').set(
  type =>
    function setComponentMounted() {
      return {
        type,
      };
    },
);

Actions.name('GET_TICKET_BY_ID').set(
  type =>
    function getTicketByIdAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('SET_TICKET').set(
  type =>
    function setTicketAction(data) {
      return {
        type,
        data,
      };
    },
)

Actions.name('SELECTED_TAB').set(
  type =>
    function selectedTabAction(event) {
      // event.persist();
      return {
        type,
        event,
      };
    },
);

Actions.name('CERRAR_MODAL').set(
  type =>
    function cerrarModalAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_IMAGEN_AVATAR').set(
  type =>
    function getImagenAvatarAction(idUsuario) {
      return {
        type,
        idUsuario,
      }
    },
);

Actions.name('GET_TIME').set(
  type =>
    function getTimeAction() {
      return {
        type,
      };
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

Actions.name('SET_TIME').set(
  type =>
    function seetTimeAction(event) {
      // event.persist();
      return {
        type,
        event,
      };
    },
);

Actions.name('TAB_ETAPAS_SELECT').set(
  type =>
    function tabEtapasSelectAction(event) {
      // event.persist();
      return {
        type,
        event,
      };
    },
);

Actions.name('GET_ETAPAS').set(
  type =>
    function onClickTicketEtapasAction(id) {
      // event.persist();
      return {
        type,
        id,
      };
    },
);

Actions.name('GET_ETAPAS_ESTATUS').set(
  type =>
    function getEtapasEstatusAction(id) {
     
      return {
        type,
        id,
      };
    },
)

Actions.name('SET_INDICE_ETAPA').set(
  type =>
    function setIndiceEtapaAction(event) {
      return {
        type,
        index: event,
      };
    },
);






export default Actions;
