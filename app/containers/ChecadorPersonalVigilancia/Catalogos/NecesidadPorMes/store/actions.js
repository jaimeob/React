/*
 *
 * NecesidadPorMes actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

export const Actions = new ActionsGenerator({
  prefix: 'CPV/CTLG/NECESIDADMES/',
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
  SET_COMPANY_SELECTED: (type) => 
    function setCompanySelected(selectedCompany = 0) {
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
  GET_LIST_NEEDS: (type) => 
    function getListNeed( idCompany=0, year = 1990, ) {
      return {
        type,
        idCompany,
        year,
      };
    },
  SET_LIST_NEEDS: (type) => 
    function setListNeed(listNeed = []) {
      return {
        type,
        listNeed,
      };
    },
  GET_YEARS_NEEDS: (type) => 
    function getYearsNeeds() {
      return {
        type,
      };
    },
  SET_YEARS_NEEDS: (type) => 
    function setYearsNeeds(listYears = []) {
      return {
        type,
        listYears,
      };
    },
  SET_YEAR_SELECTED: (type) => 
    function setYearSelected(selectedYear = 2019) {
      return {
        type,
        selectedYear,
      };
    },
  SET_NEED_PLAZA_SELECTED: (type) => 
    function setNeedPlazaSelected(
      needPlazaSelected = {
        IdPlaza:0,
        Nombre:'',
        IdMes:0,
        NombreMes:'',
        Meses: {},
        necesidad:0,
        especialActivo:0,
        especial:0,
        motivoEdita:"",
      }
    ) {
      return {
        type,
        needPlazaSelected,
      };
    },
  SET_POOL_DATA: (type) => 
    function setPoolData(poolData = {}){
      return {
        type,
        poolData,
      };
    },
  SET_TYPE_NEED_SELECTED: (type) => 
    function setTypeNeedSelected(typeNeedSelected = 0) {
      return {
        type,
        typeNeedSelected,
      };
    },
  CHANGE_STEP: (type) => 
    function chageStep(steps = {last: 0, current: 0}) {
      return {
        type,
        steps,
      };
    },
  CHANGE_NEED: (type) => 
    function chageNeed(need = 0) {
      return {
        type,
        need,
      };
    },
  CHANGE_REASON: (type) => 
    function chageReason(reason = '') {
      return {
        type,
        reason,
      };
    },
  CHANGE_STATUS_SPECIAL_SERVICE: (type) => 
    function changeStatusSpecialService(need = 0, specialActive=0) {
      return {
        type,
        need,
        specialActive,
      };
    },
  CHANGE_NEED_SPECIAL_SERVICE: (type) => 
    function changeNeedSpecialService( need = 0 ) {
      return {
        type,
        need,
      };
    },
  CHANGE_STATUS_MODAL: (type) => 
    function changeStatusModal( status = false ) {
      return {
        type,
        status,
      };
    },
  CHANGE_STATUS_MODAL_REASON_CHANGE: (type) => 
    function changeStatusModalReasonModal( status = false ) {
      return {
        type,
        status,
      };
    },
  SAVE_NEW_NEED: (type) => 
    function saveNewNeed(typeNeedSelected=0, newNeed={}) {
      return {
        type,
        typeNeedSelected,
        newNeed,
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