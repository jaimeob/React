/*
 *
 * Formularios actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';

export const Actions = new ActionsGenerator({
  prefix: 'APP/COMPONENTS/LAYOUT_FORMULARIO',
  subfix: '_ACTION',
});

// APP/CONTAINERS/FORMULARIOS/DELETE_TABLE_COLUMN_ACTION

export const ACTION_KEYS = {
  CLONE_COMPONENTS: (type) =>
    (componentesformularios) => ({
      type,
      componentesformularios,
    }),
  RESET_FRONTEND: (type) =>
    () => ({
      type,
    }),
  DELETE_TABLE_COLUMN: (type) =>
    (idxComp, idxCol, idxRow) => ({
      type,
      idxComp,
      idxCol,
      idxRow,
    }),
  DELETE_CELL_SELECT_OPTION: (type) =>
    (index) => ({
      type,
      index,
    }),
  ON_CLICK_COMPONENT_TABLE_ROW: (type) => 
    (row, idxComp, idxRow) => ({
      type,
      row,
      idxComp,
      idxRow,
    }),
  ADD_SELECT_OPTION: (type) =>
    () => ({
      type,
    }),
  UPDATE_ROW_COL_DATA: (type) => 
    (idxComp = null, idxRow = null, idxCol = null, prop = '', value = '') => ({
      type,
      idxComp,
      idxRow,
      idxCol,
      prop,
      value, 
    }),
  UPDATE_COMPONENT_ROWGROUP: (type) =>
    (idx, idxRow, value) => ({
      type,
      idx,
      idxRow,
      value,
    }),
  RESTORE_STORAGE: (type) => 
    (data) => ({
      type,
      data,
    }),
  ADD_NEW_ROW_DATA: (type) =>
    (elemType = '', idx) => ({
      type,
      elemType,
      idx,
    }),
  UPDATE_COMPONENT_CELL_PROP: (type) => 
    (idxCol = null, prop = '', value) => ({
      type,
      idxCol,
      prop,
      value,
    }),
  UPDATE_COMPONENT_PROP_ERROR: (type) =>
    (idx, prop = '', value) => ({
      type,
      idx,
      prop,
      value,
    }),
  ON_ADD_CONFIG_COMPONENT: (type) =>
    (data, idx) => ({
      type,
      data,
      idx,
    }),
  UPDATE_COMPONENT_PROP: (type) => (idx, prop = '', value) => ({
    type,
    idx,
    prop,
    value,
  }),
  ON_DELETE_CONFIG_COMPONENT: (type) =>
    (idx) => ({
      type,
      idx,
    }),
  ON_SELECT_CONFIG_COMPONENT: (type) => 
    (comp, index = -1) => ({
      type,
      comp,
      index,
    }),
  UPDATE_FILE_LOGO: (type) =>
    (file) => ({
      type,
      file,
    }),
  DELETE_FILE_LOGO: (type) =>
    () => ({
      type,
    }),
  UPDATE_FORM_CONTROL: (type) =>
    (prop, value) => ({
      type,
      prop,
      value,
    }),
  UPDATE_INPUT: (type) =>
    (event) => ({
      type,
      name: event.target.name,
      value: event.target.value,
    }),
  ON_CLICK_TABLE_CELL: (type) =>
    (col, idx, idc, idr) => ({
      type,
      col,
      idx,
      idc,
      idr,
    }),
  ON_CLICK_COMPONENT_LAYOUT: (type) =>
    (idx) => ({
      type,
      idx,
    }),
  ON_CLICK_EDIT: (type) =>
    (id = '') => ({
      type,
      id,
    }),
  /* UI ACTIONS */
  UPDATE_MODAL_STATE: (type) =>
    (uiProp, val) => ({
      type,
      uiProp,
      val,
    }),
  UPDATE_PUBLISH_MODAL: (type) =>
    (ui) => ({
      type,
      ui,
    }),
  TOGGLE_EDIT_MODE: (type) =>
    (active) => ({
      type,
      active,
    }),
  HANDLE_CLICK_BUTTON_SEARCH_LIST: (type) =>
    () => ({
      type,
    }),
  HANDLE_TEXT_SEARCH_CHANGE_LIST: (type) =>
    (text) => ({
      type,
      text,
    }),
  HANDLE_MOUSE_ENTER_ROW: (type) =>
    () => ({
      type,
    }),
  HANDLE_MOUSE_LEAVE_ROW: (type) =>
    () => ({
      type,
    }),
  HANDLE_CLICK_FILTER_LIST: (type) =>
    (text) => ({
      type,
      text,
    }),
  HANDLE_STEP_GO_FIRST_PAGE: (type) =>
    () => ({
      type,
    }),
  HANDLE_STEP_MERGE_STATE: (type) =>
    (stepper) => ({
      type,
      stepper,
    }),
  /* REQUESTS ACTIONS */
  REQUEST_FORMS_LIST: (type) =>
    (status) => ({
      type,
      status,
    }),
  REQUEST_FORMS_LIST_SUCCESS: (type) =>
    (payload) => ({
      type,
      payload,
    }),
  REQUEST_UPDATE_STATUS_FORMS_LIST: (type) =>
    (body, filter) => ({
      type,
      body,
      filter,
    }),
  REQUEST_DEPARTAMENTOS: (type) =>
    () => ({
      type,
    }),
  REQUEST_FORMULARIOS: (type) =>
    () => ({
      type,
    }),
  REQUEST_FORMULARIOS_SUCCESS: (type) =>
    (payload) => ({
      type,
      payload,
    }),
  REQUEST_DEPARTAMENTOS_SUCCESS: (type) =>
    (payload) => ({
      type,
      payload,
    }),
  REQUEST_DEPARTAMENTOS_FAILED: (type) =>
    (payload) => ({
      type,
      payload,
    }),
  REQUEST_VALIDATE_NOMBRE_FORM: (type) =>
    (name, val, newVal) => ({
      type,
      name,
      val,
      newVal,
    }),
  REQUEST_VALIDATE_NOMBRE_FORM_SUCCESS: (type) =>
    (prop = '', data) => ({
      type,
      prop,
      data,
    }),
  REQUEST_VALIDATE_NOMBRE_FORM_FAILED: (type) =>
    (error) => ({
      type,
      error,
    }),
  UPDATE_LOADING_UI: (type) => 
    (prop, val) => ({
      type,
      prop,
      val,
    }),
  REQUEST_SAVE_CONFIGURACION_FORM: (type) =>
    () => ({
      type,
    }),
  REQUEST_SAVE_DET_CONFIGURACION_FORM: (type) => 
    () => ({
      type,
    }),
  REQUEST_SAVE_DET_CONFIGURACION_FORM_SUCCESS: (type) =>
    (payload) => ({
      type,
      ...payload,
    }),
  REQUEST_SAVE_DET_CONFIGURACION_FORM_FAILED: (type) =>
    (payload) => ({
      type,
      ...payload,
    }),
  REQUEST_SAVE_CONFIGURACION_FORM_SUCCESS: (type) =>
    (data) => ({
      type,
      data,
    }),
  REQUEST_SAVE_CONFIGURACION_FORM_FAILED: (type) =>
    (error) => ({
      type,
      error,
    }),
  REQUEST_DESACTIVAR_CONFIGURACION: (type) =>
    (id) => ({
      type,
      id,
    }),
  REQUEST_DESACTIVAR_CONFIGURACION_SUCCESS: (type) =>
    () => ({
      type,
    }),
  REQUEST_DESACTIVAR_CONFIGURACION_FAILED: (type) =>
    () => ({
      type,
    }),
  REQUEST_FAILED: (type) => 
    (actionId, payload) => ({
      type,
      actionId,
      payload,
    }),
  REQUEST_PUBLISH_CFG_FORM: (type) =>
    () => ({
      type,
    }),
  REQUEST_PUBLISH_CFG_FORM_SUCCESS: (type) =>
    () => ({
      type,
    }),
  REORDER_COMPONENTS: (type) =>
    () => ({
      type,
    }),
  /* STEPPER HANDLERS */
  HANDLE_STEP_GO_NEXT: (type) =>
    () => ({
      type,
    }),
  HANDLE_STEP_GO_BACK: (type) =>
    (step = -1) => ({
      type,
      step,
    }),
  SAVE_CURRENT_STATE: (type) =>
    () => ({
      type,
    }),
};
Object.keys(ACTION_KEYS).forEach((action) => {
  Actions
    .name(action)
    .set(ACTION_KEYS[action])
});



export default Actions;
