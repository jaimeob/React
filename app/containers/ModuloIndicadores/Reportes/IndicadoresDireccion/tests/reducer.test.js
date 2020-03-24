import { fromJS } from 'immutable';
import indicadoresDireccionReducer from '../reducer';

describe('indicadoresDireccionReducer', () => {
  it('returns the initial state', () => {
    expect(indicadoresDireccionReducer(undefined, {})).toEqual(fromJS({}));
  });
});
