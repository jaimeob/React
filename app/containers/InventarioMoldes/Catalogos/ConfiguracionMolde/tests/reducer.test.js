import { fromJS } from 'immutable';
import configuracionMoldeReducer from '../reducer';

describe('configuracionMoldeReducer', () => {
  it('returns the initial state', () => {
    expect(configuracionMoldeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
