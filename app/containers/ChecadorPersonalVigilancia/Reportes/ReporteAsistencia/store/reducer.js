/*
 *
 * ReporteAsistencia reducer
 *
 */

import { fromJS, List } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import STATE from './state';
import ACTIONS from './actions';
export const initialState = fromJS(STATE);

const {
  SET_COMPANYS,
  SET_SELECTED_COMPANY,
  SET_CURRENT_DATE,
  SET_PLAZAS,
  SET_SELECTED_PLAZA,
  SET_FOCUSED_INPUT,
  SET_START_DATE,
  SET_END_DATE,
  SET_SELECTED_ROW,
  SET_CONCENTRATED_STATUS,
  SET_ATTENDANCE,
  SET_SELECTED_ATTENDANCE,
  SET_SELECTED_ALL,
  SET_ROWS_CHECKED,
  SET_EMPTY_ATTENDANCE,
  SET_ARCHIVE_ZIP,
} = ACTIONS.getConstants()

function reporteAsistenciaReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMPANYS: {
      return state
        .setIn([
          'backend',
          'companys',
        ], fromJS(action.companys))
    }
    case SET_SELECTED_COMPANY: {
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
          'currentDate',
        ], fromJS(action.data))
    }
    case SET_PLAZAS: {
      return state
        .setIn([
          'backend',
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
    case SET_ATTENDANCE: {
      return state
        .setIn([
          'backend',
          'attendance',
        ], fromJS(action.arrAttendance))
    }
    case SET_SELECTED_ATTENDANCE: {
      const arrAttend = state.getIn(['backend','attendance']).toJS()
      const idxAttend = arrAttend.findIndex( val => val.Id === action.attend)
      const valueOld = state.getIn(['backend','attendance',idxAttend, 'Selected'])
      return state
        .setIn([
          'backend',
          'attendance',
          `${idxAttend}`,
          'Selected',
        ], fromJS(!valueOld))
    }
    case SET_SELECTED_ALL: {
      return state.updateIn(
        ['backend','attendance'], 
        (attend) => attend.map( att =>
          att.setIn(['Selected'], fromJS(action.val))
        ));
    }
    case SET_ROWS_CHECKED: {
      return state
        .setIn([
          'frontend',
          'rowsChecked',
        ], fromJS(action.rowsChecked))
    }
    case SET_EMPTY_ATTENDANCE: {
      return state
        .setIn([
          'backend',
          'attendance',
        ], fromJS(action.attendance))
    }
    case SET_CONCENTRATED_STATUS: {
      return state
        .setIn([
          'frontend',
          'ui',
          'concentrated',
        ], fromJS(action.status))
    }
    case SET_SELECTED_ROW: {

      return state
        .setIn([
          'backend',
          'assistance',
          'selectedPlaza',
        ], fromJS(action.selectedPlaza))
    }
    case SET_ARCHIVE_ZIP: {
      return state
        .setIn([
          'frontend',
          'archiveZip',
        ], fromJS(action.archiveZip))
    }
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default reporteAsistenciaReducer;
