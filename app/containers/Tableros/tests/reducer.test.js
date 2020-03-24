import { fromJS } from 'immutable';
import tablerosReducer from '../reducer';

describe('tablerosReducer', () => {
  it('returns the initial state', () => {
    expect(tablerosReducer(undefined, {})).toEqual(fromJS({}));
  });
});
