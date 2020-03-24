import { fromJS } from 'immutable';
import negociacionesReducer from '../store/reducer';

describe('negociacionesReducer', () => {
  it('returns the initial state', () => {
    expect(negociacionesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
