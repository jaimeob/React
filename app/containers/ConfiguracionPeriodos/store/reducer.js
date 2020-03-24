/*
 *
 * ConfiguracionPeriodo reducer
 *
 */

import { fromJS, List } from 'immutable';
import STATE from './state';
import Actions from './actions';

export const initialState = fromJS(STATE);

export const {
  DEFAULT_ACTION,
  SET_DATA,
  SET_STEPPER,
  SET_SHOW_SEARCH_TEXT,
  SET_SEARCH_TEXT,
  SET_FILTER_DATA,
  SET_SHOW_FILTERS,
  CLOSE_FILTERS,
  SET_SELECTED,
  SET_PAGE,
  SET_ROWS_PER_PAGE,
  SET_DISABLED_ADD_BUTTON,
  SET_TOTAL_PLAZAS,
  SET_MODAL,
  SET_CLOSE_MODAL,
  SET_PERIOD,
  SET_CLOSE_PERIOD,
  SET_PLAZAS,
  SET_PROFITABILITY,
  SET_PERIOD_DETAIL,
  SET_ERROR,
  SET_PERMISOS,
} = Actions.getConstants();

function configuracionPeriodosReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_DATA: {
      return state.setIn([
        'configuracionPeriodo',
        'backend',
        'datasources',
        'data',
      ], List(action.data))
        .setIn([
          'configuracionPeriodo',
          'frontend',
          'ui',
          'filterData',
        ], List(action.data))
    }
    case SET_FILTER_DATA: {
      return state.setIn([
        'configuracionPeriodo',
        'frontend',
        'ui',
        'filterData',
      ], List(action.filterData))
    }
    case SET_STEPPER: {
      return state.setIn([
        'configuracionPeriodo',
        'frontend',
        'stepper',
      ], action.stepper)
    }
    case SET_SHOW_SEARCH_TEXT: {
      const showSearchText = state.getIn([
        'configuracionPeriodo',
        'frontend',
        'ui',
        'showSearchText',
      ]);

      return state.setIn([
        'configuracionPeriodo',
        'frontend',
        'ui',
        'showSearchText',
      ], !showSearchText)
    }
    case SET_SEARCH_TEXT: {
      return state.setIn([
        'configuracionPeriodo',
        'frontend',
        'ui',
        'searchText',
      ], action.searchText)
    }
    case SET_SHOW_FILTERS: {
      const showFilters = state.getIn([
        'configuracionPeriodo',
        'frontend',
        'ui',
        'showFilters',
      ]);

      return state.setIn([
        'configuracionPeriodo',
        'frontend',
        'ui',
        'showFilters',
      ], !showFilters)
    }
    case CLOSE_FILTERS: {
      return state.setIn([
        'configuracionPeriodo',
        'frontend',
        'ui',
        'showFilters',
      ], false)
    }
    case SET_SELECTED: {
      return state.setIn([
        'configuracionPeriodo',
        'frontend',
        'ui',
        'selected',
      ], action.selected)
    }
    case SET_PAGE: {
      return state.setIn([
        'configuracionPeriodo',
        'frontend',
        'ui',
        'page',
      ], action.page)
    }
    case SET_ROWS_PER_PAGE: {
      return state.setIn([
        'configuracionPeriodo',
        'frontend',
        'ui',
        'rowsPerPage',
      ], action.rowsPerPage)
    }
    case SET_DISABLED_ADD_BUTTON: {
      return state.setIn([
        'configuracionPeriodo',
        'frontend',
        'ui',
        'disabledAddButton',
      ], action.disabledAddButton) 
    }
    case SET_TOTAL_PLAZAS: {
      return state.setIn([
        'configuracionPeriodo',
        'frontend',
        'ui',
        'totalPlazas',
      ], action.totalPlazas) 
    }
    case SET_MODAL: {
      if(action.variant === 'Warning'){
        return state.updateIn(
          ['configuracionPeriodo',
            'frontend',
            'ui',
            'modal',
          ],
          stt => stt.merge({
            show: true,
            title: 'ADVERTENCIA',
            variant: 'Warning',
            message: 'No se ha configurado la rentabilidad por plaza.',
            typeOptions: null,
          })
        )
      } 
      
      if(action.variant === 'Check'){
        return state.updateIn(
          ['configuracionPeriodo',
            'frontend',
            'ui',
            'modal',
          ],
          stt => stt.merge({
            show: true,
            title: 'EXITO',
            variant: 'Check',
            message: 'Periodo cerrado con éxito.',
            typeOptions: null,
          })
        )
      }

      if(action.variant === 'Cancel'){
        return state.updateIn(
          ['configuracionPeriodo',
            'frontend',
            'ui',
            'modal',
          ],
          stt => stt.merge({
            show: true,
            title: 'CONFIRMAR',
            variant: 'Cancel',
            message: 'Existen datos no guardados, ¿Está seguro que desea cerrar?',
            typeOptions: 'Select',
          })
        )
      }
      
      return state;
    }
    case SET_CLOSE_MODAL: {
      return state.updateIn([
        'configuracionPeriodo',
        'frontend',
        'ui',
        'modal',
      ],
      stt => stt.merge({
        show: false,
      })
      )
    }
    case SET_PERIOD: {
      return state.setIn([
        'registrarPeriodo',
        'frontend',
        'ui',
        'periodDetail',
        'period',
      ], action.period)
    }
    case SET_CLOSE_PERIOD: {
      const closePeriod = state.getIn([
        'registrarPeriodo',
        'frontend',
        'ui',
        'periodDetail',
        'closePeriod',
      ])

      return state.setIn([
        'registrarPeriodo',
        'frontend',
        'ui',
        'periodDetail',
        'closePeriod',
      ], !closePeriod)
    }
    case SET_PLAZAS: {
      return state.setIn([
        'registrarPeriodo',
        'backend',
        'datasources',
        'plazas',
      ], List(action.plazas))
    }
    case SET_PROFITABILITY: {

      const plazas = state.getIn([
        'registrarPeriodo',
        'backend',
        'datasources',
        'plazas',
      ]).toJS();

      const plazasConRentabilidad = plazas.filter(plaza => plaza.Rentabilidad > 0);
      const plaza = plazas[action.index];

      plaza.Rentabilidad = action.profitability;

      if(plazasConRentabilidad.length === plazas.length){
        return state.setIn([
          'registrarPeriodo',
          'backend',
          'datasources',
          'plazas',
          action.index,
        ], fromJS(plaza))
          .setIn([
            'registrarPeriodo',
            'frontend',
            'ui',
            'periodDetail',
            'closePeriod',
          ], false)
      }

      return state.setIn([
        'registrarPeriodo',
        'backend',
        'datasources',
        'plazas',
        action.index,
      ], fromJS(plaza));
    }
    
    case SET_PERIOD_DETAIL: {
      return state.setIn(
        ['registrarPeriodo',
          'frontend',
          'ui',
          'periodDetail',
        ], fromJS(action.period)
       
      ).setIn([
        'configuracionPeriodo',
        'frontend',
        'stepper',
      ], 1)
    }
    case SET_ERROR: {
      return state.updateIn([
        'registrarPeriodo',
        'frontend',
        'ui',
        'errors',
        action.input,
      ], stt => stt.merge({
        error: action.error,
        message: action.message,
      }))
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

export default configuracionPeriodosReducer;
