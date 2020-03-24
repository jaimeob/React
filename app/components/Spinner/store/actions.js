/*
 *
 * PorcentajeMontoNegociado actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

export const ActionsSpinner = new ActionsGenerator({
  prefix: 'APP/SPINNER/',
  subfix: '_ACTION',
});

export const ACTION_KEYS = {
  CHANGE_SPINNER: (type) => 
    function changeSpinner(status = false){
      return {
        type,
        status,
      }
    },
}

Object.keys(ACTION_KEYS).forEach((action) => {
  ActionsSpinner
    .name(action)
    .set(ACTION_KEYS[action])
});

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export default ActionsSpinner;