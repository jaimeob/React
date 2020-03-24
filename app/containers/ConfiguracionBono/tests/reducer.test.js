import { fromJS } from 'immutable';
import configuracionBonoReducer from '../reducer';

describe('configuracionBonoReducer', () => {
  it('returns the initial state', () => {
    expect(configuracionBonoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
