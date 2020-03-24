/*
 *
 * ConfiguracionPeriodo actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/CONFIGURACION_PERIODO/',
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

Actions.name('REQUEST_GET_PERIODS').set(
  type =>
    function requestGetPeriods() {
      return {
        type,
      }
    }
)

Actions.name('SET_DATA').set(
  type =>
    function setData(data = []) {
      return {
        type,
        data,
      }
    }
)

Actions.name('SET_FILTER_DATA').set(
  type =>
    function setFilterData(filterData = []) {
      return {
        type,
        filterData,
      }
    }
)

Actions.name('SET_STEPPER').set(
  type =>
    function setPeriods(stepper = 0) {
      return {
        type,
        stepper,
      }
    }
)

Actions.name('REQUEST_CLOSE_PERIOD').set(
  type =>
    function requestClosePeriod(id) {
      return {
        type,
        id,
      }
    }
)

Actions.name('SET_SHOW_SEARCH_TEXT').set(
  type =>
    function setShowSearchText(showSearchText = false) {
      return {
        type,
        showSearchText,
      }
    }
)

Actions.name('SET_SEARCH_TEXT').set(
  type =>
    function setSearchText(searchText = '') {
      return {
        type,
        searchText,
      }
    }
)

Actions.name('SET_SHOW_FILTERS').set(
  type =>
    function setShowFilters() {
      return {
        type,
      }
    }
)

Actions.name('CLOSE_FILTERS').set(
  type =>
    function closeFilters() {
      return {
        type,
      }
    }
)

Actions.name('SET_SELECTED').set(
  type =>
    function setSelected(selected = []) {
      return {
        type,
        selected,
      }
    }
)

Actions.name('SET_PAGE').set(
  type =>
    function setPage(page) {
      return {
        type,
        page,
      }
    }
)

Actions.name('SET_ROWS_PER_PAGE').set(
  type =>
    function setPage(rowsPerPage) {
      return {
        type,
        rowsPerPage,
      }
    }
)

Actions.name('SET_DISABLED_ADD_BUTTON').set(
  type =>
    function setDisableAddButton(disabledAddButton = false) {
      return {
        type,
        disabledAddButton,
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

Actions.name('SET_TOTAL_PLAZAS').set(
  type =>
    function setTotalPlazas(totalPlazas = 0) {
      return {
        type,
        totalPlazas,
      }
    }
)

Actions.name('SET_MODAL').set(
  type =>
    function setModal(variant = 'Warning') {
      return {
        type,
        variant,
      }
    }
)

Actions.name('SET_CLOSE_MODAL').set(
  type =>
    function setCloseModal() {
      return {
        type,
      }
    }
)

Actions.name('SET_PERIOD').set(
  type =>
    function setPeriod(period) {
      return {
        type,
        period,
      }
    }
)

Actions.name('SET_CLOSE_PERIOD').set(
  type =>
    function setPeriod() {
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
    function setProfitability(profitability, index) {
      return {
        type,
        profitability,
        index,
      }
    }
)

Actions.name('REQUEST_POST_PERIOD').set(
  type =>
    function requestPostPeriod() {
      return {
        type,
      }
    }
)

Actions.name('REQUEST_EDIT_PERIOD').set(
  type =>
    function requestEditPeriod(id) {
      return {
        type,
        id,
      }
    }
)

Actions.name('SET_PERIOD_DETAIL').set(
  type =>
    function setPeriodDetail(period) {
      return {
        type,
        period,
      }
    }
)

Actions.name('REQUEST_PERIOD_YEAR').set(
  type =>
    function requestPeriodYear(id, period) {
      return {
        type,
        id,
        period,
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

export default Actions;
