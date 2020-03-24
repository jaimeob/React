import axios from 'axios';
import config from 'config/config.development';
// import config from 'config';

export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getEntregaIndicador = () => {
  const req = Object.assign({
    method: 'GET',
    url:  `/indicadors/consultaEntregaIndicadores`,
  })
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postEntregaIndicador = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/indicadors/guardaEntregaIndicador',
    data: datos,
  })
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getValoresEtiquetas = () => {
  const req = Object.assign({
    method: 'GET',
    url:  `/indicadors/consultaValoresEtiquetas`,
  })
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getCombosFiltros = () => {
  const req = Object.assign({
    method: 'GET',
    url:  `/indicadors/consultaDepartamentoDireccionPlazaPuestoRechum`,
  })
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};