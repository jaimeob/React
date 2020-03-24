/*
 *
 * CatalogoEtapas actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

export const Actions = new ActionsGenerator({
  prefix: 'COBRANZAJUDICIAL/CATALOGOS/CATALOGOETAPAS/',
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
  HANDLE_CHANGE_TYPE_PROCESS: (type) =>
    function changeTypeProcess(value) {
      return {
        type,
        value,
      }
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
  HANDLE_CLICK_BUTTON_NEW: (type) =>
    function clickNew() {
      return {
        type,
      }
    },
  HANDLE_CLICK_LEAVE_NEW: (type) =>
    function clickLeaveNew() {
      return {
        type,
      }
    },
  HANDLE_CLICK_CHECK_TABLE: (type) =>
    function clickCheckTable(rowSelected) {
      return {
        type,
        rowSelected,
      }
    },
  HANDLE_OPEN_DIALOG: (type) =>
    function openDialog(dialog) {
      return {
        type,
        dialog,
      }
    },
  HANDLE_CLICK_LEAVE_DIALOG: (type) =>
    function clickLeaveDialog(dialog) {
      return {
        type,
        dialog,
      }
    },
  REQUEST_GET_TYPE_PROCESS: (type) =>
    function getTypeProcess() {
      return {
        type,
      }
    },
  REQUEST_GET_TYPE_PROCESS_SUCCESS: (type) =>
    function fillDataTypeProcess(data) {
      return {
        type,
        data,
      }
    },
  REQUEST_GET_LIST_ETAPAS: (type) =>
    function getListEtapas(payload) {
      return {
        type,
        payload,
      }
    },
  REQUEST_GET_LIST_ETAPAS_SUCCESS: (type) =>
    function fillDataListEtapas(data) {
      return {
        type,
        data,
      }
    },
  REQUEST_UPDATE_STATUS_ETAPAS: (type) =>
    function updateStatusEtapas(payload) {
      return {
        type,
        payload,
      }
    },
  HANDLE_CLICK_DELETE_ROW: (type) =>
    function onClickDeleteRow(rowSelected) {
      return {
        type,
        rowSelected,
      }
    },
  HANDLE_CHANGE_TEXT_MODAL: (type) =>
    function onChangeValueOption(text,option) {
      return {
        type,
        text,
        option,
      }
    },
  REQUEST_ETAPAS_TYPE_PROCESS: (type) =>
    function getEtapasTypeProcess(payload) {
      return {
        type,
        payload,
      }
    },
  REQUEST_ETAPAS_TYPE_PROCESS_SUCCESS: (type) =>
    function getEtapasTypeProcess(data) {
      return {
        type,
        data,
      }
    },
  HANDLE_CHANGE_COMBO_ETAPA: (type) =>
    function updateEtapaSelected(position) {
      return {
        type,
        position,
      }
    },
  REQUEST_CREATE_ETAPA: (type) =>
    function createEtapa(payload) {
      return {
        type,
        payload,
      }
    },
  HANDLE_CLICK_BUTTON_EDIT: (type) =>
    function clickEdit(rowSelect) {
      return {
        type,
        rowSelect,
      }
    },
  REQUEST_EDIT_ETAPA: (type) =>
    function createEtapa(payload) {
      return {
        type,
        payload,
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
