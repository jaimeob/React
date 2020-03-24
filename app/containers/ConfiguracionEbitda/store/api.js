
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

export const getEbitdas = (estatus = 1) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtener-ebitdas/${estatus}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const updateStatusEbitdaApi = (params) => {
  const {
    Estatus,
    rows,
    idUsuario,
  } = params

  const req = Object.assign({
    method: 'PUT',
    url: `/indicadores/actualizar-estatus-ebitda/`,
    data: {
      estatus: Estatus,
      ebitdas: rows.toString(),
      idUsuario,
    },
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const storeEbitda = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/indicadores/guardar-ebitda`,
    data,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const editEbitda = (id) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/editar-ebitda/${id}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getYearEbitda = (ebitdaId, anio) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/consultar-anio-ebitda/${ebitdaId}/anio/${anio}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export default api