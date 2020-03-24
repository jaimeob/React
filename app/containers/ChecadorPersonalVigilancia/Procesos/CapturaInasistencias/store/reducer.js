/*
 *
 * CapturaInasistencias reducer
 *
 */

import { fromJS } from 'immutable';
import INITIAL_STATE from './state';
import Actions from './actions';

export const initialState = fromJS(INITIAL_STATE);

export const {
  DEFAULT_ACTION,
  REQUEST_GET_COMPANYS_SUCCESS,
  HANDLE_CHANGE_COMPANY,
  REQUEST_GET_PLAZAS_SUCCESS,
  REQUEST_GET_WEEK_SUCCESS,
  HANDLE_CHANGE_ABSENCE,
  HANDLE_PREPARE_FILES,
  HANDLE_DELETE_FILE,
  HANDLE_CLEAN_WINDOWS,
  HANDLE_CLICK_DIALOG_CONFIRM,
  HANDLE_SEARCH_REQUIRED,
} = Actions.getConstants();

function capturaInasistenciasReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case REQUEST_GET_COMPANYS_SUCCESS: {
      const {
        data: {
          data,
        },
      } = action;

      return state
        .setIn([
          'backend',
          'companys',
        ], fromJS(data))
    }
    case HANDLE_CHANGE_COMPANY: {
      const {
        companyId,
        option,
      } = action

      return state
        .setIn([
          'frontend',
          option,
        ], companyId)
        .setIn([
          'frontend',
          'required',
          'companysFill',
        ], true)
    }
    case REQUEST_GET_PLAZAS_SUCCESS: {
      const {
        data:{
          data,
        },
      } = action

      return state
        .setIn([
          'backend',
          'plazas',
        ], fromJS(data))
        .setIn([
          'frontend',
          'required',
          'plazasFill',
        ], true)
    }
    case REQUEST_GET_WEEK_SUCCESS: {
      const {
        data: {
          data,
        },
      } = action

      return state
        .setIn([
          'backend',
          'weekData',
        ], fromJS(data))
    }
    case HANDLE_CHANGE_ABSENCE: {
      const {
        value,
      } = action

      return state
        .setIn([
          'frontend',
          'absence',
        ], value)
        .setIn([
          'frontend',
          'required',
          'absenceFill',
        ], true)
    }
    case HANDLE_PREPARE_FILES: {
      const {
        files,
      } = action

      return state
        .setIn([
          'frontend',
          'filesReady',
        ], files)
        .setIn([
          'frontend',
          'required',
          'filesFill',
        ], true)
    }
    case HANDLE_DELETE_FILE: {
      const {
        index,
      } = action

      const files = state.getIn([
        'frontend',
        'filesReady',
      ])

      const newArray = files.filter((file, i) => i !== index && file)

      return state
        .setIn([
          'frontend',
          'filesReady',
        ], newArray)
    }
    case HANDLE_CLEAN_WINDOWS: {
      return state
        .setIn([
          'frontend',
          'companySelected',
        ], 0)
        .setIn([
          'frontend',
          'plazaSelected',
        ], 0)
        .setIn([
          'frontend',
          'absence',
        ], '')
        .setIn([
          'backend',
          'weekData',
        ], {})
        .setIn([
          'frontend',
          'filesReady',
        ], [])
        .setIn([
          'frontend',
          'required',
          'companysFill',
        ], true)
        .setIn([
          'frontend',
          'required',
          'plazasFill',
        ], true)
        .setIn([
          'frontend',
          'required',
          'absenceFill',
        ], true)
        .setIn([
          'frontend',
          'required',
          'filesFill',
        ], true)
    }
    case HANDLE_CLICK_DIALOG_CONFIRM: {
      const {
        params:{
          nameDialog,
          value,
        },
      } = action;

      return state
        .setIn([
          'frontend',
          nameDialog,
        ], value)
    }
    case HANDLE_SEARCH_REQUIRED: {
      const {
        params:{
          company,
          plaza,
          absence,
          files,
        },
      } = action;

      return state
        .setIn([
          'frontend',
          'required',
          'companysFill',
        ], company)
        .setIn([
          'frontend',
          'required',
          'plazasFill',
        ], plaza)
        .setIn([
          'frontend',
          'required',
          'absenceFill',
        ], absence)
        .setIn([
          'frontend',
          'required',
          'filesFill',
        ], files);
    }
    default:
      return state;
  }
}

export default capturaInasistenciasReducer;
