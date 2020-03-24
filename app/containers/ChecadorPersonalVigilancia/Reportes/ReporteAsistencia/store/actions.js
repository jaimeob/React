/*
 *
 * ReporteAsistencia actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

export const Actions = new ActionsGenerator({
  prefix: 'CPV/RPT/RPTASISTENCIA/',
  subfix: '_ACTION',
});

export const ACTION_KEYS = {
  GET_COMPANYS: (type) =>
    function getCompanys(data) {
      return {
        type,
        data,
      };
    },
  SET_COMPANYS: (type) =>
    function setCompanys(companys = []) {
      return {
        type,
        companys,
      };
    },
  SET_SELECTED_COMPANY: (type) =>
    function setSelectedCompany(selectedCompany = -1) {
      return {
        type,
        selectedCompany,
      };
    },
  GET_CURRENT_DATE: (type) =>
    function getCurrentDate(data) {
      return {
        type,
        data,
      };
    },
  SET_CURRENT_DATE: (type) =>
    function setCurrentDate(currentDate = {year: 1990, week: 90}) {
      return {
        type,
        currentDate,
      };
    },
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
    function setSelectedPlaza(selectedPlaza = -1) {
      return {
        type,
        selectedPlaza,
      };
    },
  SET_FOCUSED_INPUT:  (type) =>
    function setFocusedInput(data) {
      return {
        type,
        data,
      };
    },
  SET_START_DATE: (type) =>
    function setStartDate(data) {
      return {
        type,
        data,
      };
    },
  SET_CONCENTRATED_STATUS: (type) =>
    function setConcentratedState(status = false) {
      return {
        type,
        status,
      };
    },
  SET_END_DATE: (type) =>
    function setEndDate(data) {
      return {
        type,
        data,
      };
    },
  GET_ATTENDANCE: (type) =>
    function getAttendance(
      selectedCompany = -1,
      selectedPlaza = -1,
      concentrated = 0,
      startDate = '01/01/1990',
      endDate = '01/01/1990',
    ) {
      return {
        type,
        selectedCompany,
        selectedPlaza,
        concentrated,
        startDate,
        endDate,
      };
    },
  SET_ATTENDANCE: (type) =>
    function setAttendance(arrAttendance = []) {
      return {
        type,
        arrAttendance,
      };
    },
  SET_SELECTED_ATTENDANCE: (type) =>
    function setSelectedAttendance(attend = 0) {
      return {
        type,
        attend,
      };
    },
  SET_SELECTED_ALL: (type) =>
    function setSelectedAll( val = false) {
      return {
        type,
        val,
      };
    },
  SET_ROWS_CHECKED: (type) =>
    function setRowsChecked(rowsChecked = {}) {
      return {
        type,
        rowsChecked,
      };
    },
  SET_SELECTED_ROW: (type) =>
    function setSelectedRow(selectedRow = 0) {
      return {
        type,
        selectedRow,
      };
    },
  SET_EMPTY_ATTENDANCE: (type) =>
    function setEmptyAttendance(attendance = []) {
      return {
        type,
        attendance,
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
