/*
 *
 * ConfiguracionEbitda reducer
 *
 */

import { fromJS, List } from 'immutable';
import STATE from './state';
import Actions from './actions';

export const initialState = fromJS(STATE);

export const {
  DEFAULT_ACTION,
  SET_EBITDAS,
  HANDLE_CLICK_BUTTON_SEARCH,
  HANDLE_CHANGE_TEXT_SEARCH,
  REQUEST_GET_LIST_EBITDAS_SUCCESS,
  HANDLE_CLICK_CHECK_TABLE,
  HANDLE_CLICK_DELETE_ROW,
  HANDLE_OPEN_DIALOG,
  HANDLE_CLICK_LEAVE_DIALOG,
  SET_STEPPER,
  SET_PLAZAS,
  SET_PERIOD,
  SET_PROFITABILITY,
  SET_ERROR,
  SET_EBITDA_DETAIL,
  SET_PERMISOS,
  SET_MENU_FILTER_INDEX,
  SET_CHANGE_WITH_BUTTON,
} = Actions.getConstants();

function configuracionEbitdaReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION: {
      return state;
    }
    case SET_EBITDAS: {
      return state.setIn([
        'configuracionEbitda',
        'backend',
        'datasources',
        'rows',
      ], List(action.rows))
        /*
        .setIn([
          'frontend',
          'menuFilterIndex',
        ], newIndex)
        */
        .setIn([
          'changeWithButton',
        ], false)
        .setIn([
          'showDialogDelete',
        ], false)
        .setIn([
          'configuracionEbitda',
          'frontend',
          'ui',
          'rowSelected',
        ], [])
    }
    case HANDLE_CLICK_BUTTON_SEARCH: {
      const value = !state.getIn([
        'configuracionEbitda',
        'frontend',
        'ui',
        'activeSearch',
      ]);
      
      return state.setIn([
        'configuracionEbitda',
        'frontend',
        'ui',
        'activeSearch',
      ], value)
        .setIn([
          'configuracionEbitda',
          'frontend',
          'ui',
          'searchText',
        ], '')
    }
    case HANDLE_CHANGE_TEXT_SEARCH: {
      return state
        .setIn([
          'configuracionEbitda',
          'frontend',
          'ui',
          'searchText',
        ], action.searchText);
    }
    case HANDLE_CLICK_CHECK_TABLE: {
      return state
        .setIn([
          'configuracionEbitda',
          'frontend',
          'ui',
          'rowSelected',
        ], action.rowSelected)
    }
    case HANDLE_CLICK_DELETE_ROW: {
      return state
        .setIn([
          'configuracionEbitda',
          'frontend',
          'ui',
          'rowSelectedButton',
        ], action.rowSelected)
        .setIn([
          'changeWithButton',
        ], true)
    }
    case HANDLE_OPEN_DIALOG: {
      const {
        dialog,
      } = action;

      const value = !state.getIn([
        dialog,
      ])

      return state
        .setIn([
          dialog,
        ], value)
    }
    case HANDLE_CLICK_LEAVE_DIALOG: {
      const {
        dialog,
      } = action;

      return state
        .setIn([
          dialog,
        ], false)
        .setIn([
          'changeWithButton',
        ], false)
    }
    case SET_STEPPER: {
      return state.setIn([
        'stepper',
      ], action.stepper);
    }
    case SET_PLAZAS: {
      return state.setIn([
        'registrarEbitda',
        'backend',
        'datasources',
        'plazas',
      ], List(action.plazas))
    }
    case SET_PERIOD: {
      return state.setIn([
        'registrarEbitda',
        'frontend',
        'ebitda',
        'period',
      ], action.period)
    }
    case SET_PROFITABILITY: {
      const plazas = state.getIn([
        'registrarEbitda',
        'backend',
        'datasources',
        'plazas',
      ]).toJS();

      const plazasConEbitda = plazas.filter(plaza => plaza.Ebitda > 0 && plaza.EbitdaPlaneado > 0);
      const plaza = plazas[action.index];

      if(action.ebitdaType === 'plannedEbitda'){
        plaza.EbitdaPlaneado = parseFloat(action.profitability).toFixed(2);
      } else {
        plaza.Ebitda = parseFloat(action.profitability).toFixed(2);
      }

      if(plazasConEbitda.length === plazas.length){
        return state.setIn([
          'registrarEbitda',
          'backend',
          'datasources',
          'plazas',
          action.index,
        ], fromJS(plaza))
      }

      return state.setIn([
        'registrarEbitda',
        'backend',
        'datasources',
        'plazas',
        action.index,
      ], fromJS(plaza));
    }
    case SET_ERROR: {
      return state.updateIn([
        'registrarEbitda',
        'frontend',
        'errors',
        action.input,
      ], stt => stt.merge({
        error: action.error,
        message: action.message,
      }))
    }
    case SET_EBITDA_DETAIL: {
      return state.setIn(
        ['registrarEbitda',
          'frontend',
          'ebitda',
        ], fromJS(action.ebitda)
      )
    }
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case SET_MENU_FILTER_INDEX: {
      return state.setIn([
        'configuracionEbitda',
        'frontend',
        'ui',
        'menuFilterIndex',
      ], action.menuFilterIndex)
    }
    default:
      return state;
  }
}

export default configuracionEbitdaReducer;
