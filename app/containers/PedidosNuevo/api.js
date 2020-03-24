import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getAllMateriales = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/articulos',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getMateriales = (idAgrupador) => {
  const req = Object.assign({
    method: 'GET',
    url: `articulos/${idAgrupador}/agrupador/`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getExistencia = (idArticulo, idPlaza) => {
  const req = Object.assign({
    method: 'GET',
    url: `articulos/${idArticulo}/plaza/${idPlaza}/existencia/`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getAgrupadores = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/agrupadores',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postPedido = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/pedidos',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};