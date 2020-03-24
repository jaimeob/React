/*
 *
 * PorcentajeMontoNegociado reducer
 *
 */

import { fromJS, List } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import STATE from './state';
import ACTIONS from './actions';
export const initialState = fromJS(STATE);

const {
  CHANGE_SPINNER,
  DEFAULT_STATE,
  SET_PLAZAS,
  SET_PLAZA_SELECTED,
  SET_FAMILYS,
  SET_FAMILY_SELECTED,
  SET_NEGOTIATED_AMOUNT,
  RESET_NEGOTIATED_AMOUNT,
} = ACTIONS.getConstants()

function porcentajeMontoNegociadoReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SPINNER: {
      return state
        .setIn([
          'frontend',
          'ui',
          'spinner',
        ], action.status)
    }
    case DEFAULT_STATE: {
      return state
        .setIn([
          'frontend',
          'ui',
        ], action.ini)
    }
    case SET_PLAZAS: {
      return state
        .setIn([
          'backend',
          'datasources',
          'plazas',
        ], action.data)
    }
    case SET_PLAZA_SELECTED: {
      return state
        .setIn([
          'frontend',
          'ui',
          'plazaSelected',
        ], action.plazaSelected)
    }
    case SET_FAMILYS: {
      return state
        .setIn([
          'backend',
          'datasources',
          'familys',
        ], action.data)
    }
    case SET_FAMILY_SELECTED: {
      return state
        .setIn([
          'frontend',
          'ui',
          'familySelected',
        ], action.familySelected)
    }
    case SET_NEGOTIATED_AMOUNT: {
      return state
        .setIn([
          'backend',
          'datasources',
          'negotiatedAmounts',
        ], fromJS(action.data))
    }
    case RESET_NEGOTIATED_AMOUNT: {
      return state
        .setIn([
          'backend',
          'datasources',
          'negotiatedAmounts',
          'Rows',
        ], List(action.ListNegotiatedAmount))
    }
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default porcentajeMontoNegociadoReducer;
