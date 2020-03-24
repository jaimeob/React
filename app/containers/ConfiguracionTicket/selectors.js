import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the main state domain
 */

const selectConfiguracionTicketDomain = state => state.get('configuracionTicket', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Main
 */

const makeSelecConfiguracionTicket = () =>
  createSelector(selectConfiguracionTicketDomain, substate => substate.toJS());

export default makeSelecConfiguracionTicket;
export { selectConfiguracionTicketDomain };
