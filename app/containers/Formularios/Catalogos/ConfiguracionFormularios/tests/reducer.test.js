import { fromJS } from 'immutable';
import transformacionReducer from '../reducer';

describe('transformacionReducer', () => {
  it('returns the initial state', () => {
    expect(transformacionReducer(undefined, {})).toEqual(fromJS({}));
  });
});
