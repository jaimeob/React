import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getTransformaciones = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/transformaciones',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getTransformacionDetalle = (IdTransformacion) => {
  const req = Object.assign({
    method: 'GET',
    url: `/transformaciones/${IdTransformacion}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getMoldes = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/moldes',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getSecciones = (IdConfiguracionMolde) => {
  const req = Object.assign({
    method: 'GET',
    url: `/moldes/${IdConfiguracionMolde}/secciones`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getPiezas = (IdConfiguracionMolde) => {
  const req = Object.assign({
    method: 'GET',
    url: `/moldes/${IdConfiguracionMolde}/piezas`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const deleteTransformacion = (idTransformacion) => {
  const req = Object.assign({
    method: 'PUT',
    url: `/transformaciones/eliminar/${idTransformacion}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postTransformacion = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/transformaciones',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const updateTransformacion = (datos) => {
  const req = Object.assign({
    method: 'PUT',
    url: `/transformaciones/${datos.idTransformacion}`,
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};