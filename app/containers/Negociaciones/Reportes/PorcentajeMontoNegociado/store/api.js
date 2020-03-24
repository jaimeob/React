import axios from 'axios';
import config from 'config/config.development';
export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getPlazas = (IdPlaza = -1) => {
  const req = Object.assign({
    method: 'GET',
    url: `/generals/obtenerPlazasGeneral/${IdPlaza}`,
    data:{
      IdPlaza,
    },
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}
export const getFamilys = (state = '') => {
  const req = Object.assign({
    method: 'GET',
    url: `/negociaciones/ObtenerFamilias/${state}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}
export const getNegotiatedAmount = (PlazaId = -1, FamiliaId = -1) => {
  const req = Object.assign({
    method: 'GET',
    url: `/negociaciones/obtenerMontoNegociado/${PlazaId}/${FamiliaId}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export default api