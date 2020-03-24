/*
 *
 * CargaBase reducer
 *
 */

import { fromJS, List } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import STATE from './state';
import ACTIONS from './actions';
export const initialState = fromJS(STATE);

const {
  SET_PLAZAS,
  SET_CURRENT_DATE,
  SET_WEEKS_RETAIL,
  SET_WEEK_SELECTED,
  SET_COMPANYS,
  SET_COMPANY_SELECTED,
  SET_MODAL_CONTENT_LAYOUT,
  SET_COMPANY_LAYOUT,
  SET_ICON_VIEW_EXPLOTION,
  SET_FILE_LOAD,
  VALIDATED_FILE,
  SET_MODAL_CARGA_BASE,
  SET_LISTADO_MES,
  SET_PERMISOS,
} = ACTIONS.getConstants()

function cargaBaseReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAZAS: {
      return state
        .setIn([
          'backend',
          'plazas',
        ], List(action.data))
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
    case SET_COMPANYS: {
      return state
        .setIn([
          'backend',
          'datasources',
          'companys',
        ], List(action.data))
    }
    case SET_WEEK_SELECTED: {
      return state
        .setIn([
          'frontend',
          'ui',
          'selectedWeek',
        ], action.selectedWeek)
    }
    case SET_COMPANY_SELECTED: {
      return state
        .setIn([
          'frontend',
          'ui',
          'selectedCompany',
        ], action.selectedCompany)
        .setIn([
          'frontend',
          'iconViewExplotion',
        ], fromJS({
          enabled: false,
        }));
    }
    case SET_MODAL_CONTENT_LAYOUT: {
      return state
        .setIn([
          'frontend',
          'ui',
          'modalContentLayout',
        ], action.modalContentLayout)
    }
    case SET_COMPANY_LAYOUT: {
      const cabecerasUpperCase = action.data.cabeceras.map(cabecera => cabecera.Column.toLowerCase() )
      return state
        .setIn([
          'frontend',
          'ui',
          'companyLayout',
        ], fromJS(action.data))
        .setIn([
          'backend',
          'datasources',
          'layout',
          'columsRequired',
        ], List(cabecerasUpperCase))
    }
    case SET_ICON_VIEW_EXPLOTION:{
      return state
        .setIn([
          'frontend',
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
    case SET_MODAL_CARGA_BASE: {
      return state
        .setIn([
          'frontend',
          'ui',
          'modalCargaBase',
        ], action.modalCargaBase)
    }
    case SET_LISTADO_MES: {
      return state
        .setIn([
          'frontend',
          'ui',
          'listadoArchivosMes',
        ], List(action.data))
    } 
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default cargaBaseReducer;
