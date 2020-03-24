import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the main state domain
 */

const selectListadoTicketsDomain = state => state.get('listadoTickets', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Main
 */

const makeSelectListadoTickets = () =>
  createSelector(selectListadoTicketsDomain, substate => substate.toJS());

export default makeSelectListadoTickets;
export { selectListadoTicketsDomain };
