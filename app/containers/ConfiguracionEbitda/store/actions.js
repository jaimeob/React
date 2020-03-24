/*
 *
 * ConfiguracionEbitda actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/CONFIGURACION_EBITDA/',
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

Actions.name('REQUEST_GET_EBITDAS').set(
  type =>
    function requestGetEbitdas(status) {
      return {
        type,
        status,
      };
    },
);

Actions.name('SET_EBITDAS').set(
  type =>
    function setEbitdas(rows = []) {
      return {
        type,
        rows,
      };
    },
);

Actions.name('HANDLE_CLICK_BUTTON_SEARCH').set(
  type => 
    function handleClickButtonSearch() {
      return {
        type,
      }
    },
);

Actions.name('HANDLE_CHANGE_TEXT_SEARCH').set(
  type => 
    function handleChangeTextSearch(searchText) {
      return {
        type,
        searchText,
      }
    },
);

Actions.name('HANDLE_CLICK_CHECK_TABLE').set(
  type => 
    function handleClickCheckTable(rowSelected) {
      return {
        type,
        rowSelected,
      }
    },
);

Actions.name('HANDLE_CLICK_DELETE_ROW').set(
  type => 
    function handleClickDeleteRow(rowSelected) {
      return {
        type,
        rowSelected,
      }
    },
);

Actions.name('HANDLE_OPEN_DIALOG').set(
  type => 
    function handleOpenDialog(dialog) {
      return {
        type,
        dialog,
      }
    },
);

Actions.name('HANDLE_CLICK_LEAVE_DIALOG').set(
  type => 
    function handleClickLeaveDialog(dialog) {
      return {
        type,
        dialog,
      }
    },
);

Actions.name('REQUEST_UPDATE_STATUS_EBITDA').set(
  type => 
    function requestUpdateStatusEbitda(payload) {
      return {
        type,
        payload,
      }
    },
);

Actions.name('SET_STEPPER').set(
  type => 
    function setStepper(stepper) {
      return {
        type,
        stepper,
      }
    },
);

Actions.name('SET_PERIOD').set(
  type => 
    function setPeriod(period) {
      return {
        type,
        period,
      }
    },
);

Actions.name('REQUEST_POST_EBITDA').set(
  type => 
    function requestPostEbitda() {
      return {
        type,
      }
    },
);

Actions.name('REQUEST_EBITDA_YEAR').set(
  type =>
    function requestEbitdaYear(id, period) {
      return {
        type,
        id,
        period,
      }
    }
)

Actions.name('REQUEST_GET_PLAZAS').set(
  type =>
    function requestGetPlazas() {
      return {
        type,
      }
    }
)

Actions.name('SET_PLAZAS').set(
  type =>
    function setPlazas(plazas = []) {
      return {
        type,
        plazas,
      }
    }
)

Actions.name('SET_PROFITABILITY').set(
  type =>
    function setProfitability(ebitdaType, profitability, index) {
      return {
        type,
        ebitdaType,
        profitability,
        index,
      }
    }
)

Actions.name('SET_ERROR').set(
  type =>
    function setError(input, error, message) {
      return {
        type,
        input, 
        error, 
        message,
      }
    }
)

Actions.name('SET_EBITDA_DETAIL').set(
  type =>
    function setEbitdaDetail(ebitda) {
      return {
        type,
        ebitda,
      }
    }
)

Actions.name('REQUEST_EDIT_EBITDA').set(
  type =>
    function requestEditEbitda(id) {
      return {
        type,
        id,
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

Actions.name('SET_MENU_FILTER_INDEX').set(
  type =>
    function setMenuFilterIndex(menuFilterIndex) {
      return {
        type,
        menuFilterIndex,
      };
    },
);

export default Actions;