import { fromJS } from 'immutable';
import movimientoAlmacenReducer from '../reducer';

describe('movimientoAlmacenReducer', () => {
  it('returns the initial state', () => {
    expect(movimientoAlmacenReducer(undefined, {})).toEqual(fromJS({}));
  });
});
