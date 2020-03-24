/*
 *
 * ListadoFamilias reducer
 *
 */
import { fromJS } from 'immutable';
// import { DEFAULT_ACTION } from './constants';
// import isFunction from 'lodash/isFunction';
import INITIAL_STATE from './state';
import Actions from './actions';

export const initialState = fromJS(INITIAL_STATE);
export const {
  DEFAULT_ACTION,
  HANDLE_CLICK_BUTTON_SEARCH,
  HANDLE_CHANGE_TEXT_SEARCH,
  REQUEST_GET_FAMILY_SUCCESS,
  HANDLE_CLICK_ADD_FAMILY,
  HANDLE_CLICK_BACK_FAMILY,
  REQUEST_CLICK_EDIT_FAMILY_SUCCESS,
  HANDLE_CLICK_BUTTON_SEARCH_ADMIN,
  HANDLE_CHANGE_TEXT_SEARCH_ADMIN,
  HANDLE_CLICK_DELETE_ROW_ADMIN_FAMILY,
  HANDLE_CHANGE_TEXT_NAME_FAMILY,
  // HANDLE_CLICK_ADD_SUBFAMILY,
  HANDLE_CLICK_BUTTON_SEARCH_LIST,
  HANDLE_CHANGE_TEXT_SEARCH_LIST,
  HANDLE_CLICK_CHECK_LIST,
  HANDLE_CLICK_LEAVE_LIST,
  HANDLE_CLICK_SAVE_LIST,
  HANDLE_CLICK_ADD_SUBFAMILY_SUCCESS,
  HANDLE_CLICK_EXIT_VALIDATION,
  HANDLE_CLICK_SAVE_VALIDATION,
  SHOW_MODAL_SUCCESS,
  REQUEST_SAVE_SUBFAMILYS,
  SHOW_MODAL_ERROR_SAVE,
  CHANGE_MODAL_CHARGES,
  SET_CHARGES_DEPARTAMENT,
  SELECTED_CHARGE,
} = Actions.getConstants();

function reducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      // console.log('DEFAUL_ACTION', action)
      return state;
    case HANDLE_CLICK_BUTTON_SEARCH: {
      const value = !state.getIn([
        'tableFamily',
        'toolBar',
        'activeSearch',
      ]);

      return state
        .setIn([
          'tableFamily',
          'toolBar',
          'activeSearch',
        ], value)
        .setIn([
          'tableFamily',
          'toolBar',
          'searchText',
        ], '');
    }
    case HANDLE_CHANGE_TEXT_SEARCH: {
      const {
        text,
      } = action

      return state
        .setIn([
          'tableFamily',
          'toolBar',
          'searchText',
        ], text);
    }
    case REQUEST_GET_FAMILY_SUCCESS: {
      const {
        payload: {
          data: {
            data: dataResult,
          },
          payload: {
            index,
            newIndex,
          },
        },
      } = action

      const newFilterFamily = state.getIn([
        'tableFamily',
        'toolBar',
        'menuFilters',
        newIndex,
        'option',
      ])

      return state
        .setIn([
          'tableFamily',
          'body',
          'dataFamily',
        ], fromJS(dataResult))
        .setIn([
          'tableFamily',
          'toolBar',
          'menuFilters',
          index,
          'checked',
        ], false)
        .setIn([
          'tableFamily',
          'toolBar',
          'preMenuFilterIndex',
        ], index)
        .setIn([
          'tableFamily',
          'toolBar',
          'menuFilterIndex',
        ], newIndex)
        .setIn([
          'tableFamily',
          'toolBar',
          'menuFilters',
          newIndex,
          'checked',
        ], true)
        .setIn([
          'tableFamily',
          'toolBar',
          'filterFamily',
        ], newFilterFamily);
    }
    case HANDLE_CLICK_ADD_FAMILY: {
      const {
        step,
      } = action

      return state
        .setIn([
          'stepper',
          'selectedStep',
        ], step)
        .setIn([
          'adminFamily',
          'table',
          'body',
          'rowsDeleteAdmin',
        ], [])
        .setIn([
          'topbarTitle',
        ], 'Administrar Familias')
        .setIn([
          'adminFamily',
          'idFamily',
        ], 0);
    }
    case HANDLE_CLICK_BACK_FAMILY: {
      const {
        step,
      } = action

      return state
        .setIn([
          'stepper',
          'selectedStep',
        ], step)
        .setIn([
          'adminFamily',
          'table',
          'body',
          'rowsDeleteAdmin',
        ], [])
        .setIn([
          'adminFamily',
          'table',
          'body',
          'dataSubFamily',
        ], [])
        .setIn([
          'adminFamily',
          'listSubFamilys',
          'selectedList',
        ], [])
        .setIn([
          'adminFamily',
          'listSubFamilys',
          'body',
          'dataListSubFamily',
        ], [])
        .setIn([
          'adminFamily',
          'listSubFamilys',
          'body',
          'rowsSelectedList',
        ], [])
        .setIn([
          'adminFamily',
          'totalSubFamilys',
        ], 0)
        .setIn([
          'topbarTitle',
        ], "Listado de Familias")
        .setIn([
          'adminFamily',
          'openModalSuccess',
        ], false)
        .setIn([
          'adminFamily',
          'openModalConfirmExit',
        ], false)
        .setIn([
          'adminFamily',
          'nameFamily',
        ], '')
    }
    case REQUEST_CLICK_EDIT_FAMILY_SUCCESS: {
      const {
        payload: {
          data: {
            data: dataResult,
          },
          payload: {
            id,
            name,
            step,
          },
        },
      } = action

      return state
        .setIn([
          'stepper',
          'selectedStep',
        ], step)
        .setIn([
          'adminFamily',
          'idFamily',
        ], id)
        .setIn([
          'adminFamily',
          'nameFamily',
        ], name)
        .setIn([
          'adminFamily',
          'totalSubFamilys',
        ], dataResult.length)
        .setIn([
          'adminFamily',
          'table',
          'body',
          'dataSubFamily',
        ], fromJS(dataResult))
        .setIn([
          'topbarTitle',
        ], 'Administrar Familias');
    }
    case HANDLE_CLICK_BUTTON_SEARCH_ADMIN: {
      const value = !state.getIn([
        'adminFamily',
        'table',
        'toolBar',
        'activeSearch',
      ]);

      return state
        .setIn([
          'adminFamily',
          'table',
          'toolBar',
          'activeSearch',
        ], value)
        .setIn([
          'adminFamily',
          'table',
          'toolBar',
          'searchText',
        ], '');
    }
    case HANDLE_CHANGE_TEXT_SEARCH_ADMIN: {
      const {
        text,
      } = action

      return state
        .setIn([
          'adminFamily',
          'table',
          'toolBar',
          'searchText',
        ], text);
    }
    case HANDLE_CLICK_DELETE_ROW_ADMIN_FAMILY: {
      const {
        payload: {
          rowDelete,
          rowsActives,
        },
      } = action

      const rowsDelete = state.getIn([
        'adminFamily',
        'table',
        'body',
        'rowsDeleteAdmin',
      ]);

      rowsDelete.push(rowDelete);
      rowsActives.splice(rowsActives.findIndex(
        row => row.Id === rowDelete.Id), 1
      );

      // console.log('rowsDelete: ', rowsDelete);
      return state
        .setIn([
          'adminFamily',
          'table',
          'body',
          'rowsDeleteAdmin',
        ], rowsDelete)
        .setIn([
          'adminFamily',
          'table',
          'body',
          'dataSubFamily',
        ], rowsActives)
        .setIn([
          'adminFamily',
          'totalSubFamilys',
        ], rowsActives.length);
    }
    case HANDLE_CHANGE_TEXT_NAME_FAMILY: {
      const {
        text,
      } = action

      return state
        .setIn([
          'adminFamily',
          'nameFamily',
        ], text)
        .setIn([
          'adminFamily',
          'markRequired',
        ], false);
    }
    case HANDLE_CLICK_ADD_SUBFAMILY_SUCCESS: {
      const {
        payload: {
          data: {
            data,
          },
          dataSubFamily: dataSubFamilyNow,
          rowsDelete,
        },
      } = action

      const newData = data.filter(
        row => !dataSubFamilyNow.some(
          row2 => row.Id === row2.Id
        )
      );

      newData.push(...rowsDelete);

      return state.setIn([
        'adminFamily',
        'openList',
      ], true)
        .setIn([
          'adminFamily',
          'listSubFamilys',
          'body',
          'dataListSubFamily',
        ], newData)
    }
    case HANDLE_CLICK_BUTTON_SEARCH_LIST: {
      const value = !state.getIn([
        'adminFamily',
        'listSubFamilys',
        'toolBar',
        'activeSearch',
      ]);

      return state
        .setIn([
          'adminFamily',
          'listSubFamilys',
          'toolBar',
          'activeSearch',
        ], value)
        .setIn([
          'adminFamily',
          'listSubFamilys',
          'toolBar',
          'searchText',
        ], '');
    }
    case HANDLE_CHANGE_TEXT_SEARCH_LIST: {
      const {
        text,
      } = action

      return state
        .setIn([
          'adminFamily',
          'listSubFamilys',
          'toolBar',
          'searchText',
        ], text);
    }
    case HANDLE_CLICK_CHECK_LIST: {
      const {
        payload: {
          newSelected,
        },
      } = action

      return state
        .setIn([
          'adminFamily',
          'listSubFamilys',
          'selectedList',
        ], newSelected)
    }
    case HANDLE_CLICK_LEAVE_LIST: {

      return state
        .setIn([
          'adminFamily',
          'listSubFamilys',
          'selectedList',
        ], [])
        .setIn([
          'adminFamily',
          'listSubFamilys',
          'toolBar',
          'searchText',
        ], '')
        .setIn([
          'adminFamily',
          'openList',
        ], false)
    }
    case HANDLE_CLICK_SAVE_LIST: {
      const {
        currentDataFamily,
      } = action

      const dataSubFamilyList = state.getIn([
        'adminFamily',
        'listSubFamilys',
        'body',
        'dataListSubFamily',
      ]);
      const selected = state.getIn([
        'adminFamily',
        'listSubFamilys',
        'selectedList',
      ]);
      const deleteRows = state.getIn([
        'adminFamily',
        'table',
        'body',
        'rowsDeleteAdmin',
      ]);

      const selectedSubFamilyList = dataSubFamilyList.filter(
        row => selected.includes(row.Id)
      )

      const newDataSubFamily = [
        ...currentDataFamily,
        ...selectedSubFamilyList,
      ]

      const newDeleteRows = deleteRows.filter(
        row => !newDataSubFamily.some(
          row2 => row2.Id === row.Id
        )
      )

      return state
        .setIn([
          'adminFamily',
          'openList',
        ], false)
        .setIn([
          'adminFamily',
          'listSubFamilys',
          'toolBar',
          'searchText',
        ], '')
        .setIn([
          'adminFamily',
          'listSubFamilys',
          'selectedList',
        ], [])
        .setIn([
          'adminFamily',
          'table',
          'body',
          'rowsDeleteAdmin',
        ], newDeleteRows)
        .setIn([
          'adminFamily',
          'table',
          'body',
          'dataSubFamily',
        ], newDataSubFamily)
        .setIn([
          'adminFamily',
          'totalSubFamilys',
        ], newDataSubFamily.length)
    }
    case HANDLE_CLICK_EXIT_VALIDATION: {
      const {
        prop,
      } = action;

      return state
        .setIn([
          'adminFamily',
          'openModalConfirmExit',
        ], prop)
    }
    case HANDLE_CLICK_SAVE_VALIDATION: {
      const {
        option,
      } = action

      if (option === 0) {
        const name = state.getIn([
          'adminFamily',
          'nameFamily',
        ]);

        if (name.trim().length === 0) {
          return state
            .setIn([
              'adminFamily',
              'openModalSave',
            ], true)
            .setIn([
              'adminFamily',
              'markRequired',
            ], true)
        }
        return state
          .setIn([
            'adminFamily',
            'saveSubFamilys',
          ], true)
      }

      if (option === 1) {
        return state
          .setIn([
            'adminFamily',
            'openModalSave',
          ], false)
      }
      return state;
    }
    case REQUEST_SAVE_SUBFAMILYS: {
      return state
        .setIn([
          'adminFamily',
          'saveSubFamilys',
        ], false)
    }
    case SHOW_MODAL_SUCCESS: {
      const {
        modal,
      } = action

      return state
        .setIn([
          'adminFamily',
          modal,
        ], true)
    }
    case SHOW_MODAL_ERROR_SAVE: {
      const {
        modal,
        value,
      } = action

      return state
        .setIn([
          'adminFamily',
          modal,
        ], value)
    }
    case CHANGE_MODAL_CHARGES: {
      const {
        idFamilySelected,
        modalCharge,
      } = action;
      return state
        .setIn([
          'chargesFamily',
          'idFamilySelected',
        ], idFamilySelected)
        .setIn([
          'chargesFamily',
          'modalCharge',
        ], modalCharge)
    }
    case SET_CHARGES_DEPARTAMENT: {
      const {
        listCharges,
      } = action;
      return state
        .setIn([
          'chargesFamily',
          'listCharges',
        ], fromJS(listCharges))
        .setIn([
          'chargesFamily',
          'listChargesOrigin',
        ], fromJS(listCharges))
    }
    case SELECTED_CHARGE: {
      const {
        IdPuesto,
        Checked,
      } = action;
      const listCharges = state.getIn([
        'chargesFamily',
        'listCharges',
      ]);
      const itemCharge = listCharges.findIndex(
        charge => charge.get('IdPuesto') === IdPuesto
      )
      return state
        .setIn([
          'chargesFamily',
          'listCharges',
          itemCharge,
          'Checked',
        ], fromJS( Checked ? 0 : 1 ))
    }
    default:
      return state;
  }
}

export default reducer;
