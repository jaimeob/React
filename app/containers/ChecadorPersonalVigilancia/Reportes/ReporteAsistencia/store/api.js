import axios from 'axios';
import config from 'config';
export const api = axios.create(config.api);

export const getCurrentDate = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/generals/obtenerFechaHora`,
    data:{},
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}
export const getCompanys = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/checadorpersonalvigilancias/obtenerEmpresasNecesidad`,
    data:{},
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}
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
export const getAssitance = (
  selectedCompany = -1, 
  selectedPlaza = -1, 
  concentrated = 0 ,
  startDate = '01/01/1990', 
  endDate = '01/01/1990',
) => {
  const req = Object.assign({
    method: 'GET',
    url: `/checadorpersonalvigilancias/obtenerReporteAsistencias/${selectedCompany}/${selectedPlaza}/${concentrated}/${startDate}/${endDate}`,
    data:{},
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export default api