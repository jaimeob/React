import { fromJS } from 'immutable';
import entregaIndicadorReducer from '../reducer';

describe('entregaIndicadorReducer', () => {
  it('returns the initial state', () => {
    expect(entregaIndicadorReducer(undefined, {})).toEqual(fromJS({}));
  });
});
