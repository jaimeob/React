import axios from 'axios';
import config from 'config/config.development';
// import config from 'config';

export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getPlazas = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/generals/obtenerPlazasGeneral/0',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getAlmacenes = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/almacenes/0',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getUsuarios = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/usuarios',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getAlmacenesPlaza = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/almacenesPlazas',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getUsuariosAlmacenes = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/usuarioAlmacenes',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postAP = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/usuarioalmacens',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postAU = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/usuarioalmacen',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};