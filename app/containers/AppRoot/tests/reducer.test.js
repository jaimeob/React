import { fromJS } from 'immutable';
import appRootReducer from '../reducer';

describe('appRootReducer', () => {
  it('returns the initial state', () => {
    expect(appRootReducer(undefined, {})).toEqual(fromJS({}));
  });
});
