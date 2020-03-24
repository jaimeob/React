import { fromJS } from 'immutable';
import movimientosInventarioReducer from '../reducer';

describe('movimientosInventarioReducer', () => {
  it('returns the initial state', () => {
    expect(movimientosInventarioReducer(undefined, {})).toEqual(fromJS({}));
  });
});
