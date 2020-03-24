/*
 *
 * MonitorVale actions
 *
 */

import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function consultarPrevalesAction() {
  return {
    type: 'APP/CONTAINERS/INVENTARIOSEK/REPORTES/MONITORVALE/CONSULTAR_PREVALES',
  };
}

export function setPrevalesAction(data) {
  return {
    type: 'APP/CONTAINERS/INVENTARIOSEK/REPORTES/MONITORVALE/GUARDAR_PREVALES',
    data,
  }
}
