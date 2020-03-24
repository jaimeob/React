import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getListado = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/puestos/roles',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setListadoActivar = (params) => {
  const req = Object.assign({
    method: 'PUT',
    url: '/puestos/roles/activar',
    data : params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setListadoDesactivar = (params) => {
  const req = Object.assign({
    method: 'PUT',
    url: '/puestos/roles/desactivar',
    data : params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getDownloadFile = (params) => {
  const req = Object.assign({
    method: 'GET',
    url: `/puestos/${params}/roles/archivos`,
    responseType: 'blob',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const countDownloadFiles = (params) => {
  const req = Object.assign({
    method: 'GET',
    url: `/puestos/${params}/contar-archivos`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getDownloadFiles = (params) => {
  const req = Object.assign({
    method: 'GET',
    url: `/puestos/roles/archivos?ids=${params}`,
    responseType: 'blob',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getPuestos = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/puestos/sinrol',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getRoles = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/rol',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getModulosPorEmpresa = (idRol) => {
  const req = Object.assign({
    method: 'GET',
    url: `/rol/empresas/modulos/${idRol}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const postGenerarPDF = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: '/rol/generarPDF',
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const postUploadFile = (files) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/upload`,
    data: files,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const postGuardarConfiguracion = (data) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: '/rol/guardar',
    data,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getConfiguracion = (idPuesto) => {
  const req = Object.assign({
    method: 'GET',
    url: `/rol/obtener/configuracion/${idPuesto}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getDownloadedFile = (url) => axios({
  url,
  method: 'GET',
  responseType: 'blob', // important
}).then((response) => response)
  .catch((error) => error.response);