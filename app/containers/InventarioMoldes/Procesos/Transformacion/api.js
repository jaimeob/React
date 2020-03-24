import axios from 'axios';
import config from 'config/config.development';
// import config from 'config';

export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getMovimientosTransformaciones = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/movimientos/transformaciones',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getMovimientoDetalle = (idTransformacion) => {
  const req = Object.assign({
    method: 'GET',
    url: `/movimientos/transformaciones/${idTransformacion}/detalle`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getPlazas = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/plazas/usuario',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getAlmacenes= (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/almacenes/usuario',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getMoldes = () => {
  const req = Object.assign({
    method: 'POST',
    url: '/molde/moldesExistentes',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getMoldesDestino = (IdMoldeOrigen) => {
  const req = Object.assign({
    method: 'GET',
    url: `/transformaciones/moldes/${IdMoldeOrigen}/destino`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getTransformaciones = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/transformaciones',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getInsumos = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: '/insumos/transformaciones',
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postMovimiento = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/movimiento/transformaciones',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const devolverMovimiento = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/transformaciones/devolver',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};