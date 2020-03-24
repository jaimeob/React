import axios from 'axios';
import config from 'config/config.development';
export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getListGeneralApi = (tipoCargaId, empresaId, anio) => {
  const req = Object.assign({
    method: 'GET',
    url: `/cargaexcelindicadores/obtenerListadoCargas/${tipoCargaId}/${empresaId}/${anio}`,
    data:{},
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getCurrentDateApi = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/generals/obtenerFechaHora`,
    data:{},
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getWeeksMonthsApi = ({ year, periodicity, period }) => {
  const req = Object.assign({
    method: 'GET',
    url: `/generals/obtenerSemMesRetail/${year}/${periodicity}/${period}`,
    data:{},
  });
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getPlazasUserApi = (idUser) => {
  const req = Object.assign({
    method: 'GET',
    url: `/generals/obtenerPlazasUsuario/${idUser}`,
    data:{},
  });
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getBaseLayoutApi = (tipoCargaId) => {
  const req = Object.assign({
    method: 'GET',
    url: `/cargaexcelindicadores/obtenerLayoutCargaBase/${tipoCargaId}`,
    data:{},
  });
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const setLoadedIndicatorsApi = (tipoCargaId, empresaId, params) => {
  const req = Object.assign({
    method: 'POST',
    url: `/cargaexcelindicadores/grabarCargaIndicadores/${tipoCargaId}/${empresaId}`,
    data:{...params},
  });
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export default api
