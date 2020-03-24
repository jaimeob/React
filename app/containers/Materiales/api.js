import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getMateriales = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/articulos',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getExistencia = (idArticulo) => {
  const req = Object.assign({
    method: 'GET',
    url: `articulos/${idArticulo}/plaza/2/existencia/`,
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

export const getMaterialDetalle = (idArticulo) => {
  const req = Object.assign({
    method: 'GET',
    url: `/articulos/${idArticulo}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postMateriales = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/articulos',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const actualizarMaterial = (datos) => {
  const req = Object.assign({
    method: 'PUT',
    url: `/articulos/${datos.idMaterial.value}`,
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};



export const deleteMaterial = (idArticulo) => {
  const req = Object.assign({
    method: 'PUT',
    url: `/articulos/eliminar/${idArticulo}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};