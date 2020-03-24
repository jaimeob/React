/*
 *
 * Formularios actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';

export const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINERS/FORMULARIOS/',
  subfix: '_ACTION',
});

// APP/CONTAINERS/FORMULARIOS/DELETE_TABLE_COLUMN_ACTION

export const ACTION_KEYS = {
  CLONE_COMPONENTS: (type) =>
    function cloneComponentsAction(componentesformularios) {
      return {
        type,
        componentesformularios,
      };
    },
  RESET_FRONTEND: (type) =>
    function resetFrontend() {
      return {
        type,
      };
    },
  DELETE_TABLE_COLUMN: (type) =>
    function deleteTableColumn(idxComp, idxCol, idxRow) {
      return {
        type,
        idxComp,
        idxCol,
        idxRow,
      }
    },
  DELETE_CELL_SELECT_OPTION: (type) =>
    function deleteCellSelectOption(index) {
      return {
        type,
        index,
      }
    },
  ON_CLICK_COMPONENT_TABLE_ROW: (type) => 
    function onClickComponentTableRow(row, idxComp, idxRow) {
      return {
        type,
        row,
        idxComp,
        idxRow,
      }
    },
  ADD_SELECT_OPTION: (type) =>
    function addSelectOption() {
      return {
        type,
      }
    },
  UPDATE_ROW_COL_DATA: (type) => 
    function updateRowColData(idxComp = null, idxRow = null, idxCol = null, prop = '', value = '') {
      return {
        type,
        idxComp,
        idxRow,
        idxCol,
        prop,
        value, 
      }
    },
  UPDATE_COMPONENT_ROWGROUP: (type) =>
    function updateComponentRowgroup(idx, idxRow, value) {
      return {
        type,
        idx,
        idxRow,
        value,
      }
    },
  RESTORE_STORAGE: (type) => 
    function restoreStorage(data) {
      return {
        type,
        data,
      }
    },
  ADD_NEW_ROW_DATA: (type) =>
    function addNewRowData(elemType = '', idx) {
      return {
        type,
        elemType,
        idx,
      }
    },
  UPDATE_COMPONENT_CELL_PROP: (type) => 
    function updateComponentCellProp(idxCol = null, prop = '', value) {
      return {
        type,
        idxCol,
        prop,
        value,
      }
    },
  UPDATE_COMPONENT_PROP_ERROR: (type) =>
    function onUpdateComponentErrorProp(idx, prop = '', value) {
      return {
        type,
        idx,
        prop,
        value,
      }
    },
  ON_ADD_CONFIG_COMPONENT: (type) =>
    function onAddConfigComponent(data, idx) {
      return {
        type,
        data,
        idx,
      }
    },
  UPDATE_COMPONENT_PROP: (type) =>
    function onUpdateComponentProp(idx, prop = '', value) {
      return {
        type,
        idx,
        prop,
        value,
      }
    },
  ON_DELETE_CONFIG_COMPONENT: (type) =>
    function onDeleteConfigComponent(idx) {
      return {
        type,
        idx,
      }
    },
  ON_SELECT_CONFIG_COMPONENT: (type) => 
    function onSelectedComponent(comp, index = -1) {
      return {
        type,
        comp,
        index,
      }
    },
  UPDATE_FILE_LOGO: (type) =>
    function udpateFileLogo(file) {
      return {
        type,
        file,
      }
    },
  DELETE_FILE_LOGO: (type) =>
    function deleteLogo() {
      return {
        type,
      };
    },
  UPDATE_FORM_CONTROL: (type) =>
    function updateFormControl(prop, value) {
      return {
        type,
        prop,
        value,
      };
    },
  UPDATE_INPUT: (type) =>
    function updateInput(event) {
      return {
        type,
        name: event.target.name,
        value: event.target.value,
      };
    },
  ON_CLICK_TABLE_CELL: (type) =>
    function onClickTableCell(col, idx, idc, idr) {
      return {
        type,
        col,
        idx,
        idc,
        idr,
      };
    },
  ON_CLICK_COMPONENT_LAYOUT: (type) =>
    function onClickComponentLayout(idx) {
      return {
        type,
        idx,
      }
    },
  ON_CLICK_EDIT: (type) =>
    function onClickEdit(id = '') {
      return {
        type,
        id,
      };
    },
  /* UI ACTIONS */
  UPDATE_MODAL_STATE: (type) =>
    function updateModalState(uiProp, val) {
      return {
        type,
        uiProp,
        val,
      }
    },
  UPDATE_PUBLISH_MODAL: (type) =>
    function updatePublishModal(ui) {
      return {
        type,
        ui,
      }
    },
  TOGGLE_EDIT_MODE: (type) =>
    function toggleEditMode(active) {
      return {
        type,
        active,
      }
    },
  HANDLE_CLICK_BUTTON_SEARCH_LIST: (type) =>
    function clickSearchList() {
      return {
        type,
      }
    },
  HANDLE_TEXT_SEARCH_CHANGE_LIST: (type) =>
    function textSearchChangeList(text) {
      return {
        type,
        text,
      }
    },
  HANDLE_MOUSE_ENTER_ROW: (type) =>
    function onMouseEnter() {
      return {
        type,
      }
    },
  HANDLE_MOUSE_LEAVE_ROW: (type) =>
    function onMouseEnter() {
      return {
        type,
      }
    },
  HANDLE_CLICK_FILTER_LIST: (type) =>
    function onClickFilterList(text) {
      return {
        type,
        text,
      }
    },
  HANDLE_STEP_GO_FIRST_PAGE: (type) =>
    function handleStepGoFirstPage() {
      return {
        type,
      }
    },
  HANDLE_STEP_MERGE_STATE: (type) =>
    function handleStepMergeState(stepper) {
      return {
        type,
        stepper,
      };
    },
  /* REQUESTS ACTIONS */
  REQUEST_FORMS_LIST: (type) =>
    function requestGetFormsList(status) {
      return {
        type,
        status,
      }
    },
  REQUEST_FORMS_LIST_SUCCESS: (type) =>
    function requestGetFormsListSuccess (payload) {
      return {
        type,
        payload,
      };
    },
  REQUEST_UPDATE_STATUS_FORMS_LIST: (type) =>
    function requestUpdateStatusFormsList(body, filter) {
      return {
        type,
        body,
        filter,
      }
    },
  REQUEST_DEPARTAMENTOS: (type) =>
    function reqDepartamentos() {
      return {
        type,
      }
    },
  REQUEST_FORMULARIOS: (type) =>
    function requestFormularios() {
      return {
        type,
      }
    },
  REQUEST_FORMULARIOS_SUCCESS: (type) =>
    function requestFormSuccess (payload) {
      return {
        type,
        payload,
      };
    },
  REQUEST_DEPARTAMENTOS_SUCCESS: (type) =>
    function reqDepartamentosSuccess(payload) {
      return {
        type,
        payload,
      }
    },
  REQUEST_DEPARTAMENTOS_FAILED: (type) =>
    function reqDepartamentosFailed(payload) {
      return {
        type,
        payload,
      }
    },
  REQUEST_VALIDATE_NOMBRE_FORM: (type) =>
    function validateNombreForm(name, val, newVal) {
      return {
        type,
        name,
        val,
        newVal,
      };
    },
  REQUEST_VALIDATE_NOMBRE_FORM_SUCCESS: (type) =>
    function validateNombreFormSuccess(prop = '', data) {
      return {
        type,
        prop,
        data,
      };
    },
  REQUEST_VALIDATE_NOMBRE_FORM_FAILED: (type) =>
    function validateNombreFormFailed(error) {
      return {
        type,
        error,
      };
    },
  UPDATE_LOADING_UI: (type) => 
    function updateLoading(prop, val) {
      return {
        type,
        prop,
        val,
      }
    },
  REQUEST_SAVE_CONFIGURACION_FORM: (type) =>
    function requestSaveConfiguracionForm() {
      return {
        type,
      }
    },
  REQUEST_SAVE_DET_CONFIGURACION_FORM: (type) => 
    function requestSaveDetConfiguracionForm() {
      return {
        type,
      };
    },
  REQUEST_SAVE_DET_CONFIGURACION_FORM_SUCCESS: (type) =>
    function requestSaveDetConfiguracionFormSuccess(payload) {
      return {
        type,
        ...payload,
      }
    },
  REQUEST_SAVE_DET_CONFIGURACION_FORM_FAILED: (type) =>
    function requestSaveDetConfiguracionFormFailed(payload) {
      return {
        type,
        ...payload,
      }
    },
  REQUEST_SAVE_CONFIGURACION_FORM_SUCCESS: (type) =>
    function requestSaveConfiguracionFormSuccess(data) {
      return {
        type,
        data,
      };
    },
  REQUEST_SAVE_CONFIGURACION_FORM_FAILED: (type) =>
    function requestSaveConfiguracionFormFailed(error) {
      return {
        type,
        error,
      };
    },
  REQUEST_DESACTIVAR_CONFIGURACION: (type) =>
    function requestDeactivateConfiguracionForm(id) {
      return {
        type,
        id,
      };
    },
  REQUEST_DESACTIVAR_CONFIGURACION_SUCCESS: (type) =>
    function requestDesactivarConfiguracionSuccess() {
      return {
        type,
      };
    },
  REQUEST_DESACTIVAR_CONFIGURACION_FAILED: (type) =>
    function requestDesactivarConfiguracionFailed() {
      return {
        type,
      };
    },
  REQUEST_FAILED: (type) => 
    function requestFailes(actionId, payload) {
      return {
        type,
        actionId,
        payload,
      };
    },
  REQUEST_PUBLISH_CFG_FORM: (type) =>
    function requestPublishCfgForm() {
      return {
        type,
      };
    },
  REQUEST_PUBLISH_CFG_FORM_SUCCESS: (type) =>
    function requestPublishCfgFormSuccess() {
      return {
        type,
      }
    },
  REORDER_COMPONENTS: (type) =>
    function reorderComponents() {
      return {
        type,
      }
    },
  /* STEPPER HANDLERS */
  HANDLE_STEP_GO_NEXT: (type) =>
    function goNextStep() {
      return {
        type,
      }
    },
  HANDLE_STEP_GO_BACK: (type) =>
    function goBackStep(step = -1) {
      return {
        type,
        step,
      }
    },
  SAVE_CURRENT_STATE: (type) =>
    function saveCurrentState() {
      return {
        type,
      };
    },
};
Object.keys(ACTION_KEYS).forEach((action) => {
  Actions
    .name(action)
    .set(ACTION_KEYS[action])
});



export default Actions;
