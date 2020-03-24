import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tableros state domain
 */

const selectTablerosDomain = state => state.get('tableros', initialState);

// const selectCurrentUserDomain = state => state.get('global','currentUser', initialState);

/**
 * Other specific selectors
 */


// const selectPlantillaTableros = (state) => state.getIn(['tableros', 'bandejaTickets', 'ticketsDetails', 'plantilla'])


// export const makeSelectPlantilla = () => createSelector(selectPlantillaTableros, (plantilla) => plantilla.toJS());



/**
 * Default selector used by Tableros
 */

const makeSelectTableros = () =>
  createSelector(selectTablerosDomain, substate => substate.toJS());

// const makeSelectCurrentUser = () =>
//   createSelector(selectCurrentUserDomain, substate => substate.toJS());
//   selectDataUserDomain





export default makeSelectTableros;
export { selectTablerosDomain };
