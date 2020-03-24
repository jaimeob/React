import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getPedidos = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: '/pedidos/obtener',
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getPlazas = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/pedidos/plazas',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getEstatus = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/pedidos/estatus',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getPedidoDetalle = (idPedido, plaza) => {
  const req = Object.assign({
    method: 'GET',
    url: `/pedidos/${idPedido}/${plaza}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const postAutorizarPedido = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/pedidos/autorizar',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response.response)
};

export const postRecibirPedido = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/pedidos/recibir',
    data: datos,
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

export const deleteUploadFile = (id) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'delete',
    url: `/upload/files/${id}`,
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
