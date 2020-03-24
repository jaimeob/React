import { fromJS } from 'immutable';
import reportesReducer from '../reducer';

describe('reportesReducer', () => {
  it('returns the initial state', () => {
    expect(reportesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
