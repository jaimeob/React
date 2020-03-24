import { fromJS } from 'immutable';
import diasPromedioReducer from '../reducer';

describe('diasPromedioReducer', () => {
  it('returns the initial state', () => {
    expect(diasPromedioReducer(undefined, {})).toEqual(fromJS({}));
  });
});
