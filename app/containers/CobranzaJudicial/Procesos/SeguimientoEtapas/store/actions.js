/*
 *
 * SeguimientoEtapas actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

export const Actions = new ActionsGenerator({
  prefix: 'COBRANZAJUDICIAL/PROCESOS/SEGUIMIENTOETAPAS/',
  subfix: '_ACTION',
});

export const ACTION_KEYS = {
  GET_PLAZAS: (type) => 
    function getPlazas(IdPlaza = -1) {
      return {
        type,
        IdPlaza,
      };
    },
  SET_PLAZAS: (type) => 
    function setPlazas(arrPlazas = []) {
      return {
        type,
        arrPlazas,
      };
    },
  SET_SELECTED_PLAZA: (type) => 
    function setSelectedPlaza(selectedPlaza = 0) {
      return {
        type,
        selectedPlaza,
      };
    },
  SET_STEPPER: (type) => 
    function setStepper(stepper = 0) {
      return {
        type,
        stepper,
      };
    },
  SET_CLIENTE: (type) =>
    function setCliente(data){
      return {
        type,
        data,
      }
    },
  SET_SHOW_MODAL_ETAPA: (type) =>
    function setShowModalEtapa(){
      return {
        type,
      }
    },
  SET_SHOW_MODAL_FINALIZAR_ETAPA: (type) =>
    function setShowModalFinalizarEtapa(){
      return {
        type,
      }
    },
  HANDLE_CHANGE_ARCHIVO: (type) =>
    function handleChangeArchivoAction(input, formData) {
      return {
        type,
        input,
        formData,
      };
    }, 
  GET_CLIENTES_SEGUIMIENTO: (type) =>
    function getClientesSeguimientoAction(idEmpresa, idUsuario) {
      return {
        type,
        idEmpresa,
        idUsuario,
      };
    },
  SET_CLIENTES_SEGUIMIENTO: (type) =>
    function setClientesSeguimientoAction(data) {
      return {
        type,
        data,
      };
    },
  SET_FILTER_CLIENTES_SEGUIMIENTO: (type) =>
    function setFilterClientesSeguimientoAction(data) {
      return {
        type,
        data,
      };
    },
  SET_SHOW_SEARCH_TEXT_FIELD: (type) => 
    function setShowSearchTextField(){
      return {
        type,
      }
    },
  SET_SEARCH_TEXT_FIELD: (type) =>
    function setSearchTextField(searchTextField){
      return {
        type,
        searchTextField,
      }
    },
  SET_SHOW_FILTERS: (type) => 
    function setShowFilters(){
      return {
        type,
      }
    },
  SET_FOCUSED_INPUT: (type) => 
    function setFocusedInput(focusedInput){
      return {
        type,
        focusedInput,
      }
    },
  GET_ETAPAS_SEGUIMIENTO: (type) =>
    function getEtapasSeguimiento(empresaId, clienteId) {
      return {
        type,
        empresaId, 
        clienteId,
      };
    },
  SET_ETAPAS_SEGUIMIENTO: (type) =>
    function setEtapasSeguimiento(data) {
      return {
        type,
        data,
      };
    },
  GUARDAR_SEGUIMIENTO_CLIENTE: (type) =>
    function guardarSeguimientoCliente(data) {
      return {
        type,
        data,
      };
    },
  ON_CHANGE_INPUT: (type) =>
    function onChangeInput(input, value) {
      return {
        type,
        input,
        value,
      };
    },
  ON_CHANGE_SELECTED_ETAPA: (type) =>
    function onChangeSelectedEtapa(selectedEtapa = 0) {
      return {
        type,
        selectedEtapa,
      };
    },
  DOWNLOAD_FILES: (type) =>
    function downloadFiles(clienteId, selectedEmpresa) {
      return {
        type,
        clienteId,
        selectedEmpresa,
      };
    },
  ON_CHANGE_DATES: (type) =>
    function onChangeDates(startDate, endDate) {
      return {
        type,
        startDate, 
        endDate,
      };
    },
  SET_SELECTED: (type) =>
    function setSelected(selected = []) {
      return {
        type,
        selected,
      };
    },
  SET_ROWS_PER_PAGE: (type) =>
    function setRowsPerPage(rowsPerPage) {
      return {
        type,
        rowsPerPage,
      };
    },
  SET_PAGE: (type) =>
    function setPage(page){
      return {
        type,
        page,
      }
    },
  OBTENER_PERMISOS: (type) =>
    function obtenerPermisos() {
      return {
        type,
      }
    },
  SET_PERMISOS: (type) =>
    function setPermisos(payload) {
      return {
        type,
        payload,
      }
    },
  
};

Object.keys(ACTION_KEYS).forEach((action) => {
  Actions
    .name(action)
    .set(ACTION_KEYS[action])
});

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export default Actions;

