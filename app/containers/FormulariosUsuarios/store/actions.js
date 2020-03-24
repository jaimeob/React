/*
 *
 * Formularios actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';

export const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINERS/FORMULARIOSUSUARIOS/',
  subfix: '_ACTION',
});

export const ACTION_KEYS = {
  DEFAUL_ACTION: (type) =>
    function deleteCellSelectOption(index) {
      return {
        type,
        index,
      }
    }, 
  HANDLE_CHANGE_INDEX_TABS: (type) =>
    function changeIndexTabs(index) {
      return {
        type,
        index,
      }
    },
  HANDLE_CLICK_ITEM_GROUP_LIST: (type) =>
    function changeIndexTabs(index, indexTab) {
      return {
        type,
        index,
        indexTab,
      }
    },
  HANDLE_CLICK_BUTTON_SEARCH: (type) =>
    function changeIndexTabs() {
      return {
        type,
      }
    },
  HANDLE_CHANGE_TEXT_SEARCH: (type) =>
    function changeIndexTabs(text) {
      return {
        type,
        text,
      }
    },
  HANDLE_UPDATE_UI: (type) =>
    function handleUpdateFormUi() {
      return {
        type,
      }
    },
  REQUEST_GET_FORMS_USER: (type) =>
    function getFormsUser(user) {
      return {
        type,
        user,
      }
    },
  UPDATE_COMPONENT_PROP: (type) =>
    function onUpdateComponentProp(idx, prop = '', value, order) {
      return {
        type,
        idx,
        prop,
        value,
        order,
      }
    },
  REQUEST_GET_FORMS_USER_SUCCESS: (type) =>
    function getFormsUser(data) {
      return {
        type,
        data,
      }
    },
  REQUEST_GET_ASSIGNED_FORMS: (type) =>
    function requestGetAssignedForms() {
      return {
        type,
      };
    },
  REQUEST_GET_ASSIGNED_FORMS_SUCCESS: (type) =>
    function requestGetAssignedFormsSuccess(data) {
      return {
        type,
        data,
      };
    },
  REQUEST_GET_ASSIGNED_FORMS_FAILED: (type) =>
    function requestGetAssignedFormsFailed(error, message) {
      return {
        type,
        error,
        message,
      };
    },
  REQUEST_SAVE_CHANGES: (type) => 
    function requestSaveChanges(Finalizar) {
      return {
        type,
        Finalizar,
      };
    },
  REQUEST_SAVE_CHANGES_SUCCESS: (type) => 
    function requestSaveChangesSuccess(data) {
      return {
        type,
        data,
      };
    },
  REQUEST_SAVE_CHANGES_FAILED: (type) => 
    function requestSaveChangesFailed() {
      return {
        type,
      };
    },
  CHANGE_SELECTED_USER: (type) =>
    function changeSelectedUser(user, prevId) {
      return {
        type,
        user,
        prevId,
      }
    },
  CHANGE_SELECTED_FORM: (type) =>
    function requestUpdateFormsValues(formulario, index) {
      return {
        type,
        formulario,
        index,
      };
    },
  UPDATE_DATA_UI: (type) =>
    function updateDataUi(data = {}) {
      return {
        type,
        data,
      }
    },
};
Object.keys(ACTION_KEYS).forEach((action) => {
  Actions
    .name(action)
    .set(ACTION_KEYS[action])
});



export default Actions;
