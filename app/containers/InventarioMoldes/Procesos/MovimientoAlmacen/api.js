import axios from 'axios';
import config from 'config/config.development';
// import config from 'config';

export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getMovimientos = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/movimientoalmacenes',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getMovimientoDetalle = (IdMovimientoAlmacen) => {
  const req = Object.assign({
    method: 'GET',
    url: `/movimientoalmacens/${IdMovimientoAlmacen}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postMovimiento = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/movimientoalmacens',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const deleteMovimiento = (idMovimiento) => {
  const req = Object.assign({
    method: 'PUT',
    url: `/movimientoalmacenes/eliminar/${idMovimiento}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getInsumos = (idPlaza, idConfiguracionMolde, idAlmacen, IdMolde) => {
  const req = Object.assign({
    method: 'GET',
    url: `/movimientoalmacens/plaza/${idPlaza}/molde/${idConfiguracionMolde}/ubicacion/${idAlmacen}/insumos/${IdMolde}`,
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

export const getUbicaciones = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/ubicaciones',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

