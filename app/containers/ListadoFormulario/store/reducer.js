/*
 *
 * ListadoFormulario reducer
 *
 */

import { fromJS, List } from 'immutable';
// import { DEFAULT_ACTION } from './constants';
import isFunction from 'lodash/isFunction';
import INITIAL_STATE from './state';
import Actions from './actions';
import { REQUEST_ACTION } from '../../Main/store/constants';


export const initialState = fromJS(INITIAL_STATE);
export const {
  DEFAULT_ACTION,
  HANDLE_CLICK_ITEM_GROUP_LIST,
  HANDLE_CLICK_BUTTON_SEARCH,
  HANDLE_CHANGE_TEXT_SEARCH,
  HANDLE_CLICK_CHECK_USERS,
  HANDLE_CLICK_CHECK_ALL,
  HANDLE_CHANGE_INDEX_TABS_VIEW,
  HANDLE_CHANGE_INDEX_TABS_LIST,
  HANDLE_TEXT_SEARCH_CHANGE_LIST,
  HANDLE_CLICK_BUTTON_ADD_USERS_SUCCESS,
  HANDLE_CLICK_BUTTONS_ASSING,
  HANDLE_CLICK_ACCEPT_CLEAR,
  REQUEST_FORMS_TEMPLATES,
  REQUEST_DEPARTAMENTS_FORMS_LIST_SUCCESS,
  REQUEST_FORMS_TEMPLATES_SUCCESS,
  REQUEST_FORMS_ASSIGN_SUCCESS,
  UPDATE_SELECTED_TAB,
  HANDLE_CHANGE_INDEX_TABS,
  REQUEST_TOGGLE_ASSIGNATIONS,
  REQUEST_FORMS_ASSIGN,
} = Actions.getConstants();

const defOptsUpdate = {
  listProp: '',
  invertValues: false,
}

