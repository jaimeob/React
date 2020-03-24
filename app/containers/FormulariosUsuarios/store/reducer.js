/*
 *
 * FormulariosUsuarios reducer
 *
 */

import { fromJS } from 'immutable';
// import isNull from 'lodash/isNull';
import _ from 'lodash';
import { REGEXS } from 'utils/constants';
// import { DEFAULT_ACTION } from './constants';
import INITIAL_STATE from './state';
import Actions from './actions';

export const initialState = fromJS(INITIAL_STATE);

export const {
  DEFAULT_ACTION,
  HANDLE_CHANGE_INDEX_TABS,
  HANDLE_CLICK_ITEM_GROUP_LIST,
  HANDLE_CLICK_BUTTON_SEARCH,
  HANDLE_CHANGE_TEXT_SEARCH,
  REQUEST_GET_FORMS_USER_SUCCESS,
  REQUEST_GET_ASSIGNED_FORMS_SUCCESS,
  CHANGE_SELECTED_USER,
  CHANGE_SELECTED_FORM,
  UPDATE_DATA_UI,
  UPDATE_COMPONENT_PROP,
  REQUEST_SAVE_CHANGES,
  REQUEST_SAVE_CHANGES_SUCCESS,
} = Actions.getConstants();

function reducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_CHANGE_INDEX_TABS: {
      const {
        index,
      } = action;

      return state.setIn([
        'frontend',
        'tabs',
        'indexTab',
      ], index);
    }
    case HANDLE_CLICK_ITEM_GROUP_LIST: {
      const {
        index,
        indexTab,
      } = action;
      const val = state.getIn(['frontend',
        'list',
        'data',
        indexTab ===0 ? 'assigns' : 'finished',
        index,
        'open']);

      return state.setIn([
        'frontend',
        'list',
        'data',
        indexTab ===0 ? 'assigns' : 'finished',
        index,
        'open',
      ], !val);
    }
    case HANDLE_CLICK_BUTTON_SEARCH: {
      const val = state.getIn(['frontend',
        'search',
        'searchActive']);

      return state.setIn([
        'frontend',
        'search',
        'searchActive',
      ], !val)
        .setIn([
          'frontend',
          'search',
          'textSearch',
        ], '');
    }
    case HANDLE_CHANGE_TEXT_SEARCH: {
      const {
        text,
      } = action

      return state.setIn([
        'frontend',
        'search',
        'textSearch',
      ], text);
    }
    case REQUEST_GET_ASSIGNED_FORMS_SUCCESS: {
      const {
        data: {
          grouped: dataGrouped,
          users,
        },
      } = action;
      console.log('datagrouped', dataGrouped);
      // console.log('REQUEST_GET_ASSIGNED_FORMS_SUCCESS action', action);
      return state
        .setIn([
          'backend',
          'datasources',
          'assignedForms',
        ], fromJS(dataGrouped))
        .setIn([
          'frontend',
          'list',
          'data',
          'assigns',
        ], fromJS(dataGrouped))
        .setIn([
          'frontend',
          'list',
          'data',
          'users',
        ], fromJS(users));
    }
    case REQUEST_SAVE_CHANGES: {
      return state
        .mergeIn([
          'frontend',
          'ui',
        ], { loadingSaveChanges: true });
    }
    case REQUEST_SAVE_CHANGES_SUCCESS: {
      const {
        data,
      } = action;
      const updatedUI = state
        .mergeIn([
          'frontend',
          'ui',
        ], {
          loadingSaveChanges: false,
          openModalFormulario: false,
        });
      return updatedUI
        .mergeIn([
          'frontend',
          'selectedForm',
        ], fromJS(data))
    }
    case CHANGE_SELECTED_USER: {
      // console.log('CHANGE_SELECTED_USER action', action)
      return state.setIn([
        'frontend',
        'selectedUser',
      ], action.user);
    }
    case CHANGE_SELECTED_FORM: {
      // console.log(action)
      return state
        .setIn([
          'frontend',
          'selectedForm',
        ], fromJS(
          action.formulario
        ));
    }
    case UPDATE_DATA_UI: {
      const {
        data = {},
      } = action;
      const PATH = [
        'frontend',
        'ui',
      ];
      return state
        .mergeIn(
          PATH,
          fromJS(data)
        );
    }
    case UPDATE_COMPONENT_PROP: {
      const {
        prop,
        value,
        order,
      } = action;
      console.log('UPDATE_COMPONENT_PROP action', action)
      // const {
      //   idx,
      // } = action;

      // idx = isNull(idx) ? state.getIn([
      //   'frontend',
      //   'selectedConfigComp',
      // ]) : idx;
      const byOrder = (cmp) => {
        console.log('cmp to filter', cmp)
        console.log(`cmp.order === ${cmp.order}`, cmp.order)
        return cmp.get('order') === order
      };
      const setComponentProp = (cmp) => {
        if (!cmp.has(prop)) return cmp;
        const comp = cmp.toJS();
        const {
          required,
          longitudMaxima,
          longitudMinima,
          dataType = 'alphanumeric',
          tipo,
        } = comp;
        const testedValidations = {};
        const validDataTypes = {
          alphanumeric: (val = '') => REGEXS.alphanumeric.test(val),
          numeric: (val = '') => REGEXS.numeric.test(val),
        }
        const validations = {
          required: () => {
            if (!required) return true;
            return _.isEmpty(value)
          },
          longitudMinima: () => {
            if (!_.isNumber(longitudMinima)) return true;
            return value.length >= _.toSafeInteger(longitudMinima)
          },
          longitudMaxima: () => {
            if (!_.isNumber(longitudMaxima)) return true;
            return value.length <= _.toSafeInteger(longitudMaxima)
          },
          dataType: () => {
            // if (!(tipo !== 'textocorto' || tipo !== 'textolargo') || !hasDataType) return true
            switch(true) {
              case tipo === 'textocorto' || tipo === 'textolargo': {
                const hasDataType = Object
                  .keys(validDataTypes)
                  .includes(dataType);
                if (hasDataType && _.isFunction(validDataTypes[dataType]))
                  return validDataTypes[dataType](value);
                return true;
              }
              default:
                return true;
            }
          },
        }
        Object
          .keys(validations)
          .forEach((tmpprop) => {
            testedValidations[tmpprop] = validations[tmpprop]();
          })
        return cmp
          .set(prop, value)
          .set('validations', testedValidations);
      }

      return state.updateIn([
        'frontend',
        'selectedForm',
        'Componentes',
      ], (comps) => {
        console.log('comps', comps.toJS())
        const idxCom = comps.findIndex(byOrder)
        return idxCom >= 0 ? comps.update(idxCom, 
          setComponentProp) : comps;
      })
      // const idxComp = state
      //   .getIn([
      //     'frontend',
      //     'selectedForm',
      //     'Componentes',
      //   ])
      //   .findIndex(byOrder);
      // console.log('order', order)
      // console.log('raw state', state)
      // console.log('state.toJS()', state.toJS())
      // console.log('action', action)
      // return state.updateIn([
      //   'frontend',
      //   'selectedForm',
      //   'Componentes',
      //   idxComp,
      // ], (cmp) =>
      //   cmp.has(prop) ?
      //     cmp.set(prop, value) : cmp
      // );
    }
    case DEFAULT_ACTION:
      // console.log('DEFAUL_ACTION', action)
      return state;
    default:
      return state;
  }
}

export default reducer;
