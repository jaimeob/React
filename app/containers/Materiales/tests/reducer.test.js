import { fromJS } from 'immutable';
import listadoMaterialesReducer from '../reducer';

describe('listadoMaterialesReducer', () => {
  it('returns the initial state', () => {
    expect(listadoMaterialesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
