/*
 *
 * CargaCarteraFovisste actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

export const Actions = new ActionsGenerator({
  prefix: 'COMERCIAL/PROCESOS/CARGACARTERAFOVISSTE/',
  subfix: '_ACTION',
});

export const ACTION_KEYS = {
  INITIAL_CONFIGURATION: (type) =>
    function initialConfiguration() {
      return {
        type,
      };
    },
  GET_CURRENT_DATE: (type) =>
    function getCurrentDate(data = {}) {
      return {
        type,
        data,
      };
    },
  GET_WEEKS_MONTHS: (type) =>
    function getWeeksMonths({year= -1, periodicity = 'M', period = -1}) {
      return {
        type,
        year,
        periodicity,
        period,
      };
    },
  SET_PERIODICITY: (type) =>
    function setPeriodicity(periodicity = 'M') {
      return {
        type,
        periodicity,
      };
    },
  GET_PLAZAS_USER: (type) =>
    function getPlazasUser(IdPlaza = -1) {
      return {
        type,
        IdPlaza,
      };
    },
  GET_LIST_GENERAL: (type) =>
    function getListGeneral(tipoCargaId = 0) {
      return {
        type,
        tipoCargaId,
      };
    },
  GET_BASE_LAYOUT: (type) =>
    function getBaseLayout(tipoCargaId = 0) {
      return {
        type,
        tipoCargaId,
      };
    },
  SET_PLAZAS: (type) =>
    function setPlazas(arrPlazas = []) {
      return {
        type,
        arrPlazas,
      };
    },
  SET_CURRENT_DATE: (type) =>
    function setCurrentDate(currentDate = {year: 1990, week: 90}) {
      return {
        type,
        currentDate,
      };
    },
  SET_WEEKS_MONTHS: (type) =>
    function setWeeksMonths(weeks = [], months = []) {
      return {
        type,
        weeks,
        months,
      };
    },
  SET_SELECTED_PLAZA: (type) =>
    function setSelectedPlaza(selectedPlaza = 0) {
      return {
        type,
        selectedPlaza,
      };
    },
  SET_SELECTED_WEEK: (type) =>
    function setSelectedWeek(selectedWeek = 0) {
      return {
        type,
        selectedWeek,
      };
    },
  SET_SELECTED_MONTH: (type) =>
    function setSelectedWeek(selectedMonth = 0) {
      return {
        type,
        selectedMonth,
      };
    },
  SET_MODAL_CONTENT_LAYOUT: (type) =>
    function setModalContentLayout(modalContentLayout = false) {
      return {
        type,
        modalContentLayout,
      };
    },
  SET_MODAL_LOAD_DETAILS: (type) =>
    function handleModalLoadDetails(modalLoadDetails = false) {
      return {
        type,
        modalLoadDetails,
      };
    },
  SET_LIST_GENERAL: (type) =>
    function setListGeneral(listGeneral = []) {
      return {
        type,
        listGeneral,
      };
    },
  SET_BASE_LOAD: (type) =>
    function setBaseLoad(
      layoutContent = {
        data: [],
        layoutName: "Descarga",
        typeLoadId: 0,
      }) {
      return {
        type,
        layoutContent,
      };
    },
  SET_TYPE_LOAD: (type) =>
    function setTypeLoad(currentTypeLoad = 0) {
      return {
        type,
        currentTypeLoad,
      };
    },
  SET_ICON_VIEW_EXPLOTION: (type) =>
    function fileDoc(iconViewExplotion = false) {
      return {
        type,
        iconViewExplotion,
      };
    },
  SET_FILE_LOAD:  (type) =>
    function setFileLoad(data) {
      return {
        type,
        data,
      };
    },
  VALIDATED_FILE: (type) =>
    function validatedFile(data) {
      return {
        type,
        data,
      };
    },
  SET_MODAL_CARGA_BASE: (type) =>
    function setModalCargaBase(modalCargaBase = false) {
      return {
        type,
        modalCargaBase,
      };
    },
  SET_LOADED_INDICATORS: (type) =>
    function setModalCargaBase(tipoCargaId = 0, empresaId = -1, params = {}) {
      return {
        type,
        tipoCargaId,
        empresaId,
        params,
      };
    },
  DEFAULT_CONFIGURATION: (type) =>
    function DefaultConfiguration(validatedFile, fileLoad, selectedMonth, iconViewExplotion) {
      return {
        type,
        validatedFile,
        fileLoad,
        selectedMonth,
        iconViewExplotion,
      };
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
