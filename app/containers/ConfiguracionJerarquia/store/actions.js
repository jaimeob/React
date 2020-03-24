/*
 *
 * ConfiguracionJerarquia actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/CONFIGURACION_JERARQUIA/',
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

Actions.name('SET_MODAL_DELETE').set(
  type =>
    function setModalDelete() {
      return {
        type,
      };
    },
);

Actions.name('REQUEST_GET_DATA').set(
  type =>
    function requestGetData() {
      return {
        type,
      };
    },
);

Actions.name('SET_DATA').set(
  type =>
    function setDetail(data = []) {
      return {
        type,
        data,
      };
    },
);

Actions.name('REQUEST_UPDATE_STATUS_DATA').set(
  type =>
    function requestUpdateStatusData(status = 1, dataIds = []) {
      return {
        type,
        status,
        dataIds,
      };
    },
);

Actions.name('SET_SELECTED_ITEMS').set(
  type =>
    function setSelectedItems(selectedItems = []) {
      return {
        type,
        selectedItems,
      };
    },
);

Actions.name('REQUEST_GET_DEPARTMENTS_AND_POSITIONS').set(
  type =>
    function requestGetDepartmentsAndPositions() {
      return {
        type,
      };
    },
);

Actions.name('SET_DEPARTMENTS_AND_POSITIONS').set(
  type =>
    function setDepartmentsAndPositions(departments = [], positions = []) {
      return {
        type,
        departments, 
        positions,
      };
    },
);

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

Actions.name('SET_JERARQUIA').set(
  type => 
    function setJerarquia(jerarquia){
      return {
        type,
        jerarquia,
      }
    }
)

Actions.name('REQUEST_POST_JERARQUIA').set(
  type => 
    function requestPostJerarquia(data){
      return {
        type,
        data,
      }
    }
)

Actions.name('RESET_LISTADO_JERARQUIA').set(
  type => 
    function reseetListadoJerarquia(data){
      return {
        type,
        data,
      }
    }
)

Actions.name('REGRESAR_LISTADO').set(
  type => 
    function regresarListado(){
      return {
        type,
      }
    }
)

Actions.name('SET_MODAL_BACK').set(
  type =>
    function setModalBack() {
      return {
        type,
      };
    },
);

Actions.name('REQUEST_EDIT_JERARQUIA').set(
  type =>
    function requestEditJerarquia(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('SET_EDIT_JERARQUIA').set(
  type =>
    function setEditJerarquia(payload) {
      return {
        type,
        payload,
      };
    },
);

Actions.name('SET_TOTAL_POSITIONS').set(
  type =>
    function setTotalPositions(totalPositions) {
      return {
        type,
        totalPositions,
      };
    },
);

Actions.name('SET_IMAGE_FILE').set(
  type =>
    function setImageFile(imageFile) {
      return {
        type,
        imageFile,
      };
    },
);

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

Actions.name('RESET_CONTAINER').set(
  type =>
    function resetContainer() {
      return {
        type,
      };
    },
);

Actions.name('SET_ACTIVE').set(
  type =>
    function setActive(active = false) {
      return {
        type,
        active,
      };
    },
);

Actions.name('SET_NAME').set(
  type =>
    function setName(name) {
      return {
        type,
        name,
      };
    },
);

Actions.name('REQUEST_NAME').set(
  type =>
    function requestName(name) {
      return {
        type,
        name,
      };
    },
);

Actions.name('SET_ERROR').set(
  type =>
    function setError(error, errorLabel) {
      return {
        type,
        error,
        errorLabel,
      };
    },
);

Actions.name('SET_TOGGLE_MODAL').set(
  type =>
    function setToggleModal() {
      return {
        type,
      };
    },
);

export default Actions;