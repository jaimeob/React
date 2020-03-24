import axios from 'axios';
import config from 'config/config.development';
// import config from 'config';

export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getFormularios = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/formularios',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getAsignaciones = (idUsuario) => {
  const req = Object.assign({
    method: 'GET',
    url: `/formularios/asignaciones/usuario/${idUsuario}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getPuestos = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/puestos',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getDepartamentos = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/departamentos',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
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

export const checkUsuario = (idAsignacion, idFormulario, idUsuario) => {
  const req = Object.assign({
    method: 'GET',
    url: `/formularios/${idFormulario}/usuario/${idUsuario}/asignacion/${idAsignacion}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postAsignacion = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/formularios/asignacion',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const updateAsignacion = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/formularios/asignacion/update',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getAsignacionDetalle = (IdAsignacion) => {
  const req = Object.assign({
    method: 'GET',
    url: `/formularios/asignaciones/${IdAsignacion}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};
