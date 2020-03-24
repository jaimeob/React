/*
 *
 * Negociaciones reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import STATE from './state';
import ACTIONS from './actions';
export const initialState = fromJS(STATE);

const {
  DEFAULT_STATE,
  SHOW_MODAL_CONTENT_LAYOUT,
  SHOW_MODAL_VIEW_EXPLOTION,
  // SET_USER_LOGGED_IN,
  SET_ICON_VIEW_EXPLOTION,
  SET_MODAL_ACTIVE,
  SET_LAYOUT_NEGOCIACIONES,
  SET_DETALLE_INSUMO,
  SET_PLAZAS,
  SET_PLAZA_SELECTED,
  SET_INSUMOS_EXPLOTION_STATIC,
  SET_INSUMOS_EXPLOTION_DINAMIC,
  SET_EXPLOTIONS,
  SET_EXPLOTIONS_DETAILS,
  SET_FILE_LOAD,
  SET_CURRENT_DATE_TIME,
  UPDATE_INSUMOS_EXPLOTION_STATIC,
  UPDATE_INSUMOS_EXPLOTION_DINAMIC,
  REQUEST_ADD_EXPLOTION,
  EXPLOTION_DETAILS,
  EXPLOTION_SELECTED,
  VALIDATED_FILE,
  LOAD_EXPORT_EXPLOTION,
} = ACTIONS.getConstants()

function negociacionesReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_STATE: {
      return state
        .setIn([
          'frontend',
          'fileExplotion',
        ], action.fileExplotion)
        .setIn([
          'frontend',
          'explotionDetails',
        ], action.explotionDetails)
        .setIn([
          'frontend',
          'explotionSelected',
        ], action.explotionSelected)
    }
    case SHOW_MODAL_CONTENT_LAYOUT: {
      return state
        .setIn([
          'frontend',
          'ui',
          'modalContentLayout',
        ], action.modalContentLayout)
    }
    case SHOW_MODAL_VIEW_EXPLOTION: {
      return state
        .setIn([
          'frontend',
          'ui',
          'modalViewExplotion',
        ], action.modalViewExplotion)
    }
    // case SET_USER_LOGGED_IN: {
    //   return state
    //     .setIn([
    //       'backend',
    //       'datasources',
    //       'userCredentials',
    //     ], action.userCredentials);
    // }
    case SET_ICON_VIEW_EXPLOTION:{
      return state
        .setIn([
          'frontend',
          'iconViewExplotion',
        ], action.iconViewExplotion)
    }
    case SET_MODAL_ACTIVE: {
      return state
        .setIn([
          'frontend',
          'ui',
          'modalActive',
        ], action.modalActive)
    }
    case SET_LAYOUT_NEGOCIACIONES: {
      return state
        .setIn([
          'backend',
          'datasources',
          'layoutNegociaciones',
        ], action.data)
    }
    case SET_PLAZAS: {
      return state
        .setIn([
          'frontend',
          'ui',
          'selectPlazas',
          'arrPlazas',
        ], action.data)
    }
    case SET_CURRENT_DATE_TIME: {
      return state
        .setIn([
          'backend',
          'datasources',
          'currentDateTime',
        ], action.data)
    }
    case SET_PLAZA_SELECTED: {
      return state
        .setIn([
          'frontend',
          'ui',
          'selectPlazas',
          'plazaSelected',
        ], action.plazaSelected)
    }
    case SET_DETALLE_INSUMO: {
      return state
        .setIn([
          'backend',
          'datasources',
          'detalleInsumo',
        ], action.data)
    }
    case SET_EXPLOTIONS:{
      return state
        .setIn([
          'backend',
          'datasources',
          'explotionList',
        ], action.data)
    }
    case SET_EXPLOTIONS_DETAILS:{
      return state
        .setIn([
          'backend',
          'datasources',
          'explotionDetails',
        ], action.data)
    }
    case SET_FILE_LOAD: {
      return state
        .setIn([
          'frontend',
          'fileLoad',
        ], action.data)
    }
    case SET_INSUMOS_EXPLOTION_STATIC: {
      return state
        .setIn([
          'frontend',
          'ui',
          'insumosExplotion',
          'staticProps',
        ], action.staticProps)
    }
    case SET_INSUMOS_EXPLOTION_DINAMIC: {
      return state
        .setIn([
          'frontend',
          'ui',
          'insumosExplotion',
          'dinamicProps',
        ], action.dinamicProps)
    }
    case EXPLOTION_DETAILS: {
      return state
        .setIn([
          'frontend',
          'explotionDetails',
        ], action.details)
    }
    case UPDATE_INSUMOS_EXPLOTION_STATIC: {
      return state
        .updateIn([
          'frontend',
          'ui',
          'insumosExplotion',
          'staticProps'],
        (staticProps) => Object.assign(staticProps, action.staticProps))
    }
    case UPDATE_INSUMOS_EXPLOTION_DINAMIC:{
      return state
        .updateIn([
          'frontend',
          'ui',
          'insumosExplotion',
          'dinamicProps'],
        (dinamicProps) => Object.assign(dinamicProps, action.dinamicProps))
    }
    case REQUEST_ADD_EXPLOTION: {
      return state
        .setIn([
          'backend',
          'datasources',
          'request',
          'addExplotion',
        ], action.data)
    }
    case EXPLOTION_SELECTED: {
      return state
        .setIn([
          'frontend',
          'explotionSelected',
        ], action.data)
    }
    case VALIDATED_FILE: {
      return state
        .setIn([
          'frontend',
          'validatedFile',
        ], action.data)
    }
    case LOAD_EXPORT_EXPLOTION: {
      return state
        .setIn([
          'frontend',
          'ui',
          'loadExportExplotion',
        ], action.data)
    }
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}
export default negociacionesReducer;
