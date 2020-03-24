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

export const getMovimientos = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/obtenerMovimientos',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getReportes = (idPlaza) => {
  const req = Object.assign({
    method: 'GET',
    url: `/reportes/${idPlaza}`,
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

export const postMovimiento = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/movimientoinventarios',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getMovimientoDetalle = (idMovimiento) => {
  const req = Object.assign({
    method: 'GET',
    url: `movimiento/detalle/${idMovimiento}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};