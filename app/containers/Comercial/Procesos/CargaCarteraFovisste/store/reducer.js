/*
 *
 * CargaCarteraFovisste reducer
 *
 */

import { fromJS, List } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import STATE from './state';
import ACTIONS from './actions';
export const initialState = fromJS(STATE);

const {
  SET_TYPE_LOAD,
  SET_CURRENT_DATE,
  SET_PLAZAS,
  SET_WEEKS_MONTHS,
  SET_PERIODICITY,
  SET_SELECTED_WEEK,
  SET_SELECTED_MONTH,
  SET_SELECTED_PLAZA,
  SET_MODAL_CONTENT_LAYOUT,
  SET_MODAL_LOAD_DETAILS,
  SET_LIST_GENERAL,
  SET_BASE_LOAD,
  SET_ICON_VIEW_EXPLOTION,
  SET_FILE_LOAD,
  VALIDATED_FILE,
  DEFAULT_CONFIGURATION,
} = ACTIONS.getConstants()

function cargaCarteraFovissteReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TYPE_LOAD: {
      return state
        .setIn([
          'frontend',
          'currentTypeLoad',
        ], action.currentTypeLoad)
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
    case SET_WEEKS_MONTHS: {
      return state
        .setIn([
          'backend',
          'weeks',
        ], List(action.weeks))
        .setIn([
          'backend',
          'months',
        ], List(action.months))
    }
    case SET_PERIODICITY: {
      return state
        .setIn([
          'frontend',
          'periodicity',
        ], action.periodicity)
    }
    case SET_SELECTED_PLAZA: {
      return state
        .setIn([
          'frontend',
          'ui',
          'selectedPlaza',
        ], action.selectedPlaza)
    }
    case SET_SELECTED_WEEK: {
      return state
        .setIn([
          'frontend',
          'ui',
          'selectedWeek',
        ], action.selectedWeek)
    }
    case SET_SELECTED_MONTH: {
      return state
        .setIn([
          'frontend',
          'ui',
          'selectedMonth',
        ], action.selectedMonth)
    }
    case SET_MODAL_CONTENT_LAYOUT: {
      return state
        .setIn([
          'frontend',
          'ui',
          'modalContentLayout',
        ], action.modalContentLayout)
    }
    case SET_MODAL_LOAD_DETAILS: {
      return state
        .setIn([
          'frontend',
          'ui',
          'modalLoadDetails',
        ], action.modalLoadDetails)
    }
    case SET_LIST_GENERAL: {
      return state
        .setIn([
          'backend',
          'listGeneral',
        ], List(action.listGeneral))
    }
    case SET_BASE_LOAD: {
      return state
        .setIn([
          'backend',
          'layout',
        ], fromJS(action.layoutContent))
    }
    case SET_ICON_VIEW_EXPLOTION:{
      return state
        .setIn([
          'frontend',
          'ui',
          'iconViewExplotion',
        ], action.iconViewExplotion)
    }
    case SET_FILE_LOAD: {
      return state
        .setIn([
          'frontend',
          'fileLoad',
        ], action.data)
    }
    case VALIDATED_FILE: {
      return state
        .setIn([
          'frontend',
          'validatedFile',
        ], action.data)
    }
    case DEFAULT_CONFIGURATION: {
      return state
        .setIn([
          'frontend',
          'validatedFile',
        ], action.validatedFile)
        .setIn([
          'frontend',
          'fileLoad',
        ], fromJS(action.fileLoad))
        .setIn([
          'frontend',
          'ui',
          'selectedMonth',
        ], fromJS(action.selectedMonth))
        .setIn([
          'frontend',
          'ui',
          'iconViewExplotion',
        ], action.iconViewExplotion)
    }
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default cargaCarteraFovissteReducer;
