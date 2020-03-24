import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getListado = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/roles',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setListadoActivar = (params) => {
  const req = Object.assign({
    method: 'PUT',
    url: '/roles/activar',
    data : params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setListadoDesactivar = (params) => {
  const req = Object.assign({
    method: 'PUT',
    url: '/roles/desactivar',
    data : params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getValidaExisteRol = (nombreRol) => {
  const req = Object.assign({
    method: 'GET',
    url:  `/rols/consultaNombreRol/${nombreRol}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getConsultaEmpresas = (params) => {
  const req = Object.assign({
    method: 'GET',
    url: `/rols/consultaEmpresas/${params}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getConsultaModulos = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/rols/consultaModulos',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getPermisosFuncion = (params) => {
  const req = Object.assign({
    method: 'GET',
    url:  `/rols/consultaPermisosFunciones/modulo/${params.idModulo}/rol/${params.IdRol}/empresa/${params.IdRolEmpresa}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getRoles = (idRol) => {
  const req = Object.assign({
    method: 'GET',
    url:  `/rols/consultaRoles/${idRol}/0`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const guardarRoles = (params) => {
  const req = Object.assign({
    method: 'POST',
    url:  '/rols/guardarRol',
    data: params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setEmpresasDesactivar = (params) => {
  const req = Object.assign({
    method: 'PUT',
    url: '/rols/desactivarEmpresas',
    data : params.datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setEmpresasActivar = (params) => {
  const req = Object.assign({
    method: 'PUT',
    url: '/rols/activarEmpresas',
    data : params.datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};