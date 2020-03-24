/*
 *
 * CapturaInasistencias actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

export const Actions = new ActionsGenerator({
  prefix: 'CHECADORPERSONALVIGILANCIA/PROCESOS/CAPTURAINASISTENCIAS/',
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
  REQUEST_GET_COMPANYS: (type) =>
    function getCompanys() {
      return {
        type,
      };
    },
  REQUEST_GET_COMPANYS_SUCCESS: (type) =>
    function getCompanys(data) {
      return {
        type,
        data,
      };
    },
  HANDLE_CHANGE_COMPANY: (type) =>
    function getCompanys(companyId, option) {
      return {
        type,
        companyId,
        option,
      };
    },
  REQUEST_GET_PLAZAS: (type) =>
    function getPlazas() {
      return {
        type,
      };
    },
  REQUEST_GET_PLAZAS_SUCCESS: (type) =>
    function getPlazas(data) {
      return {
        type,
        data,
      };
    },
  REQUEST_GET_WEEK: (type) =>
    function getPlazas(companyId, plazaId) {
      return {
        type,
        companyId,
        plazaId,
      };
    },
  REQUEST_GET_WEEK_SUCCESS: (type) =>
    function getPlazas(data) {
      return {
        type,
        data,
      };
    },
  HANDLE_CHANGE_ABSENCE: (type) =>
    function changeAbsence(value) {
      return {
        type,
        value,
      };
    },
  HANDLE_PREPARE_FILES: (type) =>
    function prepareFiles(files) {
      return {
        type,
        files,
      };
    },
  HANDLE_DELETE_FILE: (type) =>
    function onDeleteFile(index) {
      return {
        type,
        index,
      };
    },
  HANDLE_CLICK_SAVE: (type) =>
    function onClickSave(data) {
      return {
        type,
        data,
      };
    },
  HANDLE_CLEAN_WINDOWS: (type) =>
    function cleanWindows() {
      return {
        type,
      };
    },
  HANDLE_CLICK_DIALOG_CONFIRM: (type) =>
    function confirmDialog(params) {
      return {
        type,
        params,
      };
    },
  HANDLE_SEARCH_REQUIRED: (type) =>
    function confirmDialog(params) {
      return {
        type,
        params,
      };
    },
}


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
