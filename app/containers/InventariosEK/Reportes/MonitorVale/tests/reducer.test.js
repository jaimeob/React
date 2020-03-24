import { fromJS } from 'immutable';
import monitorValeReducer from '../reducer';

describe('monitorValeReducer', () => {
  it('returns the initial state', () => {
    expect(monitorValeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
