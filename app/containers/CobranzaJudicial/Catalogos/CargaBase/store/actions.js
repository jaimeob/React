/*
 *
 * CargaBase actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

export const Actions = new ActionsGenerator({
  prefix: 'COBRANZAJUDICIAL/CATALOGOS/CARGABASE/',
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
  GET_WEEKS_RETAIL: (type) => 
    function getWeeksRetail(data) {
      return {
        type,
        data,
      };
    },
  SET_WEEKS_RETAIL: (type) => 
    function setWeeksRetail(weeksRetail = []) {
      return {
        type,
        weeksRetail,
      };
    },
  SET_WEEK_SELECTED: (type) => 
    function setWeekSelected(selectedWeek = 0) {
      return {
        type,
        selectedWeek,
      };
    },
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
  SET_COMPANY_SELECTED: (type) => 
    function setCompanySelected(selectedCompany = 0) {
      return {
        type,
        selectedCompany,
      };
    },
  SET_MODAL_CONTENT_LAYOUT: (type) => 
    function setModalContentLayout(modalContentLayout = false) {
      return {
        type,
        modalContentLayout,
      };
    },
  SET_COMPANY_LAYOUT: (type) => 
    function setCompanyLayout(companyLayout = []) {
      return {
        type,
        companyLayout,
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
  POST_FILE: (type) => 
    function postFile(data) {
      return {
        type,
        data,
      };
    },
  SET_COLUMNS_REQUIRED: (type) => 
    function setColumnsRequired(columsRequired = []) {
      return {
        type,
        columsRequired,
      };
    },
  SET_MODAL_CARGA_BASE: (type) => 
    function setModalCargaBase(modalCargaBase = false) {
      return {
        type,
        modalCargaBase,
      };
    },
  GET_LISTADO_MES: (type) => 
    function getListadoMes(selectedCompany = 0) {
      return {
        type,
        selectedCompany,
      };
    },
  SET_LISTADO_MES: (type) => 
    function setListadoMes(data = []) {
      return {
        type,
        data,
      };
    },
  GET_EXPORTAR_EXCEL: (type) => 
    function getExportarExcel(data) {
      return {
        type,
        data,
      };
    },
  OBTENER_PERMISOS: (type) => 
    function obtenerPermisos() {
      return {
        type,
      };
    },
  SET_PERMISOS: (type) => 
    function setPermisos(payload) {
      return {
        type,
        payload,
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
