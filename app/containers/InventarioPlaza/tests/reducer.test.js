import { fromJS } from 'immutable';
import inventarioPlazaReducer from '../reducer';

describe('inventarioPlazaReducer', () => {
  it('returns the initial state', () => {
    expect(inventarioPlazaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
