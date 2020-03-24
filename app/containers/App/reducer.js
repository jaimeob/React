/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR, CHANGE_REPO, SET_USUARIO_LOGIN, LOGOUT_USUARIO_INACTIVO, SET_ROL_PERMISO_FUNCION, SET_PERMISOS} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  permisos: {
    normales: {},
    especiales: {}
  },
  currentUser: localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')) : false,
  userData: {
    repositories: false,
    repo: '',
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_REPO:     
      return state.setIn(['userData', 'repo'], action.repo)
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case SET_USUARIO_LOGIN:
      localStorage.setItem('usuario',  JSON.stringify(action.datos));
      return  state.set('currentUser', fromJS(action.datos)); 
    case LOGOUT_USUARIO_INACTIVO:
      localStorage.removeItem('usuario');
      return state.set('currentUser', false); 
    case SET_ROL_PERMISO_FUNCION:   
      return state.set('paramsPermisos', fromJS(action.payload)); 
    case SET_PERMISOS:
      return state.set('permisos', fromJS(action.payload)); 
    default:
      return state;
  }
}

export default appReducer;
