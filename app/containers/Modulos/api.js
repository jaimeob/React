import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getListado = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/modulos',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getTipoAgrupadores = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/modulos/consultaTipoAgrupador',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getUrlFuncion = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/modulos/consultaUrl',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getModuloFuncion = (id) => {
  const req = Object.assign({
    method: 'GET',
    url:  `/modulos/consultaFunciones/${id}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getValidaExisteModulo = (nombreModulo) => {
  const req = Object.assign({
    method: 'GET',
    url:  `/modulos/consultaNombreModulo/${nombreModulo}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setListadoActivar = (params) => {
  const req = Object.assign({
    method: 'PUT',
    url: '/modulos/activar',
    data : params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setListadoDesactivarFunciones = (params) => {
  const req = Object.assign({
    method: 'PUT',
    url: '/modulos/desactivarFunciones',
    data : params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setListadoActivarFunciones = (params) => {
  const req = Object.assign({
    method: 'PUT',
    url: '/modulos/activarFunciones',
    data : params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setListadoDesactivar = (params) => {
  const req = Object.assign({
    method: 'PUT',
    url: '/modulos/desactivar',
    data : params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postModulo = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/modulos/guardaModulo',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postFunciones = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/modulos/cudModuloFuncion',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};