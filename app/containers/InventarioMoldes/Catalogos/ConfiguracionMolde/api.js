import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getCombos = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/molde/combos',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getMoldes = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/molde',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getNumeracion = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/molde/numeracion',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const deleteMolde = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: '/molde/eliminar',
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const deleteArchivo = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: '/molde/archivos/eliminar',
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const addMolde = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: '/molde',
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

export const postGuardarArchivo = (files) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/molde/archivos`,
    data: files,
  });

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