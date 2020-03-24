import { fromJS } from 'immutable';
import listadoFormularioReducer from '../reducer';

describe('listadoFormularioReducer', () => {
  it('returns the initial state', () => {
    expect(listadoFormularioReducer(undefined, {})).toEqual(fromJS({}));
  });
});
