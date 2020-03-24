/*
 *
 * PorcentajeDeImpacto reducer
 *
 */

import { fromJS } from 'immutable';
// import { DEFAULT_ACTION } from './constants';
import INITIAL_STATE from './state';
import Actions from './actions';

export const initialState = fromJS(INITIAL_STATE);
export const {
  DEFAULT_ACTION,
  REQUEST_YEARS_PORCENT_IMPACT_SUCCESS,
  HANDLE_CHANGE_YEAR_PORCENT_IMPACT,
  REQUEST_PORCENT_IMPACT,
  REQUEST_PORCENT_IMPACT_SUCCESS,
  RETURN_PROGRESS,
  REQUEST_DATA_IMPACT_GENERAL_SUCCESS,
  HANDLE_CLICK_VIEW_DETAIL,
  REQUEST_DATA_IMPACT_DETAIL,
  REQUEST_DATA_IMPACT_DETAIL_SUCCESS,
  HANDLE_CLICK_EXIT_DETAIL,
  HANDLE_CLICK_BUTTON_SEARCH,
  HANDLE_CHANGE_TEXT_SEARCH,
  HANDLE_OPEN_MODAL_CONFIRMATION,
} = Actions.getConstants();

function porcentajeDeImpactoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case REQUEST_YEARS_PORCENT_IMPACT_SUCCESS: {
      const {
        data: {
          data,
        },
      } = action;

      return state
        .setIn([
          'generalScreen',
          'years',
        ], data)
    }
    case HANDLE_CHANGE_YEAR_PORCENT_IMPACT: {
      const {
        value,
      } = action;

      return state
        .setIn([
          'generalScreen',
          'yearSelected',
        ], value)
    }
    case REQUEST_PORCENT_IMPACT: {
      return state
        .setIn([
          'generalScreen',
          'progressActive',
        ], true)
    }
    case REQUEST_PORCENT_IMPACT_SUCCESS: {
      const {
        data: {
          data,
        },
      } = action

      return state
        .setIn([
          'generalScreen',
          'porcentImpact',
        ], data)
    }
    case RETURN_PROGRESS: {
      const {
        rute,
      } = action
      return state
        .setIn(rute, false)
    }
    case REQUEST_DATA_IMPACT_GENERAL_SUCCESS: {
      const {
        data: {
          data: {
            familys,
            detail,
          },
        },
      } = action

      return state
        .setIn([
          'generalScreen',
          'generalFamily',
        ], familys)
        .setIn([
          'generalScreen',
          'generalData',
        ], detail)
    }
    case HANDLE_CLICK_VIEW_DETAIL: {
      const {
        id,
        name,
      } = action;

      return state
        .setIn([
          'detailScreen',
          'familySelected',
        ], id)
        .setIn([
          'detailScreen',
          'nameFamily',
        ], name)
        .setIn([
          'stepper',
          'selectedStep',
        ], 1)
        .setIn([
          'topbarTitle',
        ], "% de Impacto Detalle")
    }
    case REQUEST_DATA_IMPACT_DETAIL: {
      return state
        .setIn([
          'detailScreen',
          'progressTableActive',
        ], true)
    }
    case REQUEST_DATA_IMPACT_DETAIL_SUCCESS: {
      const {
        data: {
          data,
        },
      } = action;

      return state
        .setIn([
          'detailScreen',
          'rows',
        ], data)
    }
    case HANDLE_CLICK_EXIT_DETAIL: {
      const {
        id,
        name,
      } = action;

      return state
        .setIn([
          'detailScreen',
          'familySelected',
        ], id)
        .setIn([
          'detailScreen',
          'nameFamily',
        ], name)
        .setIn([
          'stepper',
          'selectedStep',
        ], 0)
        .setIn([
          'topbarTitle',
        ], "% de Impacto")
        .setIn([
          'detailScreen',
          'activeSearch',
        ], false)
        .setIn([
          'detailScreen',
          'searchText',
        ], '')
        .setIn([
          'detailScreen',
          'rows',
        ], [])
        .setIn([
          'detailScreen',
          'openConfirmation',
        ], false)
    }
    case HANDLE_CLICK_BUTTON_SEARCH: {
      const value = !state.getIn([
        'detailScreen',
        'activeSearch',
      ]);

      return state
        .setIn([
          'detailScreen',
          'activeSearch',
        ], value)
        .setIn([
          'detailScreen',
          'searchText',
        ], '');
    }
    case HANDLE_CHANGE_TEXT_SEARCH: {
      const {
        text,
      } = action

      return state
        .setIn([
          'detailScreen',
          'searchText',
        ], text);
    }
    case HANDLE_OPEN_MODAL_CONFIRMATION: {
      const {
        status,
      } = action

      return state
        .setIn([
          'detailScreen',
          'openConfirmation',
        ], status)
    }
    default:
      return state;
  }
}

export default porcentajeDeImpactoReducer;
