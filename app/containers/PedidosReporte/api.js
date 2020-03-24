import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getReporteCoorporativo = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: '/pedidos/reporte/coorporativo',
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getReportePedidos = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: '/pedidos/reporte',
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getPlazas = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/pedidos/plazas',
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