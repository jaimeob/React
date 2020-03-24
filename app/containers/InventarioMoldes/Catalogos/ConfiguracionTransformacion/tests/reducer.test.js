import { fromJS } from 'immutable';
import configuracionTransformacionReducer from '../reducer';

describe('configuracionTransformacionReducer', () => {
  it('returns the initial state', () => {
    expect(configuracionTransformacionReducer(undefined, {})).toEqual(fromJS({}));
  });
});
