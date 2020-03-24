/*
 *
 * CatalogoEtapas reducer
 *
 */

import { fromJS } from 'immutable';
import INITIAL_STATE from './state';
import Actions from './actions';

export const initialState = fromJS(INITIAL_STATE);

export const {
  DEFAULT_ACTION,
  HANDLE_CHANGE_TYPE_PROCESS,
  HANDLE_CLICK_BUTTON_SEARCH,
  HANDLE_CHANGE_TEXT_SEARCH,
  HANDLE_CLICK_BUTTON_NEW,
  HANDLE_CLICK_LEAVE_NEW,
  HANDLE_CLICK_CHECK_TABLE,
  HANDLE_OPEN_DIALOG,
  HANDLE_CLICK_LEAVE_DIALOG,
  REQUEST_GET_TYPE_PROCESS_SUCCESS,
  REQUEST_GET_LIST_ETAPAS_SUCCESS,
  HANDLE_CLICK_DELETE_ROW,
  HANDLE_CHANGE_TEXT_MODAL,
  REQUEST_ETAPAS_TYPE_PROCESS_SUCCESS,
  HANDLE_CHANGE_COMBO_ETAPA,
  HANDLE_CLICK_BUTTON_EDIT,
  SET_PERMISOS,
} = Actions.getConstants();

function catalogoEtapasReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case HANDLE_CHANGE_TYPE_PROCESS: {
      const {
        value,
      } = action;

      return state
        .setIn([
          'frontend',
          'processSelected',
        ], value);
    }
    case HANDLE_CLICK_BUTTON_SEARCH: {
      const value = !state.getIn([
        'frontend',
        'activeSearch',
      ]);

      return state
        .setIn([
          'frontend',
          'activeSearch',
        ], value)
        .setIn([
          'frontend',
          'searchText',
        ], '');
    }
    case HANDLE_CHANGE_TEXT_SEARCH: {
      const {
        text,
      } = action

      return state
        .setIn([
          'frontend',
          'searchText',
        ], text);
    }
    case HANDLE_CLICK_BUTTON_NEW: {
      const value = !state.getIn([
        'showModalNew'])

      return state
        .setIn([
          'showModalNew',
        ], value)
        .setIn([
          'frontend',
          'titleModalNew',
        ], 'Alta de Etapa')
        .setIn([
          'frontend',
          'tipoMovto',
        ], 1)
        .setIn([
          'frontend',
          'titleComboModal',
        ], 'Dependencia')
    }
    case HANDLE_CLICK_LEAVE_NEW: {

      return state
        .setIn([
          'showModalNew',
        ], false)
        .setIn([
          'frontend',
          'tipoMovto',
        ], 1)
        .setIn([
          'frontend',
          'idEtapa',
        ], 0)
        .setIn([
          'frontend',
          'nameEtapa',
        ], '')
        .setIn([
          'frontend',
          'DaysPlazaForeign',
        ], '0')
        .setIn([
          'frontend',
          'DaysPlazaLocal',
        ], '0')
        .setIn([
          'frontend',
          'comboEtapas',
        ], [])
        .setIn([
          'frontend',
          'positionEtapaSelected',
        ], -1)
        .setIn([
          'frontend',
          'idEtapaCombo',
        ], 0)
        .setIn([
          'frontend',
          'estatus',
        ], '')
    }
    case HANDLE_CLICK_CHECK_TABLE: {
      const {
        rowSelected,
      } = action

      return state
        .setIn([
          'frontend',
          'rowSelected',
        ], rowSelected)
    }
    case HANDLE_OPEN_DIALOG: {
      const {
        dialog,
      } = action;

      const value = !state.getIn([dialog])

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
    case REQUEST_GET_TYPE_PROCESS_SUCCESS: {
      const {
        data: {
          data,
        },
      } = action;

      return state
        .setIn([
          'frontend',
          'processType',
        ], fromJS(data))
    }
    case REQUEST_GET_LIST_ETAPAS_SUCCESS: {
      const {
        data: {
          data: {
            data,
          },
          newIndex,
        },
      } = action;

      return state
        .setIn([
          'backend',
          'rows',
        ], fromJS(data))
        .setIn([
          'frontend',
          'menuFilterIndex',
        ], newIndex)
        .setIn([
          'changeWithButton',
        ], false)
        .setIn([
          'showDialogDelete',
        ], false)
        .setIn([
          'frontend',
          'rowSelected',
        ], [])
    }
    case HANDLE_CLICK_DELETE_ROW: {
      const {
        rowSelected,
      } = action

      return state
        .setIn([
          'frontend',
          'rowSelectedButton',
        ], rowSelected)
        .setIn([
          'changeWithButton',
        ], true)
    }
    case HANDLE_CHANGE_TEXT_MODAL: {
      const {
        text,
        option,
      } = action

      return state
        .setIn([
          'frontend',
          option,
        ], text)
    }
    case REQUEST_ETAPAS_TYPE_PROCESS_SUCCESS: {
      const {
        data:{
          data,
        },
      } = action

      return state
        .setIn([
          'frontend',
          'comboEtapas',
        ], fromJS(data))
    }
    case HANDLE_CHANGE_COMBO_ETAPA: {
      const {
        position,
      } = action

      return state
        .setIn([
          'frontend',
          'positionEtapaSelected',
        ], position)
        .setIn([
          'frontend',
          'idEtapaCombo',
        ], position)
    }
    case HANDLE_CLICK_BUTTON_EDIT: {
      const {
        rowSelect,
      } = action
      const value = !state.getIn([
        'showModalNew'])

      return state
        .setIn([
          'showModalNew',
        ], value)
        .setIn([
          'frontend',
          'titleModalNew',
        ], 'Editar Etapa')
        .setIn([
          'frontend',
          'tipoMovto',
        ], 2)
        .setIn([
          'frontend',
          'idEtapa',
        ], rowSelect.IdEtapa)
        .setIn([
          'frontend',
          'titleComboModal',
        ], 'Posición')
        .setIn([
          'frontend',
          'nameEtapa',
        ], rowSelect.Nombre)
        .setIn([
          'frontend',
          'DaysPlazaForeign',
        ], rowSelect.DiasPlazaForanea.toString())
        .setIn([
          'frontend',
          'DaysPlazaLocal',
        ], rowSelect.DiasPlazaLocal.toString())
        .setIn([
          'frontend',
          'positionEtapaSelected',
        ], rowSelect.IdEtapa)
        .setIn([
          'frontend',
          'idEtapaCombo',
        ], rowSelect.IdEtapa)
        .setIn([
          'frontend',
          'estatus',
        ], rowSelect.Estatus)
    }
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    default:
      return state;
  }
}

export default catalogoEtapasReducer;
