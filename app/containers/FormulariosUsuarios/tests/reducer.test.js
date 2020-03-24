import { fromJS } from 'immutable';
// eslint-disable-next-line import/no-unresolved
import formulariosUsuariosReducer from '../reducer';

describe('formulariosUsuariosReducer', () => {
  it('returns the initial state', () => {
    expect(formulariosUsuariosReducer(undefined, {})).toEqual(fromJS({}));
  });
});
