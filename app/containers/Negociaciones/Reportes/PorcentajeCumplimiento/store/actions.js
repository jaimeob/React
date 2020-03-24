/*
 *
 * PorcentajeCumplimiento actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

export const Actions = new ActionsGenerator({
  prefix: 'NEGOCIACIONES/REPORTES/PORCENTAJECUMPLIMIENTO/',
  subfix: '_ACTION',
});

export const ACTION_KEYS = {
  GET_COMPLIANCE_PERCENTAGE:(type) => 
    function getCompliancePercentage(IdPlaza = -1, InitialDate = '1990-01-01', FinalDate = '1990-01-01'){
      return {
        type,
        IdPlaza,
        InitialDate,
        FinalDate,
      };
    },
  SET_COMPLIANCE_PERCENTAGE:(type) =>
    function setCompliancePercentage(compliancePercentage){
      return {
        type,
        compliancePercentage,
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
  SET_PLAZA_SELECTED: (type) => 
    function setPlazaSelected(plazaSelected = 0) {
      return {
        type,
        plazaSelected,
      };
    },
  RESET_COMPLIANCE_PERCENTAGE: (type) => 
    function resetCompliancePercentage(ListCompliancePercentage = []) {
      return {
        type,
        ListCompliancePercentage,
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
  SET_END_DATE: (type) =>
    function setEndDate(data) {
      return {
        type,
        data,
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
