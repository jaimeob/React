import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the bandejaDifusiones state domain
 */

const selectBandejaDifusionesDomain = state =>
  state.get('bandejaDifusiones', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BandejaDifusiones
 */

const makeSelectBandejaDifusiones = () =>
  createSelector(selectBandejaDifusionesDomain, substate => substate.toJS());

export default makeSelectBandejaDifusiones;
export { selectBandejaDifusionesDomain };
