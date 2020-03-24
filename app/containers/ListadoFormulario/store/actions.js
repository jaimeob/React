/*
 *
 * ListadoFormulario actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';

export const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINERS/LISTADOFORMULARIO/',
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
  HANDLE_CLICK_ITEM_GROUP_LIST: (type) =>
    function changeIndexTabs(index) {
      return {
        type,
        index,
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
  HANDLE_CHANGE_INDEX_TABS_VIEW: (type) =>
    function changeIndexTabs(index) {
      return {
        type,
        index,
      }
    },
  HANDLE_CHANGE_INDEX_TABS_LIST: (type) =>
    function changeIndexTabsList(index) {
      return {
        type,
        index,
      }
    },
  HANDLE_CLICK_CHECK_USERS: (type) =>
    function clickCheckSelectUser(index, data, checked, user) {
      return {
        type,
        index,
        data,
        checked,
        user,
      }
    },
  HANDLE_CLICK_CHECK_ALL: (type) =>
    function clickCheckAll(checked, options = {}) {
      return {
        type,
        checked,
        options,
      }
    },
  HANDLE_TEXT_SEARCH_CHANGE_LIST: (type) =>
    function textSearchChangeList(text) {
      return {
        type,
        text,
      }
    },
  HANDLE_CLICK_BUTTON_ADD_USERS: (type) =>
    function getUsersDepartament(id) {
      return {
        type,
        id,
      }
    },
  HANDLE_CLICK_BUTTON_ADD_USERS_SUCCESS: (type) =>
    function clickButtonAddUsersSuccess(data) {
      return {
        type,
        data,
      }
    },
  HANDLE_CLICK_BUTTONS_ASSING: (type) =>
    function clickButtonAddUsers(flag) {
      return {
        type,
        flag,
      }
    },
  HANDLE_CLICK_ACCEPT_CLEAR : (type) =>
    function clickAcceptClear() {
      return {
        type,
      }
    },
  HANDLE_CHANGE_INDEX_TABS: (type) =>
    function handleChangeIndexTabs(event, value) {
      return {
        type,
        index: value,
      }
    },
  REQUEST_DEPARTAMENTS_FORMS_LIST : (type) =>
    function getDeptosForms(user) {
      return {
        type,
        user,
      }
    },
  REQUEST_DEPARTAMENTS_FORMS_LIST_SUCCESS : (type) =>
    function getDeptosFormsSuccess(data) {
      return {
        type,
        data,
      }
    },
  REQUEST_FORMS_TEMPLATES : (type) =>
    function getFormsTemplates(formulario, departamentId, idMongoDepartament) {
      return {
        type,
        formulario,
        departamentId,
        idMongoDepartament,
      }
    },
  REQUEST_FORMS_TEMPLATES_SUCCESS : (type) =>
    function getFormsTemplatesSuccess(payload) {
      return {
        type,
        ...payload,
      }
    },
  REQUEST_FORMS_ASSIGN : (type) =>
    function getFormsAssing(departamentId, configFormularioId) {
      return {
        type,
        departamentId,
        configFormularioId,
      }
    },
  REQUEST_FORMS_ASSIGN_SUCCESS : (type) =>
    function fillDataAssign(data) {
      return {
        type,
        data,
      }
    },
  REQUEST_TOGGLE_ASSIGNATIONS: (type) =>
    function requestToggleAssignations() {
      return {
        type,
      }
    },
  UPDATE_SELECTED_TAB: (type) =>
    function updateSelectedTab(index) {
      return {
        type,
        index,
      };
    },
};
Object.keys(ACTION_KEYS).forEach((action) => {
  Actions
    .name(action)
    .set(ACTION_KEYS[action])
});



export default Actions;
