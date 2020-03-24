/*
 *
 * PorcentajeMontoNegociado actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

export const Actions = new ActionsGenerator({
  prefix: 'NEGOCIACIONES/REPORTES/PORCENTAJEMONTONEGOCIADO/',
  subfix: '_ACTION',
});

export const ACTION_KEYS = {
  CHANGE_SPINNER: (type) => 
    function changeSpinner(status = false){
      return {
        type,
        status,
      }
    },
  GET_PLAZAS: (type) => 
    function getPlazas(IdPlaza = -1) {
      return {
        type,
        IdPlaza,
      };
    },
  GET_FAMILYS: (type) => 
    function getFamilys(state = '') {
      return {
        type,
        state,
      };
    },
  GET_NEGOTIATED_AMOUNT: (type) =>
    function getNegotiatedAmount(PlazaId = -1, FamiliaId = -1) {
      return {
        type, 
        PlazaId, 
        FamiliaId,
      }
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
  SET_FAMILYS: (type) => 
    function setFamilys(Familys = []) {
      return {
        type,
        Familys,
      };
    },
  SET_FAMILY_SELECTED: (type) => 
    function setFamilySelected(familySelected = 0) {
      return {
        type,
        familySelected,
      };
    },
  SET_NEGOTIATED_AMOUNT: (type) => 
    function setNegotiatedAmount(ListNegotiatedAmount = []) {
      return {
        type,
        ListNegotiatedAmount,
      };
    },
  RESET_NEGOTIATED_AMOUNT: (type) => 
    function resetNegotiatedAmount(ListNegotiatedAmount = []) {
      return {
        type,
        ListNegotiatedAmount,
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