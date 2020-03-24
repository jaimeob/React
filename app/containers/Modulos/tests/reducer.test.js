import { fromJS } from 'immutable';
import modulosReducer from '../reducer';

describe('modulosReducer', () => {
  it('returns the initial state', () => {
    expect(modulosReducer(undefined, {})).toEqual(fromJS({}));
  });
});
