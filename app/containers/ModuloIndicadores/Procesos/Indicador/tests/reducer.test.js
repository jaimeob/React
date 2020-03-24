import { fromJS } from 'immutable';
import indicadorReducer from '../reducer';

describe('indicadorReducer', () => {
  it('returns the initial state', () => {
    expect(indicadorReducer(undefined, {})).toEqual(fromJS({}));
  });
});
