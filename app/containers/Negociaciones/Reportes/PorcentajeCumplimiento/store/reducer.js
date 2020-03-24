/*
 *
 * PorcentajeCumplimiento reducer
 *
 */

import { fromJS, List } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import STATE from './state';
import ACTIONS from './actions';
export const initialState = fromJS(STATE);

const { 
  SET_COMPLIANCE_PERCENTAGE,
  SET_PLAZAS,
  SET_PLAZA_SELECTED,
  RESET_COMPLIANCE_PERCENTAGE,
  SET_FOCUSED_INPUT,
  SET_START_DATE,
  SET_END_DATE,
} = ACTIONS.getConstants()

function porcentajeCumplimientoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMPLIANCE_PERCENTAGE: {
      return state
        .setIn([
          'backend',
          'datasources',
          'compliancePercentage',
        ], fromJS(action.data))
    }
    case SET_PLAZAS: {
      return state
        .setIn([
          'backend',
          'datasources',
          'plazas',
        ], fromJS(action.data))
    }
    case SET_PLAZA_SELECTED: {
      return state
        .setIn([
          'frontend',
          'ui',
          'plazaSelected',
        ], fromJS(action.plazaSelected))
    }
    case RESET_COMPLIANCE_PERCENTAGE: {
      return state
        .setIn([
          'backend',
          'datasources',
          'compliancePercentage',
          'Rows',
        ], List(action.ListCompliancePercentage))
    }
    case SET_FOCUSED_INPUT: {
      return state
        .setIn([
          'frontend',
          'ui',
          'focusedInput',
        ], fromJS(action.data))
    }
    case SET_START_DATE: {
      return state
        .setIn([
          'frontend',
          'ui',
          'startDate',
        ], fromJS(action.data))
    }
    case SET_END_DATE: {
      return state
        .setIn([
          'frontend',
          'ui',
          'endDate',
        ], fromJS(action.data))
    }
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default porcentajeCumplimientoReducer;
