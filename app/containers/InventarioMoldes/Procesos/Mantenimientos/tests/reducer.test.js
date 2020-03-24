import { fromJS } from 'immutable';
import mantenimientosReducer from '../reducer';

describe('mantenimientosReducer', () => {
  it('returns the initial state', () => {
    expect(mantenimientosReducer(undefined, {})).toEqual(fromJS({}));
  });
});
