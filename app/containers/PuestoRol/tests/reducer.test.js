import { fromJS } from 'immutable';
import puestoRolReducer from '../reducer';

describe('puestoRolReducer', () => {
  it('returns the initial state', () => {
    expect(puestoRolReducer(undefined, {})).toEqual(fromJS({}));
  });
});
