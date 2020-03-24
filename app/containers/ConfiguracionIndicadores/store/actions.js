/*
 *
 * ConfiguracionIndicadores actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/CONFIGURACION_INDICADORES/',
  subfix: '_ACTION',
});

Actions.name('DEFAULT').set(
  type =>
    function defaultAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_STEPPER').set(
  type =>
    function setStepper(stepper = 0) {
      return {
        type,
        stepper,
      };
    },
);

Actions.name('REQUEST_INDICATORS_DEPARTMENT_POSITION').set(
  type =>
    function requestIndicatorsDepartmentPositionAction(rowSelected) {
      return {
        type,
        rowSelected,
      };
    },
);

Actions.name('HANDLE_CLICK_BUTTON_SEARCH').set(
  type =>
    function handleClickButtonSearch() {
      return {
        type,
      };
    },
);

Actions.name('HANDLE_CHANGE_TEXT_SEARCH').set(
  type =>
    function handleChangeTextSearch(text) {
      return {
        type,
        text,
      };
    },
);

Actions.name('HANDLE_CHANGE_TYPE_PROCESS').set(
  type =>
    function handleChangeTypeProcess(value) {
      return {
        type,
        value,
      };
    },
);

Actions.name('HANDLE_CLICK_CHECK_TABLE').set(
  type =>
    function handleClickCheckTable(rowSelected){
      return {
        type,
        rowSelected,
      }
    }
)

Actions.name('HANDLE_OPEN_DIALOG').set(
  type =>
    function handleOpenDialog(dialog){
      return {
        type,
        dialog,
      }
    }
)

Actions.name('HANDLE_CLOSE_DIALOG').set(
  type =>
    function handleCloseDialog(dialog){
      return {
        type,
        dialog,
      }
    }
)

Actions.name('HANDLE_CLICK_DELETE_ROW').set(
  type =>
    function handleClickDeleteRow(rowSelected){
      return {
        type,
        rowSelected,
      }
    }
)

Actions.name('HANDLE_CLICK_LEAVE_DIALOG').set(
  type => 
    function hanleClickLeaveDialog(dialog){
      return {
        type,
        dialog,
      }
    }
)

Actions.name('SET_TEXT_FIELD').set(
  type => 
    function setTextField(textfield, value){
      return {
        type,
        textfield, 
        value,
      }
    }
)

Actions.name('ON_CHANGE_COMBO').set(
  type => 
    function onChangeCombo(index, selected){
      return {
        type,
        index,
        selected,
      }
    }
)

Actions.name('SET_BONUS').set(
  type => 
    function setBonus(){
      return {
        type,
      }
    }
)

Actions.name('SET_BONUS_EDITAR').set(
  type => 
    function setBonusEditar(bonus){
      return {
        type,
        bonus,
      }
    }
)

Actions.name('REQUEST_GET_COMBOS').set(
  type => 
    function requestGetCombos(){
      return {
        type,
      }
    }
)

Actions.name('SET_COMBOS').set(
  type => 
    function setCombos(data){
      return {
        type,
        data,
      }
    }
)

Actions.name('SET_DEPENDING_COMBOS').set(
  type => 
    function setDependingCombos(combo, data){
      return {
        type,
        combo,
        data,
      }
    }
)

Actions.name('CLEAN_DEPENDING_COMBOS').set(
  type => 
    function cleanDepending(combo){
      return {
        type,
        combo,
      }
    }
)

Actions.name('REQUEST_POST_INDICATOR').set(
  type => 
    function requestPostIndicator(){
      return {
        type,
      }
    }
)

Actions.name('VALIDATE_INPUT_MINIMUM_LENGTH').set(
  type => 
    function validateInputMinimumLength(input, length, message){
      return {
        type,
        input,
        length,
        message,
      }
    }
)

Actions.name('VALIDATE_SEMAPHORE').set(
  type => 
    function validateSemaphore(input, lessThan, greaterThan){
      return {
        type,
        input,
        lessThan,
        greaterThan,
      }
    }
)

Actions.name('REQUEST_INDICATOR_CONFIGURATION').set(
  type => 
    function requestIndicatorConfiguration(){
      return {
        type,
      }
    }
)

Actions.name('REQUEST_INDICATORS_WEIGHT').set(
  type => 
    function requestIndicatorsWeight(){
      return {
        type,
      }
    }
)

Actions.name('SET_INDICATOR_CONFIGURATION').set(
  type => 
    function setIndicatorConfiguration(data){
      return {
        type,
        data,
      }
    }
)

Actions.name('SET_DEPARTMENT_POSITION').set(
  type => 
    function setDepartmentPosition(selectedDepartment, selectedPosition){
      return {
        type,
        selectedDepartment,
        selectedPosition,
      }
    }
)

Actions.name('SET_INDICATORS').set(
  type => 
    function setIndicators(data = []){
      return {
        type,
        data,
      }
    }
)

Actions.name('SET_DEPARTMENT_POSITION_ID').set(
  type => 
    function setDepartmentPositionId(selectedDepartment, selectedPosition){
      return {
        type,
        selectedDepartment,
        selectedPosition,
      }
    }
)

Actions.name('REQUEST_CHANGE_INDICATOR_STATUS').set(
  type => 
    function requestChangeConfigurationStatus(rowSelected){
      return {
        type,
        rowSelected,
      }
    }
)

Actions.name('RESET_ROWS').set(
  type => 
    function resetRows(){
      return {
        type,
      }
    }
)

Actions.name('REQUEST_EDIT_INDICATOR').set(
  type => 
    function requestEditIndicator(selectedIndicator, selectedDepartment, selectedPosition){
      return {
        type,
        selectedIndicator, 
        selectedDepartment, 
        selectedPosition,
      }
    }
)

Actions.name('SET_EDIT').set(
  type => 
    function setEdit(edit){
      return {
        type,
        edit, 
      }
    }
)

Actions.name('SET_ID_INDICATOR_DETAIL').set(
  type => 
    function setIdIndicatorDetail(selectedIndicatorDetail){
      return {
        type,
        selectedIndicatorDetail, 
      }
    }
)

Actions.name('RESET_INDICATOR_DATA').set(
  type => 
    function resetIndicatorData(){
      return {
        type,
      }
    }
)

Actions.name('OBTENER_PERMISOS').set(
  type =>
    function obtenerPermisos() {
      return {
        type,
      };
    },
);

Actions.name('SET_PERMISOS').set(
  type =>
    function setPermisos(payload) {
      return {
        type,
        payload,
      };
    },
);

Actions.name('SET_INDICATORS_COMBO').set(
  type =>
    function setIndicatorsCombo(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('SET_MENU_FILTER_INDEX').set(
  type =>
    function setMenuFilters(menuFilterIndex) {
      return {
        type,
        menuFilterIndex,
      };
    },
);

Actions.name('SET_DIALOG_BACK').set(
  type =>
    function setDialogBack() {
      return {
        type,
      };
    },
);

Actions.name('GET_GRUPOS').set(
  type =>
    function getGrupos() {
      return {
        type,
      };
    },
);

Actions.name('SET_GRUPOS').set(
  type =>
    function setGrupos(data) {
      return {
        type,
        data,
      };
    },
);

export default Actions;

