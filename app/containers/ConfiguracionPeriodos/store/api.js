
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

export const getPeriods = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtenerPeriodos`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const closePeriod = (id, idUsuario) => {
  const req = Object.assign({
    method: 'POST',
    url: `/indicadores/cerrar-periodo`,
    data: {
      id,
      idUsuario,
    },
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const storePeriod = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/indicadores/guardar-periodo`,
    data,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const editPeriods = (id) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/editar-periodo/${id}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getYearPeriod = (periodId, anio) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/consultar-anio-periodo/${periodId}/anio/${anio}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export default api