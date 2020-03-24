import { fromJS } from 'immutable';
import configuracionIndicadoresReducer from '../reducer';

describe('configuracionIndicadoresReducer', () => {
  it('returns the initial state', () => {
    expect(configuracionIndicadoresReducer(undefined, {})).toEqual(fromJS({}));
  });
});
