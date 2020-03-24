/*
 *
 * ListadoFamilias actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';

export const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINERS/NEGOCIACIONES/CATALOGOS/LISTADOFAMILIAS/',
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
  HANDLE_CLICK_BUTTON_SEARCH: (type) =>
    function changeStatusActiveSearch() {
      return {
        type,
        // payload,
      }
    },
  HANDLE_CHANGE_TEXT_SEARCH: (type) =>
    function changeTextSearch(text) {
      return {
        type,
        text,
      }
    },
  REQUEST_GET_FAMILY: (type) =>
    function getFamilys(payload) {
      return {
        type,
        payload,
      }
    },
  REQUEST_GET_FAMILY_SUCCESS: (type) =>
    function updateListFamily(payload) {
      return {
        type,
        payload,
      }
    },
  REQUEST_UPDATE_STATUS_FAMILY: (type) =>
    function updateStatusFamily(payload) {
      return {
        type,
        payload,
      }
    },
  HANDLE_CLICK_ADD_FAMILY: (type) =>
    function updateStepper(step){
      return {
        type,
        step,
      }
    },
  HANDLE_CLICK_BACK_FAMILY: (type) =>
    function backPage(step){
      return {
        type,
        step,
      }
    },
  HANDLE_CLICK_EDIT_FAMILY: (type) =>
    function updateStepper(payload){
      return {
        type,
        payload,
      }
    },
  REQUEST_CLICK_EDIT_FAMILY_SUCCESS: (type) =>
    function updateDataAdmin(payload){
      return {
        type,
        payload,
      }
    },
  HANDLE_CLICK_BUTTON_SEARCH_ADMIN: (type) =>
    function changeStatusActiveSearch() {
      return {
        type,
      }
    },
  HANDLE_CHANGE_TEXT_SEARCH_ADMIN: (type) =>
    function changeTextSearch(text) {
      return {
        type,
        text,
      }
    },
  HANDLE_CLICK_DELETE_ROW_ADMIN_FAMILY: (type) =>
    function updateStatusFamily(payload) {
      return {
        type,
        payload,
      }
    },
  HANDLE_CHANGE_TEXT_NAME_FAMILY: (type) =>
    function updateStatusFamily(text) {
      return {
        type,
        text,
      }
    },
  HANDLE_CLICK_ADD_SUBFAMILY: (type) =>
    function openListSubFamilys(dataSubFamily, rowsDelete) {
      return {
        type,
        dataSubFamily,
        rowsDelete,
      }
    },
  HANDLE_CLICK_ADD_SUBFAMILY_SUCCESS: (type) =>
    function openListSubFamilys(payload) {
      return {
        type,
        payload,
      }
    },
  HANDLE_CLICK_BUTTON_SEARCH_LIST: (type) =>
    function changeStatusActiveSearchList() {
      return {
        type,
        // payload,
      }
    },
  HANDLE_CHANGE_TEXT_SEARCH_LIST: (type) =>
    function changeTextSearchList(text) {
      return {
        type,
        text,
      }
    },
  HANDLE_CLICK_CHECK_LIST: (type) =>
    function changeTextSearchList(payload) {
      return {
        type,
        payload,
      }
    },
  HANDLE_CLICK_LEAVE_LIST: (type) =>
    function clickLeaveList() {
      return {
        type,
      }
    },
  HANDLE_CLICK_SAVE_LIST: (type) =>
    function clickSaveList(currentDataFamily) {
      return {
        type,
        currentDataFamily,
      }
    },
  HANDLE_CLICK_EXIT_VALIDATION: (type) =>
    function validationExit(prop){
      return {
        type,
        prop,
      }
    },
  HANDLE_CLICK_SAVE_VALIDATION: (type) =>
    function validationDataSave(option){
      return {
        type,
        option,
      }
    },
  REQUEST_SAVE_SUBFAMILYS: (type) =>
    function saveSubfamilys(payload){
      return {
        type,
        payload,
      }
    },
  SHOW_MODAL_SUCCESS:(type) =>
    function updateValueModalSuccess(modal) {
      return {
        type,
        modal,
      }
    },
  SHOW_MODAL_ERROR_SAVE:(type) =>
    function updateValueModalError(modal, value) {
      return {
        type,
        modal,
        value,
      }
    },
  GET_CHARGES_DEPARTAMENT:(type) =>
    function getChargesDepartament(
      idFamilySelected = 0,
      modalCharge = false,
    ) {
      return {
        type,
        idFamilySelected,
        modalCharge,
      }
    },
  SET_CHARGES_DEPARTAMENT:(type) =>
    function setChargesDepartament(
      listCharges = [],
    ) {
      return {
        type,
        listCharges,
      }
    },
  SELECTED_CHARGE:(type) =>
    function selectedCharge(
      IdPuesto = 0,
      Checked = false,
    ) {
      return {
        type,
        IdPuesto,
        Checked,
      }
    },
  CHANGE_MODAL_CHARGES:(type) =>
    function changeModalCharges(
      idFamilySelected = 0,
      modalCharge = false,
    ) {
      return {
        type,
        idFamilySelected,
        modalCharge,
      }
    },
  SAVE_CHARGE_FAMILY:(type) =>
    function saveChargeFamily(
      IdFamily = 0,
      add = "",
      del = "",
    ) {
      return {
        type,
        IdFamily,
        add,
        del,
      }
    },
};
Object.keys(ACTION_KEYS).forEach((action) => {
  Actions
    .name(action)
    .set(ACTION_KEYS[action])
});

export default Actions;
