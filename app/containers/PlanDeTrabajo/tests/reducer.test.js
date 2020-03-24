import { fromJS } from 'immutable';
import planDeTrabajoReducer from '../reducer';

describe('planDeTrabajoReducer', () => {
  it('returns the initial state', () => {
    expect(planDeTrabajoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
