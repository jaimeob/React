/*
 *
 * PorcentajeDeImpacto actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

export const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINERS/PORCENTAJEDEIMPACTO/',
  subfix: '_ACTION',
});

export const ACTION_KEYS = {
  DEFAUL_ACTION: (type) =>
    function deleteCellSelectOption(index) {
      return {
        type,
        index,
      }
    },
  REQUEST_YEARS_PORCENT_IMPACT: (type) =>
    function getYearsProcentImpact() {
      return {
        type,
      }
    },
  REQUEST_YEARS_PORCENT_IMPACT_SUCCESS: (type) =>
    function fillYears(data) {
      return {
        type,
        data,
      }
    },
  HANDLE_CHANGE_YEAR_PORCENT_IMPACT: (type) =>
    function changeyear(value) {
      return {
        type,
        value,
      }
    },
  REQUEST_PORCENT_IMPACT: (type) =>
    function getYearsProcentImpact(year) {
      return {
        type,
        year,
      }
    },
  REQUEST_PORCENT_IMPACT_SUCCESS: (type) =>
    function putValuePorcentImpact(data) {
      return {
        type,
        data,
      }
    },
  RETURN_PROGRESS: (type) =>
    function returnProgress(rute) {
      return {
        type,
        rute,
      }
    },
  REQUEST_DATA_IMPACT_GENERAL: (type) =>
    function getDataGeneralImpact(year) {
      return {
        type,
        year,
      }
    },
  REQUEST_DATA_IMPACT_GENERAL_SUCCESS: (type) =>
    function getDataImpact(data) {
      return {
        type,
        data,
      }
    },
  HANDLE_CLICK_VIEW_DETAIL: (type) =>
    function selectedFamily(id, name) {
      return {
        type,
        id,
        name,
      }
    },
  REQUEST_DATA_IMPACT_DETAIL: (type) =>
    function getDataDetail(year, id){
      return {
        type,
        year,
        id,
      }
    },
  REQUEST_DATA_IMPACT_DETAIL_SUCCESS: (type) =>
    function fillDataDetail(data){
      return {
        type,
        data,
      }
    },
  HANDLE_CLICK_EXIT_DETAIL: (type) =>
    function exitDetail(id, name) {
      return {
        type,
        id,
        name,
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
  HANDLE_OPEN_MODAL_CONFIRMATION: (type) =>
    function changeTextSearch(status) {
      return {
        type,
        status,
      }
    },
};
Object.keys(ACTION_KEYS).forEach((action) => {
  Actions
    .name(action)
    .set(ACTION_KEYS[action])
});

export default Actions;
