/*
 *
 * NecesidadPorMes reducer
 *
 */

import { fromJS, List } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import STATE from './state';
import ACTIONS from './actions';
export const initialState = fromJS(STATE);

const {
  SET_COMPANYS,
  SET_COMPANY_SELECTED,
  SET_CURRENT_DATE,
  SET_WEEKS_RETAIL,
  SET_WEEK_SELECTED,
  SET_PLAZAS,
  SET_SELECTED_PLAZA,
  SET_LIST_NEEDS,
  SET_YEARS_NEEDS,
  SET_YEAR_SELECTED,
  SET_NEED_PLAZA_SELECTED,
  SET_POOL_DATA,
  SET_TYPE_NEED_SELECTED,
  CHANGE_STEP,
  CHANGE_NEED,
  CHANGE_REASON,
  CHANGE_STATUS_SPECIAL_SERVICE,
  CHANGE_NEED_SPECIAL_SERVICE,
  CHANGE_STATUS_MODAL,
  CHANGE_STATUS_MODAL_REASON_CHANGE,
} = ACTIONS.getConstants()

function necesidadPorMesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMPANYS: {
      return state
        .setIn([
          'backend',
          'datasources',
          'companys',
        ], fromJS(action.companys))
    }
    case SET_COMPANY_SELECTED: {
      return state
        .setIn([
          'frontend',
          'ui',
          'selectedCompany',
        ], fromJS(action.selectedCompany));
    }
    case SET_CURRENT_DATE: {
      return state
        .setIn([
          'backend',
          'datasources',
          'currentDate',
        ], fromJS(action.data))
    }
    case SET_WEEKS_RETAIL: {
      return state
        .setIn([
          'backend',
          'datasources',
          'weeksRetail',
        ], List(action.data))
    }
    case SET_WEEK_SELECTED: {
      return state
        .setIn([
          'frontend',
          'ui',
          'selectedWeek',
        ], fromJS(action.selectedWeek))
    }
    case SET_PLAZAS: {
      return state
        .setIn([
          'backend',
          'datasources',
          'plazas',
        ], List(action.data))
    }
    case SET_SELECTED_PLAZA: {
      return state
        .setIn([
          'frontend',
          'ui',
          'selectedPlaza',
        ], fromJS(action.selectedPlaza))
    }
    case SET_LIST_NEEDS: {
      return state
        .setIn([
          'backend',
          'datasources',
          'needs',
        ], List(action.listNeeds))
    }
    case SET_YEARS_NEEDS: {
      return state
        .setIn([
          'backend',
          'datasources',
          'years',
        ], List(action.years))
    }
    case SET_YEAR_SELECTED: {
      return state
        .setIn([
          'frontend',
          'ui',
          'selectedYear',
        ], fromJS(action.selectedYear))
    }
    case SET_NEED_PLAZA_SELECTED: {
      return state
        .setIn([
          'frontend',
          'needPlazaSelected',
        ], fromJS(action.needPlazaSelected))
    }
    case SET_POOL_DATA: {
      return state
        .setIn([
          'frontend',
          'poolData',
        ], fromJS(action.poolData))
    }
    case SET_TYPE_NEED_SELECTED: {
      return state
        .setIn([
          'frontend',
          'ui',
          'typeNeedSelected',
        ], fromJS(action.typeNeedSelected))
    }
    case CHANGE_STEP: {
      return state
        .setIn([
          'frontend',
          'steps',
        ], fromJS(action.steps))
    }
    case CHANGE_NEED: {
      return state
        .setIn([
          'frontend',
          'needPlazaSelected',
          'necesidad',
        ], fromJS(action.need))
    }
    case CHANGE_REASON: {
      return state
        .setIn([
          'frontend',
          'needPlazaSelected',
          'motivoEdita',
        ], fromJS(action.reason))
    }
    case CHANGE_STATUS_SPECIAL_SERVICE: {
      return state
        .setIn([
          'frontend',
          'needPlazaSelected',
          'especial',
        ], fromJS(action.need))
        .setIn([
          'frontend',
          'needPlazaSelected',
          'especialActivo',
        ], fromJS(action.specialActive))
    }
    case CHANGE_NEED_SPECIAL_SERVICE: {
      return state
        .setIn([
          'frontend',
          'needPlazaSelected',
          'especial',
        ], fromJS(action.need))
    }
    case CHANGE_STATUS_MODAL: {
      return state
        .setIn([
          'frontend',
          'ui',
          'modal',
        ], fromJS(action.status))
    }
    case CHANGE_STATUS_MODAL_REASON_CHANGE: {
      return state
        .setIn([
          'frontend',
          'ui',
          'modalReasonChange',
        ], fromJS(action.status))
    }
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default necesidadPorMesReducer;
