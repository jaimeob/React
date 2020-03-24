import { fromJS } from 'immutable';
import configuracionJerarquiaReducer from '../reducer';

describe('configuracionJerarquiaReducer', () => {
  it('returns the initial state', () => {
    expect(configuracionJerarquiaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
