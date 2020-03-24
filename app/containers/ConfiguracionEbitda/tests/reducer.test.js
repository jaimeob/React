import { fromJS } from 'immutable';
import configuracionEbitdaReducer from '../reducer';

describe('configuracionEbitdaReducer', () => {
  it('returns the initial state', () => {
    expect(configuracionEbitdaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
