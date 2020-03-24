import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getPlazas = () => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: '/todasPlazas',
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getDatosIndicadoresOCKyOE = (datos) => {

  const req = Object.assign({
    method: 'post',
    url: 'tickets/datosIndicadoresDesempenioOCKyOE',
    data: datos,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getDatosGraficaDesempenioProceso = (datos) => {
  
  const req = Object.assign({
    method: 'post',
    url: 'tickets/datosGraficaDesempenioProceso',
    data: datos,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getDatosGraficaDesempenioPuesto = (datos) => {
  
  const req = Object.assign({
    method: 'post',
    url: 'tickets/datosGraficaDesempenioPuesto',
    data: datos,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getPlazasIndicadores = (datos) => {

  const req = Object.assign({
    method: 'post',
    url: 'tickets/datosCombosIndicadores',
    data: datos,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};