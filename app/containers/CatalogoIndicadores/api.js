import axios from 'axios';
import config from 'config/config.development';
// import config from 'config';

export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const consultaIndicador = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/indicadors/consultaIndicadores',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postGuardaIndicador = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/indicadors/guardaIndicadores',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setListadoDesactivar = (params) => {
  const req = Object.assign({
    method: 'PUT',
    url: `/indicadors/desactivaActivaIndicador/idIndicador/${params.idIndicador}/usuario/${params.idUsuario}/activo/${params.activo}`,
    data : params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setListadoActivar = (params) => {
  const req = Object.assign({
    method: 'PUT',
    url: `/indicadors/desactivaActivaIndicador/idIndicador/${params.idIndicador}/usuario/${params.idUsuario}/activo/${params.activo}`,
    data : params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getvalidaExiste = (nombre) => {
  const req = Object.assign({
    method: 'GET',
    url:  `/indicadors/consultaExisteNombre/${nombre}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};