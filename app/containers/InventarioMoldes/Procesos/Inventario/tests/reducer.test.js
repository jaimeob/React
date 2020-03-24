import { fromJS } from 'immutable';
import inventarioReducer from '../reducer';

describe('inventarioReducer', () => {
  it('returns the initial state', () => {
    expect(inventarioReducer(undefined, {})).toEqual(fromJS({}));
  });
});
