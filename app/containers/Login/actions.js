/*
 *
 * Login actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/LOGIN/',
  subfix: '_ACTION',
});

Actions.name('DEFAULT').set(
  type =>
    function defaultAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_USUARIO_LOGIN').set(
  type =>
    function getUsuarioLoginAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_USUARIO_LOGIN').set(
  type =>
    function setUsuarioLoginAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_USUARIO_DOMINIO').set(
  type =>
    function setUsuarioDominioAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_CONTRASENA').set(
  type =>
    function setContrasenaAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_LOADING').set(
  type =>
    function setLoadingAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_USUARIO_INTENTO_LOGIN').set(
  type =>
    function setUsuarioIntentoLoginAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('GET_USUARIO_IMAGEN').set(
  type =>
    function getUsuarioImagenAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_USUARIO_IMAGEN').set(
  type =>
    function setUsuarioImagenAction(datos) {
      return {
        type,
        datos,
      };
    },
);

export default Actions;
