import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the configuracionTickets state domain
 */

const selectConfiguracionTicketsDomain = state =>
  state.get('configuracionTickets', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConfiguracionTickets
 */

const makeSelectConfiguracionTickets = () =>
  createSelector(selectConfiguracionTicketsDomain, substate => substate.toJS());

export default makeSelectConfiguracionTickets;
export { selectConfiguracionTicketsDomain };