const updateAssignListProp = (
  state,
  prop = '',
  value = null,
  options = defOptsUpdate
) => {
  const {
    listProp = 'dataUsers',
  } = Object.assign({}, defOptsUpdate, options);
  if (!isFunction(state.updateIn)) return state;
  return state.updateIn([
    'frontend',
    'assignList',
    listProp,
  ], (dataProps) => {
    if (!List.isList(dataProps)) return dataProps;
    const nextState = dataProps.map((item) => 
      item.has(prop) ?
        item.set(prop, value) : item
    )
    return nextState;
  }
  )
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_CLICK_ITEM_GROUP_LIST: {
      const {
        index,
      } = action;
      const val = !state.getIn(['frontend',
        'list',
        'data',
        index,
        'open']);

      return state.setIn([
        'frontend',
        'list',
        'data',
        index,
        'open',
      ], val);
    }
    case HANDLE_CLICK_BUTTON_SEARCH: {
      const val = !state.getIn(['frontend',
        'search',
        'searchActive']);

      return state.setIn([
        'frontend',
        'search',
        'searchActive',
      ], val)
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
    case HANDLE_CHANGE_INDEX_TABS_VIEW: {
      const {
        index,
      } = action;

      return state.setIn([
        'frontend',
        'firstTabs',
        'indexTab',
      ], index);
    }
    case HANDLE_CHANGE_INDEX_TABS_LIST: {
      const {
        index,
      } = action;

      return state.setIn([
        'frontend',
        'tabList',
        'indexTabList',
      ], index);
    }
    case HANDLE_CHANGE_INDEX_TABS: {
      const { index } = action;
      return state.setIn([
        'frontend',
        'tabList',
        'indexTabList',
      ], index);
    }
    case HANDLE_CLICK_CHECK_USERS: {
      const {
        index,
        data,
        checked: val,
        user,
      } = action;

      if (data === 'dataSent') {
        return state
          .updateIn([
            'frontend',
            'assignList',
            'dataSent',
          ], (dsn) => dsn.mergeIn([index], {
            deleted: val,
            checked: val,
          }))
          .updateIn([
            'frontend',
            'assignList',
            'dataUsers',
          ], (dsn) => {
            const idxUsr = dsn
              .findIndex(
                (usr) => usr.get('NoEmpleado') === user.NoEmpleado 
              );
            if (idxUsr >= 0) {
              return dsn.mergeIn([idxUsr], {
                deleted: !val,
                checked: !val,
              })
            }
            return dsn;
          })
      }
      // datausers clicked
      return state
        .updateIn([
          'frontend',
          'assignList',
          'dataUsers',
        ], (dsn) => dsn.mergeIn([index], {
          deleted: val,
          checked: val,
        }))
        .updateIn([
          'frontend',
          'assignList',
          'dataSent',
        ], (dsn) => {
          const idxUsr = dsn
            .findIndex(
              (usr) => usr.get('NoEmpleado') === user.NoEmpleado 
            );
          if (idxUsr >= 0) { // user founded
            return dsn.mergeIn([idxUsr], {
              deleted: !val,
              checked: !val,
            })
          }
          return dsn.push(fromJS({
            ...user,
            checked: false,
            deleted: false,
          }));
        })
    }
    case HANDLE_CLICK_CHECK_ALL: {
      const {
        checked,
        options: {
          propName = '',
        },
      } = action;
      return state
        .updateIn([
          'frontend',
          'assignList',  
        ], (asl) => {
          const allChecked = asl
            .update(propName, (al) => al.map(
              (item) => item.set('checked', checked)
            ))
            .set(propName === 'dataSent' ? 'allUserSent' : 'allUser', checked);
          return allChecked;
          // TODO: Insertar los elementos que no están en dataSent
        });
      // const val = !state.getIn(['frontend',
      //   'assignList',
      //   name,
      // ]);

      // if (name === 'allUserSent') {
      //   nextstate =  updateAssignListProp(
      //     state,
      //     'checked',
      //     val, {
      //       listProp: 'dataSent',
      //     });
      // }
      // if (name === 'allUser') {
      //   nextstate =  updateAssignListProp(
      //     state,
      //     'checked',
      //     val, {
      //       listProp: 'dataUsers',
      //     });
      // }
      // // console.log('nextstate', nextstate.toJS());
      // return nextstate.setIn([
      //   'frontend',
      //   'assignList',
      //   name,
      // ], val);
    }
    case HANDLE_TEXT_SEARCH_CHANGE_LIST: {
      const {
        text,
      } = action;

      return state
        .setIn([
          'frontend',
          'assignList',
          'textSearchAssing',
        ], text);
    }
    case HANDLE_CLICK_BUTTON_ADD_USERS_SUCCESS: {
      const {
        data,
      } = action;
      console.log('HANDLE_CLICK_BUTTON_ADD_USERS_SUCCESS', action)
      const val = state.getIn(['frontend',
        'assignList',
        'addUsers']);
      const formatedDataUsers = data.map(
        (item) => ({
          ...item,
          checked: false,
          deleted: false,
        }))
      return state.setIn([
        'frontend',
        'assignList',
        'addUsers',
      ], !val)
        .setIn([
          'frontend',
          'assignList',
          'dataUsers',
        ], fromJS(formatedDataUsers));
    }
    case HANDLE_CLICK_BUTTONS_ASSING: {
      const {
        flag,
      } = action

      return state.setIn([
        'frontend',
        'assignList',
        'flagMessage',
      ], flag);
    }
    case HANDLE_CLICK_ACCEPT_CLEAR: {
      let nextState = state;


      nextState = updateAssignListProp(
        state,
        'checked',
        false,
        { listProp: 'dataSent' },
      );
      nextState =  updateAssignListProp(
        nextState,
        'checked',
        false, {
          listProp: 'dataUsers',
        });
      nextState = nextState.setIn([
        'frontend',
        'assignList',
        'textSearchAssing',
      ], '')
      nextState = nextState.setIn([
        'frontend',
        'assignList',
        'allUserSent',
      ], false)
      nextState = nextState.setIn([
        'frontend',
        'assignList',
        'allUser',
      ], false)
      nextState = nextState.setIn([
        'frontend',
        'assignList',
        'addUsers',
      ], false)

      return nextState.setIn([
        'frontend',
        'assignList',
        'flagMessage',
      ], false);
    }
    case REQUEST_DEPARTAMENTS_FORMS_LIST_SUCCESS: {
      const {
        data,
      } = action

      return state.setIn([
        'backend',
        'dataSource',
        'depasFormularios',
      ], fromJS(data))
        .setIn([
          'frontend',
          'list',
          'data',
        ], fromJS(data));
    }
    case REQUEST_FORMS_TEMPLATES: {
      const {
        formulario,
      } = action;
      return state
        .setIn([
          'frontend',
          'selectedConfig',
        ], formulario)
        .setIn([
          'frontend',
          'ui',
          'loadingFrmConfig',
        ], true);
    }
    case REQUEST_FORMS_TEMPLATES_SUCCESS: {
      const {
        formulario,
        dataUsersSent,
        departamentId,
        idMongoDepartament,
      } = action
      return state.setIn([
        'frontend',
        'selectedTemplate',
      ], true)
        .setIn([
          'frontend',
          'idMongoDepartament',
        ], idMongoDepartament)
        .setIn([
          'frontend',
          'departamentId',
        ], departamentId)
        .setIn([
          'frontend',
          'assignList',
          'dataSent',
        ], fromJS(dataUsersSent))
        .setIn([
          'frontend',
          'assignList',
          'allUserSent',
        ], false)
        .setIn([
          'frontend',
          'assignList',
          'dataUsers',
        ], [])
        .setIn([
          'frontend',
          'assignList',
          'allUser',
        ], false)
        .setIn([
          'frontend',
          'assignList',
          'textSearchAssing',
        ], '')
        .setIn([
          'frontend',
          'assignList',
          'addUsers',
        ], false)
        .setIn([
          'frontend',
          'configuracionformulario',
        ], fromJS(formulario))
    }
    case REQUEST_FORMS_ASSIGN: {
      return state
        .mergeIn([
          'frontend',
          'assignList',
        ], fromJS(
          INITIAL_STATE
            .frontend
            .assignList
        ));
    }
    case REQUEST_FORMS_ASSIGN_SUCCESS: {
      const {
        data,
      } = action;
      console.log('REQUEST_FORMS_ASSIGN_SUCCESS ACTION', data)
      const finalized = [];
      const inProcess = [];
      const pending = [];
      const assigned = [];
      return state.updateIn([
        'frontend',
        'tabList',
        'dataList',
      ], (dtlst) => {
        let item;

        // eslint-disable-next-line no-restricted-syntax
        for (item of data) {
          const {
            Estatus,
          } = item;

          switch (Estatus) {
            case 'ASIGNADO':
              assigned.push(item);
              break;
            case 'PROCESO':
              inProcess.push(item);
              break;
            case 'PENDIENTE':
              pending.push(item);
              break;
            case 'FINALIZADO':
              finalized.push(item);
              break;
            default:
              break;
          }

        }
        return dtlst.merge({
          finalized: fromJS(finalized),
          inProcess: fromJS(inProcess),
          pending: fromJS(pending),
          assigned: fromJS(assigned),
        })
      });
    }
    case REQUEST_TOGGLE_ASSIGNATIONS: {
      return state;
    }
    // case 'app/Main/REQUEST_ACTION':
    case REQUEST_ACTION: {
      return state;
    }
    case UPDATE_SELECTED_TAB: {
      // const {
      //   index: tabIndex,
      // } = action;
      return state;
    }
    case DEFAULT_ACTION:
      // console.log('DEFAUL_ACTION', action)
      return state;
    default:
      return state;
  }
}

export default reducer;

