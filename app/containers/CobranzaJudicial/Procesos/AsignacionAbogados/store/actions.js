/*
 *
 * AsignacionAbogados actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

export const Actions = new ActionsGenerator({
  prefix: 'COBRANZAJUDICIAL/PROCESOS/ASIGNACIONABOGADOS/',
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
  REQUEST_GET_YEAR: (type) =>
    function getYear() {
      return {
        type,
      }
    },
  REQUEST_GET_YEAR_SUCCESS: (type) =>
    function updateYear(data) {
      return {
        type,
        data,
      }
    },
  HANDLE_CHANGE_COMPANY: (type) => 
    function onChageCompany(value) {
      return {
        type,
        value,
      };
    },
  REQUEST_GET_DATES: (type) => 
    function getDates(companySelected) {
      return {
        type,
        companySelected,
      };
    },
  REQUEST_GET_DATES_SUCCESS: (type) => 
    function updateComboDates(data) {
      return {
        type,
        data,
      };
    },
  HANDLE_CHANGE_DATE: (type) => 
    function onChageDate(value) {
      return {
        type,
        value,
      };
    },
  HANDLE_CLICK_BUTTON_SEARCH: (type) =>
    function changeStatusActiveSearch() {
      return {
        type,
      }
    },
  HANDLE_CHANGE_TEXT_SEARCH: (type) =>
    function changeTextSearch(text) {
      return {
        type,
        text,
      }
    },
  REQUEST_GET_COMPANYS: (type) =>
    function getCompanys() {
      return {
        type,
      }
    },
  REQUEST_GET_COMPANYS_SUCCESS: (type) =>
    function getCompanys(data) {
      return {
        type,
        data,
      }
    },
  REQUEST_GET_LIST_CLIENTS: (type) =>
    function getListClients(payload) {
      return {
        type,
        payload,
      }
    },
  REQUEST_GET_LIST_CLIENTS_SUCCESS: (type) =>
    function getListClients(data) {
      return {
        type,
        data,
      }
    },
  HANDLE_OPEN_MODAL: (type) =>
    function openModal(open, dialog) {
      return {
        type,
        open,
        dialog,
      }
    },
  HANDLE_CHANGE_TEXT_MODAL: (type) =>
    function getListClients(text, option) {
      return {
        type,
        text,
        option,
      }
    },
  HANDLE_CLICK_LEAVE_DIALOG: (type) =>
    function getListClients(dialog, option) {
      return {
        type,
        dialog,
        option,
      }
    },
  HANDLE_CHANGE_CARTERA: (type) =>
    function onChageCartera(value) {
      return {
        type,
        value,
      }
    },
  HANDLE_CHANGE_LAWYER: (type) =>
    function onChageLawyer(value) {
      return {
        type,
        value,
      }
    },
  HANDLE_CLICK_LEAVE_ASSIGN: (type) =>
    function onChageLawyer() {
      return {
        type,
      }
    },
  REQUEST_GET_LAWYERS: (type) =>
    function getLawyers() {
      return {
        type,
      }
    },
  REQUEST_GET_LAWYERS_SUCCESS: (type) =>
    function fillLawyers(data) {
      return {
        type,
        data,
      }
    },
  REQUEST_GET_TYPES_CARTERAS: (type) =>
    function getTypesCarteras() {
      return {
        type,
      }
    },
  REQUEST_GET_TYPES_CARTERAS_SUCCESS: (type) =>
    function fillTypesCarteras(data) {
      return {
        type,
        data,
      }
    },
  SET_LAYOUT_COLUMNS: (type) =>
    function setLayotColumns(data) {
      return {
        type,
        data,
      }
    },
  SET_CLIENT_SELECTED: (type) =>
    function setClientSelected(clientSelected = 0) {
      return {
        type,
        clientSelected,
      }
    },
  POST_GUARDAR_ASIGNACION: (type) =>
    function postGuardarAsignacion(data) {
      return {
        type,
        data,
      }
    },
  DESACTIVAR_ASIGNACION: (type) =>
    function desactivarAsignacion(data) {
      return {
        type,
        data,
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

