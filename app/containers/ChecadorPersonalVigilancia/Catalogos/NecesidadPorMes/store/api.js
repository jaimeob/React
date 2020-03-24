import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);
// export const api = axios.create(
//   {"baseURL": config.api.baseURL}
// );

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
export const getListNeeds = (idCompany = 0, year= 1990) => {
  const req = Object.assign({
    method: 'GET',
    url: `/checadorpersonalvigilancias/obtenerListadoNecesidad/${idCompany}/${year}`,
    data:{},
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}
export const getYearsNeeds = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/checadorpersonalvigilancias/obtenerAnioNecesidad`,
    data:{},
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}
export const saveNewNeed = (typeNeedSelected, newNeed) => {
  const req = Object.assign({
    method: 'POST',
    url: `/checadorpersonalvigilancias/registrarNecesidad/${typeNeedSelected}`,
    data: {...newNeed},
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}
export default api