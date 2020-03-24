/*
 *
 * Negociaciones actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

export const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINERS/NEGOCIACIONES/',
  subfix: '_ACTION',
});

export const ACTION_KEYS = {
  DEFAULT_STATE:  (type) =>
    function defaultState(stateDefault) {
      return {
        type,
        ...stateDefault,
      };
    },
  GET_CURRENT_DATE_TIME:  (type) =>
    function getCurrentDateTime(data) {
      return {
        type,
        data,
      };
    },
  SET_CURRENT_DATE_TIME:  (type) =>
    function setCurrentDateTime(data) {
      return {
        type,
        data,
      };
    },
  SHOW_MODAL_CONTENT_LAYOUT: (type) =>
    function openModalContentLayout(modalContentLayout = false) {
      return {
        type,
        modalContentLayout,
      };
    },
  SHOW_MODAL_VIEW_EXPLOTION: (type) =>
    function openModalViewExplotion(modalViewExplotion = false) {
      return {
        type,
        modalViewExplotion,
      };
    },
  EXPLOTION_DETAILS: (type) =>
    function explotionDetails(data) {
      return {
        type,
        data,
      };
    },
  EXPLOTION_SELECTED: (type) =>
    function explotionSelected(data) {
      return {
        type,
        data,
      };
    },
  VALIDATED_FILE: (type) =>
    function validatedFile(data) {
      return {
        type,
        data,
      };
    },
  LOAD_EXPORT_EXPLOTION: (type) =>
    function loadExportExplotion(data) {
      return {
        type,
        data,
      };
    },
  // SET_USER_LOGGED_IN: (type) =>
  //   function setUserLoggedIn(userCredentials) {
  //     return {
  //       type,
  //       userCredentials,
  //     };
  //   },
  SET_ICON_VIEW_EXPLOTION: (type) =>
    function fileDoc(iconViewExplotion = false) {
      return {
        type,
        iconViewExplotion,
      };
    },
  SET_MODAL_ACTIVE: (type) =>
    function setModalActive(modalActive = '') {
      return {
        type,
        modalActive,
      };
    },
  SET_LAYOUT_NEGOCIACIONES: (type) =>
    function setLayoutNegociaciones(layoutNegociaciones = []) {
      return {
        type,
        layoutNegociaciones,
      };
    },
  SET_DETALLE_INSUMO: (type) =>
    function setDetalleInsumo(detalleInsumo = []) {
      return {
        type,
        detalleInsumo,
      };
    },
  SET_PLAZAS: (type) =>
    function setPlazas(arrPlazas = []) {
      return {
        type,
        arrPlazas,
      };
    },
  SET_PLAZA_SELECTED: (type) =>
    function setPlazaSelected(plazaSelected = []) {
      return {
        type,
        plazaSelected,
      };
    },
  SET_INSUMOS_EXPLOTION_STATIC: (type) =>
    function setInsumosExplotionStatic(staticProps) {
      return {
        type,
        staticProps,
      };
    },
  SET_INSUMOS_EXPLOTION_DINAMIC: (type) =>
    function setInsumosExplotionDinamic(dinamicProps) {
      return {
        type,
        dinamicProps,
      };
    },
  SET_EXPLOTIONS: (type) =>
    function setExplotions(explotionList) {
      return {
        type,
        explotionList,
      };
    },

  SET_EXPLOTIONS_DETAILS: (type) =>
    function setExplotionsDetails(explotionDetails) {
      return {
        type,
        explotionDetails,
      };
    },
  SET_FILE_LOAD:  (type) =>
    function setFileLoad(data) {
      return {
        type,
        data,
      };
    },
  GET_LAYOUT_NEGOCIACIONES: (type) =>
    function getLayoutNegociaciones(idPrototipo = -1) {
      return {
        type,
        idPrototipo,
      };
    },
  GET_DETALLE_INSUMO: (type) =>
    function getDetalleInsumo(Supplies = [], rowsExplotion = []) {
      return {
        type,
        Supplies,
        rowsExplotion,
      };
    },
  GET_PLAZAS: (type) =>
    function getPlazas(IdPlaza = -1) {
      return {
        type,
        IdPlaza,
      };
    },
  GET_EXPLOTIONS: (type) =>
    function getExplotions(idExplotion = -1, idPlaza = -1, anio = -1) {
      // console.log("desde el action",idExplotion, idPlaza, anio);
      return {
        type,
        idExplotion,
        idPlaza,
        anio,
      };
    },
  GET_EXPLOTIONS_DETAILS: (type) =>
    function getExplotionsDetails(IdExplotion = -1) {
      return {
        type,
        IdExplotion,
      };
    },
  UPDATE_INSUMOS_EXPLOTION_STATIC: (type) =>
    function updateInsumosExplotionStatic(staticProps) {
      return {
        type,
        staticProps,
      };
    },
  UPDATE_INSUMOS_EXPLOTION_DINAMIC: (type) =>
    function updateInsumosExplotionDinamic(dinamicProps) {
      return {
        type,
        dinamicProps,
      };
    },
  ADD_EXPLOTIONS: (type) =>
    function setExplotionsDetails(JsonExplotion = [], JsonExplotionDetails = [], additionalData = {}) {
      return {
        type,
        JsonExplotion,
        JsonExplotionDetails,
        additionalData,
      };
    },
  REQUEST_ADD_EXPLOTION: (type) =>
    function requestAddEplotion(data) {
      return {
        type,
        data,
      };
    },
};

Object.keys(ACTION_KEYS).forEach((action) => {
  Actions
    .name(action)
    .set(ACTION_KEYS[action])
});

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export default Actions;
