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
export const getCompliancePercentage = (IdPlaza = -1, InitialDate = '1990-01-01', FinalDate = '1990-01-01') => {
  const req = Object.assign({
    method: 'GET',
    url: `/negociaciones/obtenerPorcentajeCumplimiento/${IdPlaza}/${InitialDate}/${FinalDate}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export default api